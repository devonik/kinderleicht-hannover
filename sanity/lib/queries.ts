import type { PortableTextBlock } from "next-sanity";

import { client } from "./client";

/**
 * GROQ-Queries + TS-Typen für die öffentliche Kurs-Darstellung (Übersicht + Detail).
 * Es werden nur öffentliche Felder gelesen — personenbezogene Buchungsdaten liegen
 * bewusst NICHT in Sanity (siehe docs/architektur-buchungsdaten.md).
 */

/** Kurstyp-Werte laut Schema (course.courseType) → deutsche Anzeigelabels. */
export const COURSE_TYPE_LABELS: Record<string, string> = {
  babykurs: "Babykurs (1. Lebensjahr)",
  kleinkindkurs: "Kleinkindkurs (2. Lebensjahr)",
  babymassage: "Babymassage",
  montessori: "Eltern-Kind-Kurs (Montessori)",
  elternberatung: "Elternberatung (Einzeltermin)",
  schwangerschaftsaustausch: "Schwangerschaftsaustausch",
  vaetertreff: "Vätertreff",
  themenabend: "Themen-/Informationsabend",
};

export function courseTypeLabel(value?: string): string {
  return (value && COURSE_TYPE_LABELS[value]) || value || "Kurs";
}

export type SessionStatus = "geplant" | "abgesagt" | "zusammengelegt";

export type CourseSession = {
  _id: string;
  startsAt: string;
  status: SessionStatus;
};

export type CancellationPolicy = {
  freeCancellationDaysBefore: number;
  partialRefundWindowStart: number;
  partialRefundWindowEnd: number;
  partialRefundPercentage: number;
  noRefundThresholdDays: number;
};

/** Kompaktdaten für die Kursübersicht (Karten). */
export type CourseListItem = {
  _id: string;
  title: string;
  slug: string;
  courseType: string;
  price: number;
  numberOfSessions: number;
  sessionDurationMinutes: number;
  maxParticipants: number;
  minParticipants: number;
  fotoVideoErlaubt: boolean;
  excerpt: string;
};

/** Volle Daten für die Kursdetailseite. */
export type CourseDetail = CourseListItem & {
  description: PortableTextBlock[] | null;
  cancellationPolicy: CancellationPolicy | null;
  sessions: CourseSession[];
};

const COURSE_CARD_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  courseType,
  price,
  numberOfSessions,
  sessionDurationMinutes,
  maxParticipants,
  minParticipants,
  "fotoVideoErlaubt": coalesce(fotoVideoErlaubt, true),
  "excerpt": pt::text(description)
`;

const COURSES_QUERY = /* groq */ `
  *[_type == "course" && defined(slug.current)] | order(price asc, title asc) {
    ${COURSE_CARD_FIELDS}
  }
`;

const COURSE_BY_SLUG_QUERY = /* groq */ `
  *[_type == "course" && slug.current == $slug][0] {
    ${COURSE_CARD_FIELDS},
    description,
    cancellationPolicy->{
      freeCancellationDaysBefore,
      partialRefundWindowStart,
      partialRefundWindowEnd,
      partialRefundPercentage,
      noRefundThresholdDays
    },
    "sessions": *[_type == "session" && references(^._id) && startsAt >= now()] | order(startsAt asc) {
      _id,
      startsAt,
      status
    }
  }
`;

const COURSE_SLUGS_QUERY = /* groq */ `
  *[_type == "course" && defined(slug.current)].slug.current
`;

export function getCourses(): Promise<CourseListItem[]> {
  return client.fetch(COURSES_QUERY);
}

export function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  return client.fetch(COURSE_BY_SLUG_QUERY, { slug });
}

export function getCourseSlugs(): Promise<string[]> {
  return client.fetch(COURSE_SLUGS_QUERY);
}
