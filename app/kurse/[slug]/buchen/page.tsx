import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BookingForm } from "@/components/booking-form";
import { getCourseBySlug, getCourses } from "@/sanity/lib/queries";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  return {
    title: course
      ? `${course.title} buchen – Kinderleicht Hannover`
      : "Buchung – Kinderleicht Hannover",
    robots: { index: false },
  };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [course, courses] = await Promise.all([
    getCourseBySlug(slug),
    getCourses(),
  ]);

  if (!course) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <Link
        href={`/kurse/${course.slug}`}
        className="text-sm text-eucalyptus transition-colors hover:text-anthracite"
      >
        &larr; Zurück zum Kurs
      </Link>

      <header className="mt-6">
        <p className="text-xs font-medium tracking-[0.2em] text-sage uppercase">
          Buchung
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-eucalyptus">
          {course.title}
        </h1>
        <p className="mt-4 leading-relaxed text-anthracite/80">
          Fülle deine Angaben aus, um {course.title} zu buchen. Felder mit{" "}
          <span className="text-terracotta">*</span> sind Pflicht.
        </p>
      </header>

      <div className="mt-10">
        <BookingForm
          courses={courses.map((c) => ({ slug: c.slug, title: c.title }))}
          defaultSlug={course.slug}
        />
      </div>
    </main>
  );
}
