import Link from "next/link";

/** Seiten-Footer (nur im Live-Modus eingebunden). */
export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-sand bg-sand/30">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-serif text-lg font-semibold text-eucalyptus">
            Kinderleicht
          </p>
          <p className="text-sm text-anthracite/70">
            Familienkurse in Hannover · Raum für Familien und Entwicklung
          </p>
        </div>

        <nav aria-label="Rechtliches">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-anthracite/70">
            <li>
              <a
                href="mailto:info@kinderleicht-hannover.de"
                className="hover:text-eucalyptus"
              >
                Kontakt
              </a>
            </li>
            <li>
              <Link href="/impressum" className="hover:text-eucalyptus">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-eucalyptus">
                Datenschutz
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <p className="pb-8 text-center text-xs text-anthracite/45">
        © {new Date().getFullYear()} Kinderleicht Hannover
      </p>
    </footer>
  );
}
