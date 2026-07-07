import type { Metadata } from "next";

import { LegalPage, Placeholder } from "@/components/legal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Kinderleicht Hannover",
  robots: { index: false },
};

/*
 * GERÜST für die Coming-Soon-Phase. Deckt nur ab, was die Platzhalter-Seite tatsächlich tut:
 * Hosting (Server-Logs/IP), Kontakt per E-Mail, lokal gehostete Schriften.
 *
 * MUSS vor dem Buchungsstart erweitert werden um: Zahlungsabwicklung (Stripe), Speicherung von
 * Buchungs-/Teilnehmerdaten inkl. Gesundheitsdaten (Art. 9 DSGVO, Supabase), Sanity-CMS sowie
 * Newsletter (Double-Opt-In). Verantwortliche-Angaben = identisch zum Impressum → hängen an
 * Charlys noch offener Selbständigkeit.
 */
export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <p className="rounded-lg bg-sand/60 p-4 text-sm">
        Hinweis: Diese Erklärung gilt für die aktuelle Vorschau-/Coming-Soon-Seite.
        Vor dem Start der Online-Buchung wird sie um Angaben zu Zahlungsabwicklung,
        Buchungsdaten und Newsletter ergänzt.
      </p>

      <section className="space-y-2">
        <h2>Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          <Placeholder>Name und Anschrift – siehe Impressum</Placeholder>
          <br />
          E-Mail: info@kinderleicht-hannover.de
        </p>
      </section>

      <section className="space-y-2">
        <h2>Hosting</h2>
        <p>
          Diese Website wird bei einem externen Dienstleister gehostet (
          <Placeholder>Hoster, z. B. Vercel Inc. – Region/Standort</Placeholder>).
          Beim Aufruf der Seite verarbeitet der Hoster technisch notwendige Daten
          in Server-Logfiles. Rechtsgrundlage ist unser berechtigtes Interesse an
          einem sicheren, stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </section>

      <section className="space-y-2">
        <h2>Server-Logfiles</h2>
        <p>
          Bei jedem Zugriff werden automatisch Informationen erfasst, die Ihr
          Browser übermittelt: u. a. IP-Adresse, Datum und Uhrzeit des Zugriffs,
          angeforderte Seite, Referrer sowie Browser- und Betriebssystem-Angaben.
          Diese Daten dienen ausschließlich der technischen Bereitstellung und
          Sicherheit und werden nicht mit anderen Datenquellen zusammengeführt.
        </p>
      </section>

      <section className="space-y-2">
        <h2>Kontaktaufnahme per E-Mail</h2>
        <p>
          Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur
          Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Die Daten
          werden gelöscht, sobald sie für den Zweck nicht mehr erforderlich sind.
        </p>
      </section>

      <section className="space-y-2">
        <h2>Schriftarten</h2>
        <p>
          Die verwendeten Schriften werden lokal von unserem Server ausgeliefert.
          Es besteht dabei keine Verbindung zu Servern Dritter (z. B. Google
          Fonts), es werden hierfür keine personenbezogenen Daten übertragen.
        </p>
      </section>

      <section className="space-y-2">
        <h2>Ihre Rechte</h2>
        <p>
          Sie haben jederzeit das Recht auf Auskunft (Art. 15), Berichtigung
          (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
          Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO). Zudem
          steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu.
        </p>
      </section>
    </LegalPage>
  );
}
