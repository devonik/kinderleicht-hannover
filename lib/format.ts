/** Gemeinsame Formatierungs-Helfer (deutsche Lokalisierung). */

const priceFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** z. B. 150 → „150 €“; 0 → „Kostenlos“. */
export function formatPrice(value: number): string {
  if (value === 0) return "Kostenlos";
  return priceFormatter.format(value);
}

/** Anzahl Termine mit korrektem Singular/Plural, z. B. „1 Termin“ / „8 Termine“. */
export function formatSessionCount(count: number): string {
  return `${count} ${count === 1 ? "Termin" : "Termine"}`;
}

/**
 * Gruppengröße als Text. Bei maximal einer Familie handelt es sich um einen
 * Einzeltermin, sonst „min–max Familien“.
 */
export function formatGroupSize(min: number, max: number): string {
  if (max <= 1) return "Einzeltermin";
  return `${min}–${max} Familien`;
}

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Berlin",
});

const timeFormatter = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Berlin",
});

/** ISO-Datetime → „Montag, 08. September 2026“. */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** ISO-Datetime → „10:00 Uhr“. */
export function formatTime(iso: string): string {
  return `${timeFormatter.format(new Date(iso))} Uhr`;
}
