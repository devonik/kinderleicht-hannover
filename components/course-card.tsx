import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/format";
import { urlFor } from "@/sanity/lib/image";
import { courseTypeLabel, type CourseListItem } from "@/sanity/lib/queries";

/** Karte für die Kursübersicht. Verlinkt auf die Detailseite. */
export function CourseCard({ course }: { course: CourseListItem }) {
  return (
    <Link
      href={`/kurse/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand bg-white/60 transition-colors hover:border-eucalyptus/40 hover:bg-white"
    >
      {course.heroImage ? (
        <div className="relative aspect-3/2 w-full overflow-hidden bg-sand">
          <Image
            src={urlFor(course.heroImage)
              .width(800)
              .height(534)
              .fit("crop")
              .auto("format")
              .url()}
            alt={course.heroImage.alt ?? course.title}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-7">
        <p className="text-xs font-medium tracking-[0.2em] text-sage uppercase">
          {courseTypeLabel(course.courseType)}
        </p>

        <h2 className="mt-3 font-serif text-2xl font-medium text-anthracite group-hover:text-eucalyptus">
          {course.title}
        </h2>

        {course.excerpt ? (
          <p className="mt-3 line-clamp-3 leading-relaxed text-anthracite/75">
            {course.excerpt}
          </p>
        ) : null}

        {!course.fotoVideoErlaubt ? (
          <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-xs font-medium text-eucalyptus">
            Keine Foto-/Videoaufnahmen
          </p>
        ) : null}

        <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-sand pt-5 text-sm text-anthracite/70">
          <div>
            <dt className="sr-only">Preis</dt>
            <dd className="font-semibold text-eucalyptus">
              {formatPrice(course.price)}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Umfang</dt>
            <dd>
              {course.numberOfSessions} Termine · je{" "}
              {course.sessionDurationMinutes} Min.
            </dd>
          </div>
          <div>
            <dt className="sr-only">Gruppengröße</dt>
            <dd>
              {course.minParticipants}–{course.maxParticipants} Familien
            </dd>
          </div>
        </dl>

        <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-eucalyptus">
          Kurs ansehen
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
