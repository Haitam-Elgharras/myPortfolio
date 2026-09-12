import { writeFile } from "node:fs/promises";
import type { PostMeta } from "../src/lib/blogTypes.ts";
import { projectSlugs, staticRoutes } from "../src/data/siteRoutes.ts";
import { SITE } from "./site.ts";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function urlEntry(
  loc: string,
  changefreq: string,
  priority: number,
  lastmod?: string | null
) {
  return [
    "  <url>",
    `    <loc>${escapeXml(SITE.url + loc)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(1)}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function writeSitemap(posts: PostMeta[]) {
  const newest = posts[0]?.updated ?? posts[0]?.date ?? null;

  const entries = [
    ...staticRoutes.map((route) =>
      urlEntry(route.path, route.changefreq, route.priority)
    ),
    urlEntry("/blog", "weekly", 0.9, newest),
    ...projectSlugs.map((slug) => urlEntry(`/projects/${slug}`, "monthly", 0.8)),
    ...posts.map((post) =>
      urlEntry(`/blog/${post.slug}`, "monthly", 0.7, post.updated ?? post.date)
    ),
  ];

  await writeFile(
    "public/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      `${entries.join("\n")}\n` +
      `</urlset>\n`
  );
}
