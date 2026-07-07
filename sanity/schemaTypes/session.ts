import { defineField, defineType } from "sanity";

/**
 * Session (Termin) — ein einzelner Kurstermin.
 *
 * GENERISCH (WPEscape-Blueprint): Verknüpfung Kurs ↔ Zeitpunkt ↔ Status entspricht der
 * „Appointment/Slot“-Struktur gängiger WP-Buchungs-Plugins. Der Status-Wert
 * „zusammengelegt“ ist KINDERLEICHT-SPEZIFISCH (Mindestteilnehmerzahl-Logik).
 */
export const sessionType = defineType({
  name: "session",
  title: "Termin",
  type: "document",
  fields: [
    defineField({
      // GENERISCH: zu welchem Kurs gehört der Termin.
      name: "course",
      title: "Kurs",
      type: "reference",
      to: [{ type: "course" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      // GENERISCH: Datum + Uhrzeit in einem datetime-Feld (Zeitzone-sicher).
      name: "startsAt",
      title: "Datum & Uhrzeit",
      type: "datetime",
      options: { dateFormat: "DD.MM.YYYY", timeFormat: "HH:mm" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      // GENERISCH mit KINDERLEICHT-SPEZIFISCHEM Status „zusammengelegt“.
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Geplant", value: "geplant" },
          { title: "Abgesagt", value: "abgesagt" },
          { title: "Zusammengelegt", value: "zusammengelegt" },
        ],
        layout: "radio",
      },
      initialValue: "geplant",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      course: "course.title",
      startsAt: "startsAt",
      status: "status",
    },
    prepare({ course, startsAt, status }) {
      const date = startsAt
        ? new Date(startsAt).toLocaleString("de-DE", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "Kein Datum";
      return {
        title: course || "Termin",
        subtitle: `${date}${status && status !== "geplant" ? ` · ${status}` : ""}`,
      };
    },
  },
});
