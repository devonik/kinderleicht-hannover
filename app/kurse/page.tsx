import type { Metadata } from "next";
import Link from "next/link";

import { CourseCard } from "@/components/course-card";
import { LogoMark } from "@/components/logo";
import { getCourses } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Kurse – Kinderleicht Hannover",
  description:
    "Familienkurse rund um Schwangerschaft, Baby und Kleinkind in Hannover – Übersicht aller Angebote.",
  // Solange die Seite im Coming-Soon-Zustand ist, nicht indexieren.
  robots: { index: false },
};

// Kurse ändern sich selten – ISR mit stündlicher Revalidierung reicht.
export const revalidate = 3600;

export default async function KursePage() {
  const courses = await getCourses();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <header className="flex flex-col items-center text-center">
        <Link href="/" aria-label="Zur Startseite">
          <LogoMark className="h-16 w-16" />
        </Link>
        <p className="mt-6 text-xs font-medium tracking-[0.3em] text-eucalyptus uppercase">
          Unsere Angebote
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-eucalyptus sm:text-5xl">
          Kurse
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-anthracite/80">
          Kurse rund um Schwangerschaft, Baby und Kleinkind – in fester Gruppe,
          in Präsenz in Hannover. Wähle einen Kurs für alle Details und Termine.
        </p>
      </header>

      {courses.length > 0 ? (
        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {courses.map((course) => (
            <li key={course._id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-14 rounded-3xl border border-sand bg-white/60 p-10 text-center text-anthracite/70">
          Aktuell sind keine Kurse veröffentlicht. Schau bald wieder vorbei.
        </p>
      )}
    </main>
  );
}
