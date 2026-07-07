import { type SchemaTypeDefinition } from "sanity";

import { cancellationPolicyType } from "./cancellationPolicy";
import { courseType } from "./course";
import { sessionType } from "./session";

/**
 * Nur öffentlicher Website-Content liegt in Sanity (Free-Tier = public Dataset).
 * Personenbezogene Daten (Buchungen, Teilnehmer inkl. Gesundheitsdaten) gehören NICHT hierher,
 * sondern in eine zugriffsgeschützte DB — siehe docs/architektur-buchungsdaten.md.
 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [courseType, sessionType, cancellationPolicyType],
};
