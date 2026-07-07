import { defineField, defineType } from "sanity";

/**
 * CancellationPolicy (Stornoregel) — eigenes Sanity-Dokument mit editierbaren numerischen
 * Feldern. WICHTIG: Die konkreten Kinderleicht-Werte (28 / 28 / 14 / 30 / 14) sind ein
 * Dateneintrag im Studio, NICHT hartcodiert in der Anwendungslogik. So kann Charly die
 * Fristen/Prozentsätze jederzeit ohne Deployment ändern.
 *
 * GENERISCH (WPEscape-Blueprint): Diese Zeitfenster-/Prozent-Struktur passt strukturell zu den
 * Stornoeinstellungen gängiger WP-Buchungs-Plugins (Amelia, Booknetic, WooCommerce Bookings)
 * und lässt sich maschinell auswerten (z. B. zur Berechnung von Stripe-Refund-Beträgen).
 *
 * NICHT enthalten: das gesetzliche 14-Tage-Widerrufsrecht. Das ist gesetzlich fix und nicht
 * konfigurierbar → es bleibt feste Checkbox-Logik im Buchungsflow, nicht im Schema.
 */
export const cancellationPolicyType = defineType({
  name: "cancellationPolicy",
  title: "Stornoregel",
  type: "document",
  fields: [
    defineField({
      // KINDERLEICHT-SPEZIFISCH: interner Name zur Unterscheidung mehrerer Regeln.
      name: "title",
      title: "Bezeichnung",
      type: "string",
      description:
        "Interner Name der Regel, z. B. „Standard-Stornoregel Kinderleicht“.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      // GENERISCH: kostenfreie Stornierung ab so vielen Tagen vor Kursbeginn. Kinderleicht: 28.
      name: "freeCancellationDaysBefore",
      title: "Kostenfrei stornierbar bis (Tage vor Kursbeginn)",
      type: "number",
      description:
        "Bis zu dieser Anzahl Tage vor Kursbeginn ist die Stornierung kostenfrei. Kinderleicht: 28 (= 4 Wochen).",
      initialValue: 28,
      validation: (rule) => rule.required().min(0).integer(),
    }),
    defineField({
      // GENERISCH: Beginn (früher Rand) des Teil-Erstattungsfensters in Tagen vor Kursbeginn.
      // Kinderleicht: 28 (schließt an das kostenfreie Fenster an).
      name: "partialRefundWindowStart",
      title: "Teilerstattungsfenster Beginn (Tage vor Kursbeginn)",
      type: "number",
      description:
        "Oberer Rand des Fensters mit anteiligem Einbehalt, in Tagen vor Kursbeginn. Kinderleicht: 28.",
      initialValue: 28,
      validation: (rule) => rule.required().min(0).integer(),
    }),
    defineField({
      // GENERISCH: Ende (später Rand) des Teil-Erstattungsfensters in Tagen vor Kursbeginn.
      // Kinderleicht: 14.
      name: "partialRefundWindowEnd",
      title: "Teilerstattungsfenster Ende (Tage vor Kursbeginn)",
      type: "number",
      description:
        "Unterer Rand des Fensters mit anteiligem Einbehalt, in Tagen vor Kursbeginn. Kinderleicht: 14.",
      initialValue: 14,
      validation: (rule) => rule.required().min(0).integer(),
    }),
    defineField({
      // GENERISCH: einbehaltener Prozentsatz innerhalb des Teil-Erstattungsfensters.
      // Kinderleicht: 30 %.
      name: "partialRefundPercentage",
      title: "Einbehalt im Teilerstattungsfenster (%)",
      type: "number",
      description:
        "Prozentsatz der Kursgebühr, der im Teilerstattungsfenster einbehalten wird. Kinderleicht: 30.",
      initialValue: 30,
      validation: (rule) => rule.required().min(0).max(100),
    }),
    defineField({
      // GENERISCH: ab weniger als so vielen Tagen vor Kursbeginn keine Erstattung (volle Gebühr).
      // Kinderleicht: 14.
      name: "noRefundThresholdDays",
      title: "Keine Erstattung ab (Tage vor Kursbeginn)",
      type: "number",
      description:
        "Ab weniger als dieser Anzahl Tage vor Kursbeginn (bzw. Nichterscheinen) wird die volle Gebühr fällig. Kinderleicht: 14.",
      initialValue: 14,
      validation: (rule) => rule.required().min(0).integer(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      free: "freeCancellationDaysBefore",
      pct: "partialRefundPercentage",
    },
    prepare({ title, free, pct }) {
      return {
        title: title || "Stornoregel",
        subtitle: `Kostenfrei bis ${free ?? "?"} Tage · dann ${pct ?? "?"} % Einbehalt`,
      };
    },
  },
});
