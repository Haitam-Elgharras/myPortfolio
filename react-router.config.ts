import { readFile } from "node:fs/promises";
import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";
import { projectSlugs } from "./src/data/siteRoutes";

async function postSlugs(): Promise<string[]> {
  try {
    const raw = await readFile("./src/content/index.json", "utf8");
    return (JSON.parse(raw) as Array<{ slug: string }>).map((p) => p.slug);
  } catch {
    return [];
  }
}

export default {
  appDirectory: "src",

  ssr: false,

  presets: [vercelPreset()],

  prerender: {
    paths: async ({ getStaticPaths }) => [
      ...getStaticPaths(),
      ...projectSlugs.map((slug) => `/projects/${slug}`),
      ...(await postSlugs()).map((slug) => `/blog/${slug}`),
    ],
    concurrency: 4,
  },
} satisfies Config;
