/**
 * Eingebettetes Sanity Studio unter /studio.
 *
 * Diese Seite ist bewusst KEIN Client-Component: So können `metadata`/`viewport` aus
 * `next-sanity/studio` re-exportiert werden. Das eigentliche Studio (`<NextStudio>`) ist ein
 * Client-Component und lädt die Konfiguration aus `sanity.config.ts` (dort steht "use client").
 *
 * Der Catch-all-Slug `[[...tool]]` fängt alle Studio-Unterrouten (Desk, Vision ...) ab; der
 * `basePath: "/studio"` in der Sanity-Config sorgt für das passende Routing.
 */
import { NextStudio } from "next-sanity/studio";

import config from "../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
