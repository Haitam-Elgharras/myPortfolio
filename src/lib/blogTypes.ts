
export type TocEntry = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated: string | null;
  tags: string[];
  cover: string | null;
  coverAlt: string | null;
  ogImage: string | null;
  readingMinutes: number;
  wordCount: number;
  featured: boolean;
  canonicalUrl: string | null;
  series: string | null;
  seriesOrder: number | null;
};

export type PostBody = {
  slug: string;
  html: string;
  toc: TocEntry[];
};
