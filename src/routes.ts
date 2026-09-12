import { readFileSync } from "node:fs";
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

/**
 * With `ssr: false`, a `loader` is only a legal export on a route whose paths
 * are all pre-rendered. Before the first post exists `/blog/:slug` would match
 * nothing, so registering it unconditionally fails the build. Switching to
 * `clientLoader` would sidestep that but is the wrong trade: clientLoader data
 * is not baked into the HTML, which is the entire point of pre-rendering here.
 */
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
    // Catch-all 404. A real route rather than only an error boundary so it can
    // export meta() and be marked noindex.
    route("*", "pages/ErrorPage.tsx"),
  ]),
] satisfies RouteConfig;
