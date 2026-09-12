export const projectSlugs = ["game-hub", "nimbustalk", "ekart"] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export const staticRoutes = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
] as const;
