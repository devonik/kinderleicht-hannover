/**
 * Zentrale Steuerung von Coming-Soon- vs. Live-Modus.
 *
 * Sicheres Default: Nur wenn `NEXT_PUBLIC_SITE_LIVE === "true"` (z. B. in der Preview-Env)
 * wird die echte Website mit Menü angezeigt. Ist die Variable nicht gesetzt oder ein anderer
 * Wert (Produktion), bleibt die Coming-Soon-/Maintenance-Seite aktiv – so kann in Produktion
 * nichts versehentlich aufgedeckt werden.
 */
export const isSiteLive = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

/** Hauptnavigation (nur im Live-Modus sichtbar). */
export const mainNav = [
  { href: "/", label: "Start" },
  { href: "/kurse", label: "Kurse" },
  { href: "/#kontakt", label: "Kontakt" },
] as const;

/**
 * Pfade, die auch im Coming-Soon-Modus erreichbar bleiben müssen (Rechtspflicht bzw. CMS).
 * Alles andere wird von der Maintenance-Sperre auf die Startseite umgeleitet (siehe proxy.ts).
 */
export const comingSoonAllowlist = ["/impressum", "/datenschutz", "/studio"];
