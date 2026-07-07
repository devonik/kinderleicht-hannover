import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

/** Marken-Styling für die Rich-Text-Beschreibung eines Kurses. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg leading-relaxed text-anthracite/85">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-serif text-2xl font-medium text-anthracite">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-serif text-xl font-medium text-anthracite">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-terracotta/70 pl-4 text-lg italic text-anthracite/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-1 pl-5 text-lg text-anthracite/85">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-1 pl-5 text-lg text-anthracite/85">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-anthracite">{children}</strong>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-eucalyptus underline underline-offset-2 hover:text-anthracite"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <Image
          src={urlFor(value).width(1200).fit("max").auto("format").url()}
          alt={value.alt ?? ""}
          width={1200}
          height={800}
          className="h-auto w-full rounded-2xl"
        />
      ) : null,
  },
};

export function CourseDescription({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="space-y-5">
      <PortableText value={value} components={components} />
    </div>
  );
}
