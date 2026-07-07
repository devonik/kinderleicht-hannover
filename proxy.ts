import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { comingSoonAllowlist, isSiteLive } from "@/lib/site";

/**
 * Routing-Proxy (Next 16). Zwei unabhängige Aufgaben:
 *
 * 1) Basic-Auth-Schutz der Vorschau – aktiv NUR, wenn `PREVIEW_PASSWORD` gesetzt ist
 *    (z. B. Preview-Env). In Produktion ohne Variable kein Passwortschutz.
 * 2) Coming-Soon-/Maintenance-Sperre – aktiv, solange NICHT `NEXT_PUBLIC_SITE_LIVE=true`.
 *    Dann werden alle Seiten außer Startseite, Impressum, Datenschutz und Studio auf die
 *    Coming-Soon-Startseite umgeleitet. So bleibt Produktion sicher „im Aufbau", auch wenn
 *    Kurs-/Buchungsrouten technisch existieren.
 */
export function proxy(request: NextRequest) {
  // 1) Vorschau-Passwortschutz
  const authResponse = checkPreviewAuth(request);
  if (authResponse) return authResponse;

  // 2) Coming-Soon-Sperre
  if (!isSiteLive) {
    const { pathname } = request.nextUrl;
    const isAllowed =
      pathname === "/" ||
      comingSoonAllowlist.some(
        (base) => pathname === base || pathname.startsWith(`${base}/`),
      );
    if (!isAllowed) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

/** Gibt eine 401-Antwort zurück, wenn Auth nötig ist und fehlschlägt; sonst null. */
function checkPreviewAuth(request: NextRequest): NextResponse | null {
  const password = process.env.PREVIEW_PASSWORD;
  if (!password) return null; // kein Schutz konfiguriert

  const expectedUser = process.env.PREVIEW_USER || "kinderleicht";
  const header = request.headers.get("authorization");

  if (header?.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    const user = decoded.slice(0, separator);
    const pass = decoded.slice(separator + 1);
    if (user === expectedUser && pass === password) {
      return null;
    }
  }

  return new NextResponse("Zugang zur Vorschau nur mit Passwort.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Kinderleicht Vorschau", charset="UTF-8"',
    },
  });
}

export const config = {
  // Statische Next-Assets ausnehmen (kein sensibler Inhalt).
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
