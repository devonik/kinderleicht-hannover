/**
 * Zentrale Sanity-Umgebungsvariablen.
 *
 * Die Werte stammen aus `.env.local` (Vorlage: `env.example`). Vor dem ersten Start
 * muss ein Sanity-Projekt angelegt und `NEXT_PUBLIC_SANITY_PROJECT_ID` gesetzt werden
 * (siehe README / `npx sanity login && npx sanity init --env`).
 */

// apiVersion als Datum festpinnen (Sanity-Empfehlung), damit sich das API-Verhalten
// nicht unerwartet ändert. Bei Bedarf auf ein neueres Datum heraufsetzen.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-07-03";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Fehlende Umgebungsvariable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Fehlende Umgebungsvariable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
