import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Course (Kurs) — zentrales Angebots-Dokument.
 *
 * Mischung aus GENERISCH (WPEscape-Blueprint: Titel, Slug, Beschreibung, Preis, Kapazität,
 * Stornoregel — passt strukturell zu Amelia/Booknetic/WooCommerce Bookings) und
 * KINDERLEICHT-SPEZIFISCH (Kurstyp-Liste, fotoVideoErlaubt, Anzahl Termine / Dauer als
 * Standardvorgaben). Spezifische Felder sind unten einzeln markiert.
 */
export const courseType = defineType({
  name: "course",
  title: "Kurs",
  type: "document",
  fields: [
    defineField({
      // GENERISCH
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      // GENERISCH
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      // GENERISCH: Hero-/Titelbild des Kurses (Kursübersicht-Karte + Detailseite).
      // Kursgebundene Bilder liegen bewusst in Sanity (Charly kann sie pro Kurs tauschen).
      name: "heroImage",
      title: "Titelbild",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt-Text (Bildbeschreibung)",
          type: "string",
          description:
            "Kurze Beschreibung für Screenreader/SEO, z. B. „Baby greift nach einer Holzrassel“.",
        }),
      ],
    }),
    defineField({
      // GENERISCH: Rich Text für die Kursdetailseite.
      name: "description",
      title: "Beschreibung",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      // KINDERLEICHT-SPEZIFISCH: feste Kurstyp-Liste laut CLAUDE.md/Kursangebot.
      name: "courseType",
      title: "Kurstyp",
      type: "string",
      options: {
        list: [
          { title: "Babykurs (1. Lebensjahr)", value: "babykurs" },
          { title: "Kleinkindkurs (2. Lebensjahr)", value: "kleinkindkurs" },
          { title: "Babymassage", value: "babymassage" },
          { title: "Eltern-Kind-Kurs (Montessori)", value: "montessori" },
          { title: "Elternberatung (Einzeltermin)", value: "elternberatung" },
          {
            title: "Schwangerschaftsaustausch",
            value: "schwangerschaftsaustausch",
          },
          { title: "Vätertreff", value: "vaetertreff" },
          { title: "Themen-/Informationsabend", value: "themenabend" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      // GENERISCH: Preis in Euro. Kinderleicht-Standard 150 € / 8 Termine.
      name: "price",
      title: "Preis (EUR)",
      type: "number",
      description: "Gesamtpreis des Kurses in Euro.",
      initialValue: 150,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      // KINDERLEICHT-SPEZIFISCH: geplante Anzahl Termine (Standard 8).
      name: "numberOfSessions",
      title: "Anzahl Termine",
      type: "number",
      description: "Geplante Anzahl der Kurstermine (Standard: 8).",
      initialValue: 8,
      validation: (rule) => rule.required().min(1).integer(),
    }),
    defineField({
      // KINDERLEICHT-SPEZIFISCH: Dauer je Termin in Minuten (Standard 60).
      name: "sessionDurationMinutes",
      title: "Dauer pro Termin (Minuten)",
      type: "number",
      description: "Dauer eines einzelnen Termins in Minuten (Standard: 60).",
      initialValue: 60,
      validation: (rule) => rule.required().min(1).integer(),
    }),
    defineField({
      // GENERISCH: maximale Kapazität. Kinderleicht-Standard 10.
      name: "maxParticipants",
      title: "Maximale Teilnehmerzahl",
      type: "number",
      initialValue: 10,
      validation: (rule) => rule.required().min(1).integer(),
    }),
    defineField({
      // GENERISCH: Mindestteilnehmerzahl steuert Absage/Zusammenlegung.
      // Kinderleicht: 6 Familien.
      name: "minParticipants",
      title: "Mindestteilnehmerzahl",
      type: "number",
      description:
        "Wird diese Zahl nicht erreicht, kann der Kurs abgesagt oder zusammengelegt werden (Standard: 6 Familien).",
      initialValue: 6,
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .integer()
          .custom((min, context) => {
            const max = (context.document?.maxParticipants as number) ?? 0;
            if (typeof min === "number" && max && min > max) {
              return "Mindestteilnehmerzahl darf nicht größer als die maximale Teilnehmerzahl sein.";
            }
            return true;
          }),
    }),
    defineField({
      // KINDERLEICHT-SPEZIFISCH: Bei Babymassage sind Foto-/Videoaufnahmen grundsätzlich
      // NICHT erlaubt → im UI kennzeichnen. Default true, für Babymassage auf false setzen.
      name: "fotoVideoErlaubt",
      title: "Foto-/Videoaufnahmen erlaubt",
      type: "boolean",
      description:
        "Bei Babymassage grundsätzlich deaktivieren (dort sind Aufnahmen nicht erlaubt).",
      initialValue: true,
    }),
    defineField({
      // GENERISCH: Verweis auf die gültige Stornoregel (referenziertes Dokument).
      name: "cancellationPolicy",
      title: "Stornoregel",
      type: "reference",
      to: [{ type: "cancellationPolicy" }],
      description: "Verknüpfte, strukturierte Storno-/Widerrufsregel.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "courseType", price: "price" },
    prepare({ title, subtitle, price }) {
      return {
        title,
        subtitle: [subtitle, price != null ? `${price} €` : null]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
