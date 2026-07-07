/** Gemeinsame Formatierungs-Helfer (deutsche Lokalisierung). */

const priceFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** z. B. 150 → „150 €“. */
export function formatPrice(value: number): string {
  return priceFormatter.format(value);
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
