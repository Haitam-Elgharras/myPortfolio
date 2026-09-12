import type { ReactNode } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";

import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./style.css";
import "./unicons.css";

import Navbar from "./components/Navbar/Navbar";
import { buildMeta } from "./lib/seo";

const THEME_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored ? stored === "dark" : true;
    if (dark) document.body.classList.add("dark-theme");
  } catch (e) {}
})();`;

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
      rel: "alternate",
      type: "application/rss+xml",
      title: "Haitam Elgharras — Engineering notes",
      href: "/rss.xml",
    },
  ];
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
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
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <main className="main" id="home">
      <section className="error-page container">
        <p className="eyebrow">Loading</p>
      </section>
    </main>
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
