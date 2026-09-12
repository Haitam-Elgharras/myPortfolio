import { Client, isFullDatabase, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import type { PostMeta, PostBody } from "../src/lib/blogTypes.ts";
import { mdToHtml } from "./markdown.ts";
import { readingTime } from "./readingTime.ts";
import { localizeAsset, localizeMarkdown, MEDIA_DIR } from "./notionAssets.ts";
import { writeSitemap } from "./sitemap.ts";
import { writeFeeds } from "./feeds.ts";
import { writeLlmsTxt } from "./llms.ts";

const CONTENT_DIR = path.resolve("src/content");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_BLOG_DATABASE_ID;

if (!token || !databaseId) {
  console.error(
    "NOTION_TOKEN and NOTION_BLOG_DATABASE_ID are required.\n" +
      "Copy .env.example to .env and fill them in, then re-run."
  );
  process.exit(1);
}

const notion = new Client({ auth: token, retry: { maxRetries: 4 } });

type Props = PageObjectResponse["properties"];

const plain = (rich: Array<{ plain_text: string }>) =>
  rich.map((t) => t.plain_text).join("");

function text(props: Props, key: string): string {
  const p = props[key];
  if (p?.type === "rich_text") return plain(p.rich_text).trim();
  if (p?.type === "title") return plain(p.title).trim();
  return "";
}

function date(props: Props, key: string): string | null {
  const p = props[key];
  return p?.type === "date" ? p.date?.start ?? null : null;
}

function multiSelect(props: Props, key: string): string[] {
  const p = props[key];
  return p?.type === "multi_select" ? p.multi_select.map((o) => o.name) : [];
}

function checkbox(props: Props, key: string): boolean {
  const p = props[key];
  return p?.type === "checkbox" ? p.checkbox : false;
}

function select(props: Props, key: string): string | null {
  const p = props[key];
  return p?.type === "select" ? p.select?.name ?? null : null;
}

function num(props: Props, key: string): number | null {
  const p = props[key];
  return p?.type === "number" ? p.number : null;
}

function url(props: Props, key: string): string | null {
  const p = props[key];
  return p?.type === "url" ? p.url : null;
}

function rawCover(page: PageObjectResponse): string | null {
  const p = page.properties["Cover"];
  if (p?.type === "files" && p.files.length > 0) {
    const file = p.files[0];
    if (file.type === "file") return file.file.url;
    if (file.type === "external") return file.external.url;
  }
  const cover = page.cover;
  if (cover?.type === "file") return cover.file.url;
  if (cover?.type === "external") return cover.external.url;
  return null;
}

function truncate(value: string, max: number) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

async function resolveDataSourceId(id: string) {
  const database = await notion.databases.retrieve({ database_id: id });
  if (!isFullDatabase(database)) {
    throw new Error(
      `Database ${id} came back partial. The integration probably lacks read ` +
        "access to it (••• → Connections)."
    );
  }
  const dataSourceId = database.data_sources[0]?.id;
  if (!dataSourceId) {
    throw new Error(
      `Database ${id} exposes no data sources. Make sure the integration is ` +
        "connected to it (••• → Connections)."
    );
  }
  return dataSourceId;
}

async function queryPublished(dataSourceId: string) {
  const rows: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: { property: "Status", status: { equals: "Published" } },
      sorts: [{ property: "Published", direction: "descending" }],
      start_cursor: cursor,
      page_size: 100,
    });
    rows.push(...response.results.filter(isFullPage));
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return rows;
}

const n2m = new NotionToMarkdown({
  notionClient: notion,
  config: { parseChildPages: false },
});

async function buildPost(page: PageObjectResponse) {
  const props = page.properties;

  const title = text(props, "Name");
  const slug = text(props, "Slug");
  const published = date(props, "Published");

  if (!title) throw new Error(`Page ${page.id}: title ("Name") is empty.`);
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      `Page ${page.id} ("${title}"): Slug must be lowercase-kebab-case, got "${slug}".`
    );
  }
  if (!published) {
    throw new Error(`Page ${page.id} ("${title}"): a Published date is required.`);
  }

  const blocks = await n2m.pageToMarkdown(page.id);
  const rawMarkdown = n2m.toMarkdownString(blocks).parent ?? "";
  const markdown = await localizeMarkdown(rawMarkdown, slug);
  const { html, toc, plainText } = await mdToHtml(markdown);

  const coverSource = rawCover(page);
  const cover = coverSource
    ? await localizeAsset(coverSource, slug, { asCover: true })
    : null;

  const meta: PostMeta = {
    slug,
    title,
    excerpt: text(props, "Excerpt") || truncate(plainText, 160),
    date: published.slice(0, 10),
    updated: date(props, "Updated")?.slice(0, 10) ?? null,
    tags: multiSelect(props, "Tags"),
    cover: cover?.url ?? null,
    coverAlt: text(props, "Cover alt") || null,
    ogImage: cover?.ogUrl ?? null,
    readingMinutes: readingTime(markdown),
    wordCount: plainText.split(/\s+/).filter(Boolean).length,
    featured: checkbox(props, "Featured"),
    canonicalUrl: url(props, "Canonical URL"),
    series: select(props, "Series"),
    seriesOrder: num(props, "Series order"),
  };

  const body: PostBody = { slug, html, toc };
  return { meta, body };
}

const dataSourceId = await resolveDataSourceId(databaseId);
const pages = await queryPublished(dataSourceId);

if (pages.length === 0) {
  console.warn(
    'No posts with Status "Published" found. Check the Status property and that ' +
      "the integration is connected to the database."
  );
}

await rm(POSTS_DIR, { recursive: true, force: true });
await rm(MEDIA_DIR, { recursive: true, force: true });
await mkdir(POSTS_DIR, { recursive: true });

const index: PostMeta[] = [];

for (const page of pages) {
  const { meta, body } = await buildPost(page);
  index.push(meta);
  await writeFile(
    path.join(POSTS_DIR, `${meta.slug}.json`),
    `${JSON.stringify(body)}\n`
  );
  console.log(`  ✓ ${meta.slug} (${meta.readingMinutes} min)`);
}

const duplicates = index
  .map((p) => p.slug)
  .filter((slug, i, all) => all.indexOf(slug) !== i);
if (duplicates.length > 0) {
  throw new Error(`Duplicate slugs: ${[...new Set(duplicates)].join(", ")}`);
}

for (const post of index) {
  const body = JSON.parse(
    await import("node:fs/promises").then((fs) =>
      fs.readFile(path.join(POSTS_DIR, `${post.slug}.json`), "utf8")
    )
  ) as PostBody;
  if (/amazonaws\.com|notion-static\.com/.test(body.html)) {
    throw new Error(
      `Post "${post.slug}" still references an expiring Notion URL. ` +
        "localizeMarkdown missed a reference shape."
    );
  }
}

index.sort((a, b) => b.date.localeCompare(a.date));

await writeFile(
  path.join(CONTENT_DIR, "index.json"),
  `${JSON.stringify(index, null, 2)}\n`
);

await writeSitemap(index);
await writeFeeds(index);
await writeLlmsTxt(index);

console.log(`\n${index.length} post(s) written to src/content/.`);
