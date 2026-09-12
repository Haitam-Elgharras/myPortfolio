import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const MEDIA_DIR = path.resolve("public/blog-media");
export const MEDIA_URL_BASE = "/blog-media";

const MAX_WIDTH = 1600;
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** Notion's own S3/file hosts hand out presigned URLs that expire in ~1 hour. */
const EXPIRING_HOST =
  /amazonaws\.com|notion-static\.com|\.notion\.so\/(image|signed)/;

export function isExpiring(url: string) {
  return EXPIRING_HOST.test(url);
}

/**
 * Key an asset by its URL *path* only.
 *
 * The query string carries X-Amz-Signature, which is different on every fetch,
 * so hashing the whole URL would make every image look new on every sync and
 * rewrite the entire content directory each run.
 */
function assetKey(url: string) {
  const pathname = (() => {
    try {
      return new URL(url).pathname;
    } catch {
      return url;
    }
  })();
  return createHash("sha256").update(pathname).digest("hex").slice(0, 12);
}

export type LocalAsset = {
  /** Site-root path to the webp used in the page. */
  url: string;
  /** Site-root path to the 1200x630 JPEG, only for covers. */
  ogUrl: string | null;
};

/**
 * Downloads a Notion asset into public/blog-media and returns stable URLs.
 *
 * Anything not on an expiring host is passed through untouched.
 */
export async function localizeAsset(
  rawUrl: string,
  slug: string,
  { asCover = false }: { asCover?: boolean } = {}
): Promise<LocalAsset> {
  if (!isExpiring(rawUrl)) return { url: rawUrl, ogUrl: null };

  const key = assetKey(rawUrl);
  const dir = path.join(MEDIA_DIR, slug);
  await mkdir(dir, { recursive: true });

  const response = await fetch(rawUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to download asset for "${slug}" (${response.status}): ${
        rawUrl.split("?")[0]
      }`
    );
  }
  const input = Buffer.from(await response.arrayBuffer());

  const webp = await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  await writeFile(path.join(dir, `${key}.webp`), webp);

  let ogUrl: string | null = null;
  if (asCover) {
    // X and LinkedIn have historically been unreliable with webp og:image, so
    // covers get a JPEG twin at exactly the size crawlers expect.
    const og = await sharp(input)
      .resize({ width: OG_WIDTH, height: OG_HEIGHT, fit: "cover" })
      .jpeg({ quality: 84 })
      .toBuffer();
    await writeFile(path.join(dir, `${key}.og.jpg`), og);
    ogUrl = `${MEDIA_URL_BASE}/${slug}/${key}.og.jpg`;
  }

  return { url: `${MEDIA_URL_BASE}/${slug}/${key}.webp`, ogUrl };
}

/**
 * Rewrites every image reference in a markdown body to a local URL.
 *
 * Covers all three shapes notion-to-md can emit depending on block type:
 * `![alt](url)`, a raw `<img src>`, and a bare link to a Notion file.
 */
export async function localizeMarkdown(markdown: string, slug: string) {
  const urls = new Set<string>();
  for (const m of markdown.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) urls.add(m[1]);
  for (const m of markdown.matchAll(/<img[^>]+src=["']([^"']+)/g)) urls.add(m[1]);

  let out = markdown;
  for (const url of urls) {
    if (!isExpiring(url)) continue;
    const { url: local } = await localizeAsset(url, slug);
    out = out.split(url).join(local);
  }
  return out;
}
