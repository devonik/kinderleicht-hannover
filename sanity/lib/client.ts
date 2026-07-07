import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Sanity-Client für Datenabfragen aus dem Next.js-Frontend (z. B. Kursübersicht).
 * `useCdn: false`, da alle Reads server-seitig über SSG/ISR laufen: Beim (Re-)Build
 * bzw. bei der stündlichen Revalidierung wollen wir den frischen, publizierten Stand
 * und nicht die evtl. verzögerte CDN-Kopie (sonst fehlen z. B. gerade angelegte Kurse).
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
