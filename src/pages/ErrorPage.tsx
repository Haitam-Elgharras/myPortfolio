import { Link } from "react-router";
import { buildMeta } from "../lib/seo";

export function meta() {
  return buildMeta({
    title: "Page Not Found | Haitam Elgharras",
    description: "The page you requested could not be found on elhaitam.com.",
    path: "/404",
    noindex: true,
  });
}

// Rendered as the catch-all route inside Layout, so Navbar comes from there.
const ErrorPage = () => {
  return (
    <main className="error-page" id="home">
      <span className="error-page__code">404</span>
      <h1>This page doesn&apos;t exist</h1>
      <p>The page you were looking for may have moved or never existed.</p>
      <Link to="/" className="button button--flex">
        Back to homepage
        <i className="uil uil-arrow-right button__icon"></i>
      </Link>
    </main>
  );
};

export default ErrorPage;
