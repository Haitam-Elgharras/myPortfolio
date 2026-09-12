import type { ReactNode } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";

import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./index.css";
import "./style.css";

import Navbar from "./components/Navbar/Navbar";
import { buildMeta } from "./lib/seo";

// Runs before first paint so the page never flashes the wrong theme. It owns the
// localStorage read; React adopts whatever it decided (see useIsDarkTheme).
const THEME_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem("theme");
    // default to dark so the immersive 3D background is visible on first visit
    var dark = stored ? stored === "dark" : true;
    if (dark) document.body.classList.add("dark-theme");
  } catch (e) {}
})();`;

// Site-wide structured data. Rendered as a literal tag rather than via meta()
// because React Router only renders the deepest route's meta(), which would drop
// this on every page that defines its own.
const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.elhaitam.com/#haitam",
      name: "Haitam Elgharras",
      url: "https://www.elhaitam.com/",
      jobTitle: "Software Engineer",
      description:
        "Software engineer and full stack developer in Morocco specializing in backend systems, web applications, and distributed systems.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MA",
        addressLocality: "Mohammedia",
      },
      sameAs: [
        "https://www.linkedin.com/in/haitam-elgharras",
        "https://github.com/Haitam-Elgharras",
        "https://www.reddit.com/user/Ha_uh/",
      ],
      knowsAbout: [
        "Java",
        "Spring Boot",
        "React",
        "TypeScript",
        "Docker",
        "Kafka",
        "Distributed Systems",
        "Full Stack Development",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://www.elhaitam.com/#profile",
      url: "https://www.elhaitam.com/",
      name: "Haitam Elgharras",
      mainEntity: { "@id": "https://www.elhaitam.com/#haitam" },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.elhaitam.com/#website",
      url: "https://www.elhaitam.com/",
      name: "Haitam Elgharras",
    },
  ],
};

// Fallback head tags. Any route that exports its own meta() replaces these
// wholesale (React Router renders only the deepest match), so this is what the
// error boundary and any future meta-less route get.
export function meta() {
  return buildMeta({
    title:
      "Haitam Elgharras | Software Engineer & Full Stack Developer in Morocco",
    description:
      "Software engineer in Morocco building full-stack web apps, backend services, and distributed systems with Java, Spring Boot, React, Docker, and Kafka. Explore projects by Haitam Elgharras.",
    path: "/",
  });
}

export function links() {
  return [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" },
    {
      rel: "stylesheet",
      href: "https://unicons.iconscout.com/release/v4.0.0/css/line.css",
    },
  ];
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Literal tags, not meta(): these are constant and must survive on
            routes that export their own meta(). */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#f7f3ec"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#151311"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_SCHEMA) }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <>
      <Navbar />
      <main className="main" id="home">
        <section className="error-page container">
          <h1>{is404 ? "Page not found" : "Something went wrong"}</h1>
          <p>
            {is404
              ? "The page you requested does not exist."
              : "An unexpected error occurred. Please try again."}
          </p>
          <a href="/" className="button button--flex">
            Back to homepage
          </a>
        </section>
      </main>
    </>
  );
}
