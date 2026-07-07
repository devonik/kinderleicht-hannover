import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Sichtbar markierter Platzhalter für noch fehlende Rechtsangaben.
 * Bewusst auffällig, damit vor dem Go-Live nichts Unausgefülltes online geht.
 */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-sand px-1.5 py-0.5 font-medium text-eucalyptus">
      [ {children} ]
    </mark>
  );
}

/** Gemeinsames Layout für Impressum/Datenschutz im Marken-Look. */
export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <Link
        href="/"
        className="text-sm text-eucalyptus transition-colors hover:text-anthracite"
      >
        &larr; Zurück zur Startseite
      </Link>
      <h1 className="mt-6 font-serif text-4xl font-semibold text-eucalyptus">
        {title}
      </h1>
      <div className="mt-8 space-y-8 leading-relaxed text-anthracite/90 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-anthracite">
        {children}
      </div>
    </main>
  );
}
