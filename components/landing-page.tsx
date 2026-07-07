import Image from "next/image";
import Link from "next/link";

import { CourseCard } from "@/components/course-card";
import type { CourseListItem } from "@/sanity/lib/queries";

/*
 * Reichere Startseite (Live-Modus). Texte sind teils Platzhalter im Marken-Ton –
 * Charly kann sie später verfeinern (bzw. wandern bei Bedarf ins CMS).
 */

const steps = [
  {
    title: "Kurs wählen",
    text: "Stöbere durch unsere Angebote rund um Schwangerschaft, Baby und Kleinkind und finde den passenden Kurs.",
  },
  {
    title: "Platz sichern",
    text: "Melde dich mit wenigen Angaben an und sichere dir deinen Platz in einer kleinen, festen Gruppe.",
  },
  {
    title: "Gemeinsam wachsen",
    text: "Erlebe wertvolle Zeit mit deinem Kind – begleitet mit Herz, Wissen und Erfahrung.",
  },
];

export function LandingPage({ courses }: { courses: CourseListItem[] }) {
  const highlights = courses.slice(0, 3);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-5xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-xs font-medium tracking-[0.3em] text-eucalyptus uppercase">
            Raum für Familien und Entwicklung
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-eucalyptus sm:text-5xl">
            Familienkurse in Hannover – mit Herz begleitet
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-anthracite/80">
            Kurse rund um Schwangerschaft, Baby und Kleinkind: in kleinen,
            festen Gruppen, in einer ruhigen, liebevoll gestalteten Umgebung.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/kurse"
              className="inline-flex items-center justify-center rounded-full bg-eucalyptus px-7 py-3 text-sm font-medium text-cream transition-colors hover:bg-anthracite"
            >
              Kurse entdecken
            </Link>
            <Link
              href="/#kontakt"
              className="inline-flex items-center justify-center rounded-full border border-eucalyptus/40 px-7 py-3 text-sm font-medium text-eucalyptus transition-colors hover:bg-sand"
            >
              Kontakt
            </Link>
          </div>
        </div>

        <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-sand shadow-sm">
          <Image
            src="/assets/home-hero.webp"
            alt="Kursleiterin und lachendes Baby am Pikler-Dreieck im Kinderleicht-Kursraum"
            fill
            priority
            sizes="(min-width: 768px) 32rem, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Über Kinderleicht */}
      <section className="bg-sand/40">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 px-6 py-16 md:grid-cols-[3fr_2fr]">
          <div>
            <p className="text-xs font-medium tracking-[0.3em] text-sage uppercase">
              Über Kinderleicht
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-anthracite sm:text-4xl">
              Ein Ort, an dem Familien ankommen
            </h2>
            <p className="mt-5 leading-relaxed text-anthracite/80">
              Kinderleicht ist ein Raum für Familien und Entwicklung: für
              Austausch, für spielerisches Lernen und für wertvolle gemeinsame
              Zeit. In kleinen Gruppen begleiten wir euch und eure Kinder
              einfühlsam durch die ersten Jahre.
            </p>
            <p className="mt-4 font-serif text-xl text-eucalyptus italic">
              „Ich begleite euch – mit Herz, Wissen und Erfahrung.“
            </p>
          </div>

          <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-sand shadow-sm">
            <Image
              src="/assets/about.webp"
              alt="Mutter und Baby entdecken gemeinsam einen Korb mit Holzspielzeug"
              fill
              sizes="(min-width: 768px) 24rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Kurs-Highlights */}
      {highlights.length > 0 ? (
        <section className="mx-auto w-full max-w-5xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.3em] text-sage uppercase">
                Unsere Angebote
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium text-anthracite sm:text-4xl">
                Kurse für dich und dein Kind
              </h2>
            </div>
            <Link
              href="/kurse"
              className="text-sm font-medium text-eucalyptus hover:text-anthracite"
            >
              Alle Kurse ansehen →
            </Link>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((course) => (
              <li key={course._id}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Ablauf */}
      <section className="bg-sand/40">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <p className="text-center text-xs font-medium tracking-[0.3em] text-sage uppercase">
            So funktioniert&rsquo;s
          </p>
          <h2 className="mt-3 text-center font-serif text-3xl font-medium text-anthracite sm:text-4xl">
            In drei Schritten dabei
          </h2>

          <ol className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-eucalyptus font-serif text-xl text-cream">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-serif text-xl font-medium text-anthracite">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-anthracite/75">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
        <p className="text-xs font-medium tracking-[0.3em] text-sage uppercase">
          Kontakt
        </p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-anthracite sm:text-4xl">
          Schreib uns
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-anthracite/80">
          Du hast Fragen zu einem Kurs oder möchtest dich unverbindlich melden?
          Wir freuen uns auf deine Nachricht.
        </p>
        <a
          href="mailto:info@kinderleicht-hannover.de"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-eucalyptus px-7 py-3 text-sm font-medium text-cream transition-colors hover:bg-anthracite"
        >
          info@kinderleicht-hannover.de
        </a>
      </section>
    </main>
  );
}
