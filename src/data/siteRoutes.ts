/**
 * Route data that build scripts need.
 *
 * Deliberately free of asset imports so plain Node can import it: portfolioData
 * starts with `import ... from "*.png"`, which throws ERR_UNKNOWN_FILE_EXTENSION
 * outside Vite. Keeping the slugs here lets the prerender config and the sitemap
 * generator read them.
 */
export const projectSlugs = ["game-hub", "nimbustalk", "ekart"] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

/** Routes with no dynamic segment, for the sitemap. */
export const staticRoutes = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
] as const;
