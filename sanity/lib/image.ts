import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * URL-Builder für Sanity-Bild-Assets (z. B. Bilder in der Kursbeschreibung).
 * Nutzung: `urlFor(source).width(800).url()`.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
