import type { StructureResolver } from "sanity/structure";

/**
 * Studio-Navigation (Desk-Struktur). Gruppiert die Dokumenttypen in eine sinnvolle Reihenfolge
 * für die Kursverwaltung. Rein kosmetisch — ohne diese Datei würde Sanity alle Typen alphabetisch
 * auflisten.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Kinderleicht")
    .items([
      S.documentTypeListItem("course").title("Kurse"),
      S.documentTypeListItem("session").title("Termine"),
      S.divider(),
      S.documentTypeListItem("cancellationPolicy").title("Stornoregeln"),
    ]);
