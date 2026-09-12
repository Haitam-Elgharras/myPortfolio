import indexJson from "../content/index.json";
import type { PostBody, PostMeta } from "./blogTypes";

/** All published posts, newest first (the build script sorts them). */
export const posts = indexJson as PostMeta[];

/**
 * One lazy chunk per post body.
 *
 * Not `eager`: a code-heavy post is tens of KB of highlighted HTML, and the
 * index page has no reason to ship any of them.
 */
const bodies = import.meta.glob<PostBody>("../content/posts/*.json", {
  import: "default",
});

export async function loadPostBody(slug: string): Promise<PostBody | null> {
  const loader = bodies[`../content/posts/${slug}.json`];
  return loader ? await loader() : null;
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return posts.find((post) => post.slug === slug);
}

export function allTags(): Array<{ tag: string; count: number }> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

// ------------------------------------------------------------------- search

/** Lowercase and strip diacritics so "référence" matches "reference". */
const fold = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const haystack = new Map(
  posts.map((post) => [
    post.slug,
    fold([post.title, post.excerpt, ...post.tags, post.series ?? ""].join(" ")),
  ])
);

/**
 * Substring match across title, excerpt, tags and series, ANDed over terms.
 *
 * Deliberately not fuzzy: at this scale a scan costs nothing, and edit-distance
 * matching would surface "Kotlin" when you searched for "Kafka".
 */
export function filterPosts(
  all: PostMeta[],
  query: string,
  tag: string | null
): PostMeta[] {
  const terms = fold(query).split(/\s+/).filter(Boolean);

  return all.filter((post) => {
    if (tag && !post.tags.includes(tag)) return false;
    if (terms.length === 0) return true;
    const hay = haystack.get(post.slug) ?? "";
    return terms.every((term) => hay.includes(term));
  });
}

// --------------------------------------------------------------- navigation

/**
 * Neighbouring posts by publish date.
 *
 * Named older/newer rather than prev/next: "previous" is ambiguous about
 * whether it means earlier in time or earlier in the list, which is how these
 * end up swapped.
 */
export function getAdjacent(slug: string) {
  const i = posts.findIndex((post) => post.slug === slug);
  if (i === -1) return { older: null, newer: null };
  return {
    newer: i > 0 ? posts[i - 1] : null,
    older: i < posts.length - 1 ? posts[i + 1] : null,
  };
}

export function getSeries(post: PostMeta): PostMeta[] {
  if (!post.series) return [];
  return posts
    .filter((other) => other.series === post.series)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}

/**
 * Related posts: normalised tag overlap, a bonus for the same series, and a
 * gentle recency nudge that can never outweigh a shared tag.
 */
export function getRelated(post: PostMeta, limit = 3): PostMeta[] {
  const tags = new Set(post.tags);

  return posts
    .filter((other) => other.slug !== post.slug)
    .map((other) => {
      const shared = other.tags.filter((tag) => tags.has(tag)).length;
      // Jaccard-ish, so a post with many tags cannot dominate a focused one.
      const union = new Set([...tags, ...other.tags]).size;
      const overlap = shared === 0 || union === 0 ? 0 : shared / union;
      const sameSeries = post.series && other.series === post.series ? 0.5 : 0;
      const daysApart =
        Math.abs(Date.parse(other.date) - Date.parse(post.date)) / 86_400_000;
      const recency = 1 / (1 + daysApart / 180);

      return { post: other, score: overlap + sameSeries + recency * 0.15 };
    })
    .filter((entry) => entry.score > 0.15)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((entry) => entry.post);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
