import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LogoMark } from "@/components/logo";

export const metadata: Metadata = {
  title: "Kinderleicht Hannover – bald für euch da",
};

const themen = ["Schwangerschaft", "Baby", "Kleinkind"];

export default function ComingSoonPage() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* Dezente Farbflächen im Hintergrund (Salbeigrün/Himmelblau) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-sage/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-32 h-96 w-96 rounded-full bg-sky/20 blur-3xl"
      />

      <div className="relative flex max-w-xl flex-col items-center">
        <LogoMark className="mb-6 h-20 w-20 sm:h-24 sm:w-24" />
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-eucalyptus">
          Website im Aufbau
        </p>

        {/* Wortmarke (Logo-SVG folgt, sobald im Repo) */}
        <h1 className="font-serif text-5xl font-semibold leading-none tracking-tight text-eucalyptus sm:text-6xl">
          Kinderleicht
        </h1>
        <p className="mt-3 text-sm tracking-[0.2em] text-sage uppercase">
          Familienkurse in Hannover
        </p>

        <span
          aria-hidden
          className="my-9 block h-px w-16 bg-terracotta/70"
        />

        <h2 className="font-serif text-3xl font-medium text-anthracite sm:text-4xl">
          Bald geht&rsquo;s los.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-anthracite/80">
          Wir arbeiten an unserer neuen Website mit direkter Online-Buchung für
          Kurse rund um Schwangerschaft, Baby und Kleinkind. Schaut bald wieder
          vorbei – oder schreibt uns bis dahin gern eine Nachricht.
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {themen.map((thema) => (
            <li
              key={thema}
              className="rounded-full bg-sand px-4 py-1.5 text-sm font-medium text-eucalyptus"
            >
              {thema}
            </li>
          ))}
        </ul>

        <a
          href="mailto:info@kinderleicht-hannover.de"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-eucalyptus px-7 py-3 text-sm font-medium text-cream transition-colors hover:bg-anthracite"
        >
          Schreib uns
        </a>
      </div>

      {/* Stimmungsbild (statisches Layout-Bild aus public/assets) */}
      <div className="relative mt-14 aspect-video w-full max-w-2xl overflow-hidden rounded-3xl shadow-sm">
        <Image
          src="/assets/home-hero.webp"
          alt="Kursleiterin und lachendes Baby am Pikler-Dreieck im Kinderleicht-Kursraum"
          fill
          priority
          sizes="(min-width: 768px) 42rem, 100vw"
          className="object-cover"
        />
      </div>

      <footer className="relative mt-16 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-anthracite/50">
        <span>© {new Date().getFullYear()} Kinderleicht Hannover</span>
        <span aria-hidden>·</span>
        <Link href="/impressum" className="hover:text-eucalyptus">
          Impressum
        </Link>
        <span aria-hidden>·</span>
        <Link href="/datenschutz" className="hover:text-eucalyptus">
          Datenschutz
        </Link>
      </footer>
    </main>
  );
}
