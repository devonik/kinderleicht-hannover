import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Sanity-Client für Datenabfragen aus dem Next.js-Frontend (z. B. Kursübersicht).
 * `useCdn: true` für schnelle, gecachte Reads; für frische Daten in Route Handlers
 * bei Bedarf einen eigenen Client mit `useCdn: false` erstellen.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
