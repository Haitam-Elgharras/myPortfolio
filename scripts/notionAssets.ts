import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const MEDIA_DIR = path.resolve("public/blog-media");
export const MEDIA_URL_BASE = "/blog-media";

const MAX_WIDTH = 1600;
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const EXPIRING_HOST =
  /amazonaws\.com|notion-static\.com|\.notion\.so\/(image|signed)/;

export function isExpiring(url: string) {
  return EXPIRING_HOST.test(url);
}

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
  url: string;
  ogUrl: string | null;
};

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
    const og = await sharp(input)
      .resize({ width: OG_WIDTH, height: OG_HEIGHT, fit: "cover" })
      .jpeg({ quality: 84 })
      .toBuffer();
    await writeFile(path.join(dir, `${key}.og.jpg`), og);
    ogUrl = `${MEDIA_URL_BASE}/${slug}/${key}.og.jpg`;
  }

  return { url: `${MEDIA_URL_BASE}/${slug}/${key}.webp`, ogUrl };
}

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
