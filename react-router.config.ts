import { readFile } from "node:fs/promises";
import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";
import { projectSlugs } from "./src/data/siteRoutes";

/** Read straight off disk: this file is config, outside Vite's module graph. */
async function postSlugs(): Promise<string[]> {
  try {
    const raw = await readFile("./src/content/index.json", "utf8");
    return (JSON.parse(raw) as Array<{ slug: string }>).map((p) => p.slug);
  } catch {
    return [];
  }
}

export default {
  // Keep the existing folder layout instead of moving everything into app/.
  appDirectory: "src",

  // No runtime server: every route is rendered to static HTML at build time and
  // hydrates into the same SPA the site already was.
  ssr: false,

  presets: [vercelPreset()],

  prerender: {
    paths: async ({ getStaticPaths }) => [
      // "/", "/blog" and any other route without params
      ...getStaticPaths(),
      ...projectSlugs.map((slug) => `/projects/${slug}`),
      ...(await postSlugs()).map((slug) => `/blog/${slug}`),
    ],
    concurrency: 4,
  },
} satisfies Config;
