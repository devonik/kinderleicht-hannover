import type { Metadata } from "next";

import { LegalPage, Placeholder } from "@/components/legal";

export const metadata: Metadata = {
  title: "Impressum – Kinderleicht Hannover",
  robots: { index: false },
};

/*
 * GERÜST – vor Go-Live von Charly auszufüllen.
 *
 * Voraussetzung: Charly hat aktuell noch KEINE angemeldete Selbständigkeit. Sobald das
 * geklärt ist, hängen die konkreten Angaben an der Rechtsform (Einzelunternehmen/Freiberuf):
 * vollständiger Name, ladungsfähige Anschrift (kein Postfach), Telefon, ggf. USt-IdNr.
 * Erst wenn diese Daten stehen, darf die Seite unter der Domain öffentlich gehen.
 * Rechtsgrundlage: § 5 Digitale-Dienste-Gesetz (DDG, ersetzt § 5 TMG).
 */
export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <section className="space-y-2">
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          <Placeholder>Vollständiger Name / Anbieter</Placeholder>
          <br />
          <Placeholder>Straße und Hausnummer</Placeholder>
          <br />
          <Placeholder>PLZ und Ort</Placeholder>
        </p>
      </section>

      <section className="space-y-2">
        <h2>Kontakt</h2>
        <p>
          Telefon: <Placeholder>Telefonnummer</Placeholder>
          <br />
          E-Mail: info@kinderleicht-hannover.de
        </p>
      </section>

      <section className="space-y-2">
        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
          <br />
          <Placeholder>USt-IdNr. – falls vorhanden, andernfalls entfällt</Placeholder>
        </p>
      </section>

      <section className="space-y-2">
        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </LegalPage>
  );
}
