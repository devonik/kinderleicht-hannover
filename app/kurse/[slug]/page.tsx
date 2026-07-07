import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CourseDescription } from "@/components/portable-text";
import { formatDate, formatPrice, formatTime } from "@/lib/format";
import { urlFor } from "@/sanity/lib/image";
import {
  courseTypeLabel,
  getCourseBySlug,
  getCourseSlugs,
  type CancellationPolicy,
  type CourseSession,
} from "@/sanity/lib/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return { title: "Kurs nicht gefunden – Kinderleicht Hannover" };
  }

  return {
    title: `${course.title} – Kinderleicht Hannover`,
    description: course.excerpt || undefined,
    robots: { index: false },
  };
}

const STATUS_LABELS: Record<CourseSession["status"], string> = {
  geplant: "",
  abgesagt: "Abgesagt",
  zusammengelegt: "Zusammengelegt",
};

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Bereits in GROQ auf kommende Termine (startsAt >= now()) gefiltert.
  const upcomingSessions = course.sessions;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/kurse"
        className="text-sm text-eucalyptus transition-colors hover:text-anthracite"
      >
        &larr; Alle Kurse
      </Link>

      {course.heroImage ? (
        <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-3xl bg-sand">
          <Image
            src={urlFor(course.heroImage)
              .width(1280)
              .height(720)
              .fit("crop")
              .auto("format")
              .url()}
            alt={course.heroImage.alt ?? course.title}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <header className="mt-8">
        <p className="text-xs font-medium tracking-[0.2em] text-sage uppercase">
          {courseTypeLabel(course.courseType)}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-eucalyptus sm:text-5xl">
          {course.title}
        </h1>

        {!course.fotoVideoErlaubt ? (
          <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-sand px-4 py-1.5 text-sm font-medium text-eucalyptus">
            Hinweis: In diesem Kurs sind Foto- und Videoaufnahmen nicht erlaubt.
          </p>
        ) : null}
      </header>

      {/* Rahmendaten */}
      <dl className="mt-8 grid grid-cols-2 gap-4 rounded-3xl border border-sand bg-white/60 p-6 sm:grid-cols-4">
        <Fact label="Preis" value={formatPrice(course.price)} />
        <Fact label="Termine" value={`${course.numberOfSessions}×`} />
        <Fact
          label="Pro Termin"
          value={`${course.sessionDurationMinutes} Min.`}
        />
        <Fact
          label="Gruppe"
          value={
            course.maxParticipants <= 1
              ? "Einzeltermin"
              : `${course.minParticipants}–${course.maxParticipants} Fam.`
          }
        />
      </dl>

      {/* Beschreibung */}
      {course.description && course.description.length > 0 ? (
        <section className="mt-12">
          <CourseDescription value={course.description} />
        </section>
      ) : null}

      {/* Termine */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-medium text-anthracite">
          Termine
        </h2>
        {upcomingSessions.length > 0 ? (
          <ul className="mt-5 space-y-3">
            {upcomingSessions.map((session) => (
              <li
                key={session._id}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-2xl border border-sand bg-white/60 px-5 py-4"
              >
                <span className="font-medium text-anthracite">
                  {formatDate(session.startsAt)}
                </span>
                <span className="text-sm text-anthracite/70">
                  {formatTime(session.startsAt)}
                </span>
                {STATUS_LABELS[session.status] ? (
                  <span className="rounded-full bg-terracotta/15 px-3 py-0.5 text-xs font-medium text-terracotta">
                    {STATUS_LABELS[session.status]}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 rounded-2xl border border-sand bg-white/60 px-5 py-4 text-anthracite/70">
            Die nächsten Termine stehen noch nicht fest. Schreib uns gern für den
            geplanten Kursstart.
          </p>
        )}
        {course.minParticipants > 1 && course.maxParticipants > 1 ? (
          <p className="mt-3 text-sm text-anthracite/60">
            Der Kurs findet ab {course.minParticipants} Familien statt. Wird die
            Mindestzahl nicht erreicht, kann er abgesagt oder mit einem anderen
            Kurs zusammengelegt werden.
          </p>
        ) : null}
      </section>

      {/* Stornoregeln */}
      {course.cancellationPolicy ? (
        <CancellationSummary policy={course.cancellationPolicy} />
      ) : null}

      {/* Buchungs-CTA – der eigentliche Online-Buchungsflow (Stripe) folgt später. */}
      <section className="mt-12 rounded-3xl bg-eucalyptus px-7 py-9 text-center text-cream">
        <h2 className="font-serif text-2xl font-medium">Interesse an diesem Kurs?</h2>
        <p className="mx-auto mt-3 max-w-md text-cream/85">
          Die direkte Online-Buchung ist in Kürze verfügbar. Bis dahin erreichst
          du uns jederzeit per E-Mail.
        </p>
        <a
          href={`mailto:info@kinderleicht-hannover.de?subject=${encodeURIComponent(
            `Anfrage: ${course.title}`,
          )}`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-cream px-7 py-3 text-sm font-medium text-eucalyptus transition-colors hover:bg-sand"
        >
          Kurs anfragen
        </a>
      </section>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-[0.15em] text-sage uppercase">{label}</dt>
      <dd className="mt-1 font-serif text-xl text-anthracite">{value}</dd>
    </div>
  );
}

/**
 * Menschlich lesbare Zusammenfassung der (im Studio konfigurierbaren) Stornoregel.
 * Die Werte kommen aus dem cancellationPolicy-Dokument, nicht aus hartcodierter Logik.
 */
function CancellationSummary({ policy }: { policy: CancellationPolicy }) {
  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl font-medium text-anthracite">
        Stornierung &amp; Widerruf
      </h2>
      <ul className="mt-5 space-y-2 text-anthracite/85">
        <li>
          Bis {policy.freeCancellationDaysBefore} Tage vor Kursbeginn:{" "}
          <strong className="font-semibold">kostenfreie Stornierung</strong>.
        </li>
        <li>
          Zwischen {policy.partialRefundWindowStart} und{" "}
          {policy.partialRefundWindowEnd} Tagen vorher: Einbehalt von{" "}
          {policy.partialRefundPercentage} % der Kursgebühr.
        </li>
        <li>
          Ab {policy.noRefundThresholdDays} Tagen vor Kursbeginn: volle Gebühr
          fällig.
        </li>
        <li>
          Bei Nachbesetzung über die Warteliste erfolgt eine volle Erstattung
          (abzüglich anfallender Zahlungsgebühren).
        </li>
      </ul>
      <p className="mt-4 text-sm text-anthracite/60">
        Unabhängig davon gilt das gesetzliche 14-tägige Widerrufsrecht. Beginnt
        der Kurs vor Ablauf dieser Frist, wird deine ausdrückliche Zustimmung
        dazu vor der Buchung eingeholt.
      </p>
    </section>
  );
}
