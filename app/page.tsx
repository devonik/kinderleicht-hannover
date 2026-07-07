import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";
import { LandingPage } from "@/components/landing-page";
import { isSiteLive } from "@/lib/site";
import { getCourses } from "@/sanity/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = isSiteLive
  ? {
      title: "Kinderleicht Hannover – Familienkurse",
      description:
        "Familienkurse rund um Schwangerschaft, Baby und Kleinkind in Hannover – in kleinen, festen Gruppen.",
    }
  : {
      title: "Kinderleicht Hannover – bald für euch da",
    };

export default async function HomePage() {
  if (!isSiteLive) {
    return <ComingSoon />;
  }

  const courses = await getCourses();
  return <LandingPage courses={courses} />;
}
