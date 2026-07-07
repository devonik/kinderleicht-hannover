import { defineCliConfig } from "sanity/cli";

/**
 * Sanity-CLI-Konfiguration (für `npx sanity ...`, z. B. `sanity dataset import`,
 * `sanity deploy`). Liest dieselben Env-Variablen wie die App.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  /**
   * Studio läuft eingebettet in Next.js (nicht als eigenständige Single-Page-App),
   * daher automatische Updates deaktivieren.
   */
  autoUpdates: false,
});
