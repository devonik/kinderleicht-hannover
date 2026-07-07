import Link from "next/link";

import { LogoMark } from "@/components/logo";
import { mainNav } from "@/lib/site";

/** Seiten-Header mit Hauptnavigation (nur im Live-Modus eingebunden). */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-sand/70 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Zur Startseite">
          <LogoMark className="h-9 w-9" />
          <span className="font-serif text-xl font-semibold text-eucalyptus">
            Kinderleicht
          </span>
        </Link>

        <nav aria-label="Hauptnavigation">
          <ul className="flex items-center gap-1 sm:gap-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-anthracite/80 transition-colors hover:bg-sand hover:text-eucalyptus"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
