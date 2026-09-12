import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Feed } from "feed";
import type { PostBody, PostMeta } from "../src/lib/blogTypes.ts";
import { SITE } from "./site.ts";

/** Feed readers mostly break on relative URLs, so make everything absolute. */
function absolutize(html: string) {
  return html
    .replace(/(src=")\/(?!\/)/g, `$1${SITE.url}/`)
    .replace(/(href=")\/(?!\/)/g, `$1${SITE.url}/`);
}

export async function writeFeeds(posts: PostMeta[]) {
  const feed = new Feed({
    title: SITE.blogTitle,
    description: SITE.blogDescription,
    id: `${SITE.url}/`,
    link: `${SITE.url}/blog`,
    language: "en",
    image: `${SITE.url}${SITE.defaultOgImage}`,
    favicon: `${SITE.url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${SITE.author.name}`,
    updated: posts[0]
      ? new Date(posts[0].updated ?? posts[0].date)
      : new Date(),
    feedLinks: {
      rss: `${SITE.url}/rss.xml`,
      atom: `${SITE.url}/atom.xml`,
      json: `${SITE.url}/feed.json`,
    },
    author: { name: SITE.author.name, link: SITE.author.url },
  });

  for (const post of posts) {
    const raw = await readFile(
      path.resolve("src/content/posts", `${post.slug}.json`),
      "utf8"
    );
    const body = JSON.parse(raw) as PostBody;

    feed.addItem({
      title: post.title,
      // The guid must be the permalink and never derived from the title, or a
      // title edit re-notifies every subscriber as if it were a new post.
      id: `${SITE.url}/blog/${post.slug}`,
      link: post.canonicalUrl || `${SITE.url}/blog/${post.slug}`,
      description: post.excerpt,
      content: absolutize(body.html),
      date: new Date(post.updated ?? post.date),
      category: post.tags.map((name) => ({ name })),
      image: post.ogImage ? SITE.url + post.ogImage : undefined,
      author: [{ name: SITE.author.name, link: SITE.author.url }],
    });
  }

  await writeFile("public/rss.xml", feed.rss2());
  await writeFile("public/atom.xml", feed.atom1());
  await writeFile("public/feed.json", feed.json1());
}
