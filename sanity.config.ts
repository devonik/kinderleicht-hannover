"use client";

/**
 * Konfiguration des eingebetteten Sanity Studios.
 * Eingebunden über die Next.js-Route `app/studio/[[...tool]]/page.tsx` (erreichbar unter /studio).
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision (GROQ-Playground) nur im Dev-Modus einblenden.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
