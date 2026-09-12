import { readFileSync } from "node:fs";
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

function hasPosts() {
  try {
    const raw = readFileSync("./src/content/index.json", "utf8");
    return (JSON.parse(raw) as unknown[]).length > 0;
  } catch {
    return false;
  }
}

export default [
  layout("pages/Layout.tsx", [
    index("pages/HomePage.tsx"),
    route("projects/:slug", "pages/ProjectDetailPage.tsx"),
    route("blog", "pages/BlogIndexPage.tsx"),
    ...(hasPosts() ? [route("blog/:slug", "pages/BlogPostPage.tsx")] : []),
    route("*", "pages/ErrorPage.tsx"),
  ]),
] satisfies RouteConfig;
