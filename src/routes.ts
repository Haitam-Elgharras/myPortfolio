import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("pages/Layout.tsx", [
    index("pages/HomePage.tsx"),
    route("projects/:slug", "pages/ProjectDetailPage.tsx"),
    // Catch-all 404. A real route rather than only an error boundary so it can
    // export meta() and be marked noindex.
    route("*", "pages/ErrorPage.tsx"),
  ]),
] satisfies RouteConfig;
