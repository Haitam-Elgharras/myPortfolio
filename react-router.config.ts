import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";
import { projectSlugs } from "./src/data/siteRoutes";

export default {
  // Keep the existing folder layout instead of moving everything into app/.
  appDirectory: "src",

  // No runtime server: every route is rendered to static HTML at build time and
  // hydrates into the same SPA the site already was.
  ssr: false,

  presets: [vercelPreset()],

  prerender: {
    paths: ({ getStaticPaths }) => [
      // "/" and any other route without params
      ...getStaticPaths(),
      ...projectSlugs.map((slug) => `/projects/${slug}`),
    ],
    concurrency: 4,
  },
} satisfies Config;
