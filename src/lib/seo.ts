import type { MetaDescriptor } from "react-router";

const siteUrl = "https://www.elhaitam.com";
const defaultImage = `${siteUrl}/og-haitam-elgharras.png`;

export type BuildMetaOptions = {
  title: string;
  description: string;
  /** Path relative to the site root; becomes og:url and the canonical link. */
  path?: string;
  image?: string;
  type?: string;
  /** JSON-LD for this page, emitted alongside the site-wide graph in root.tsx. */
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  /** Extra tags, e.g. article:published_time on a blog post. */
  extraMeta?: Array<{ name?: string; property?: string; content: string }>;
  noindex?: boolean;
};

/**
 * Builds the full head tag set for a route's `meta()` export.
 *
 * This replaces the old <Seo> component, which wrote to document.head in a
 * useEffect: those tags only existed after hydration, so social crawlers (which
 * do not run JS) never saw them. Returned from meta(), the same tags are baked
 * into the prerendered HTML and kept in sync on client navigation.
 */
export function buildMeta({
  title,
  description,
  path = "/",
  image = defaultImage,
  type = "website",
  schema,
  extraMeta = [],
  noindex = false,
}: BuildMetaOptions): MetaDescriptor[] {
  const url = new URL(path, siteUrl).toString();

  const tags: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: noindex ? "noindex,follow" : "index,follow,max-image-preview:large",
    },
    { property: "og:type", content: type },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { tagName: "link", rel: "canonical", href: url },
  ];

  for (const extra of extraMeta) {
    tags.push(extra as MetaDescriptor);
  }

  if (schema) {
    tags.push({ "script:ld+json": schema });
  }

  return tags;
}

export { siteUrl, defaultImage };
