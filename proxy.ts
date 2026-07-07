import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Basic-Auth-Schutz für die Vorschau-Umgebung.
 *
 * Aktiv NUR, wenn die Umgebungsvariable `PREVIEW_PASSWORD` gesetzt ist. So lässt sich die
 * Preview (z. B. preview.kinderleicht-hannover.de) mit einem geteilten Passwort schützen,
 * während der spätere echte Go-Live in Produktion – wo die Variable NICHT gesetzt ist –
 * ganz normal offen bleibt. Portabel (kein Vercel-Lock-in), wandert 1:1 in den Blueprint.
 *
 * Optionaler Benutzername über `PREVIEW_USER` (Standard: „kinderleicht").
 */
export function proxy(request: NextRequest) {
  const password = process.env.PREVIEW_PASSWORD;

  // Kein Passwort konfiguriert (z. B. lokal oder in Produktion) → kein Schutz.
  if (!password) return NextResponse.next();

  const expectedUser = process.env.PREVIEW_USER || "kinderleicht";
  const header = request.headers.get("authorization");

  if (header?.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    const user = decoded.slice(0, separator);
    const pass = decoded.slice(separator + 1);
    if (user === expectedUser && pass === password) {
      return NextResponse.next();
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
  // Statische Next-Assets vom Auth-Check ausnehmen (kein sensibler Inhalt).
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
