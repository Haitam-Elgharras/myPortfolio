/**
 * The contract between the build script and the app.
 *
 * Hand-written on purpose: both `scripts/fetch-notion-posts.ts` (Node) and the
 * React pages import it, so a shape change breaks the build on both sides
 * rather than silently producing JSON the UI cannot read.
 */

export type TocEntry = {
  id: string;
  text: string;
  depth: 2 | 3;
};

/** One row of src/content/index.json — metadata only, never the body. */
export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD) the post was published. */
  date: string;
  /** ISO date of the last meaningful edit, set by hand in Notion. */
  updated: string | null;
  tags: string[];
  /** Site-root path of the cover image, e.g. /blog-media/slug/abc.webp */
  cover: string | null;
  coverAlt: string | null;
  /** Site-root path of the 1200x630 JPEG twin used for og:image. */
  ogImage: string | null;
  readingMinutes: number;
  wordCount: number;
  featured: boolean;
  /** Set only when the post was published elsewhere first. */
  canonicalUrl: string | null;
  series: string | null;
  seriesOrder: number | null;
};

/** One src/content/posts/<slug>.json — the heavy part, loaded per post. */
export type PostBody = {
  slug: string;
  /** Fully rendered, syntax-highlighted HTML. */
  html: string;
  toc: TocEntry[];
};
