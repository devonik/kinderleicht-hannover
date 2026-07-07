/**
 * Vektor-Neuzeichnung der Bildmarke aus dem Kinderleicht-Logo: Papierflieger im Salbeikreis.
 * Bewusst als sauberes, skalierbares SVG (statt des 263 KB großen JPEG-im-SVG), u. a. als
 * Favicon-Basis (siehe app/icon.svg – identische Geometrie). Farben aus dem Original abgeleitet:
 * Petrol (Flieger/Schrift) + Salbeigrün (Aquarellkreis).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Kinderleicht"
    >
      <circle cx="32" cy="32" r="31" fill="#A9C3A7" />
      {/* Papierflieger: volle Silhouette (petrol) + dunklere Unterseite für Origami-Falz */}
      <path d="M56 12 L8 34 L30 42 L26 56 Z" fill="#3E6E7E" />
      <path d="M56 12 L30 42 L26 56 Z" fill="#335E6B" />
    </svg>
  );
}
