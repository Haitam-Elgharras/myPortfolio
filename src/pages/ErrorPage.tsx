import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Seo from "../components/seo/Seo";

const ErrorPage = () => {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <>
      <Seo
        title="Page Not Found | Haitam Elgharras"
        description="The page you requested could not be found on elhaitam.com."
        path="/404"
      />
      <Navbar />
      <main className="error-page" id="home">
        <span className="error-page__code">{notFound ? "404" : "500"}</span>
        <h1>{notFound ? "This page doesn't exist" : "Something went wrong"}</h1>
        <p>
          {notFound
            ? "The page you were looking for may have moved or never existed."
            : "An unexpected error occurred while loading this page. Please try again."}
        </p>
        <Link to="/" className="button button--flex">
          Back to homepage
          <i className="uil uil-arrow-right button__icon"></i>
        </Link>
      </main>
    </>
  );
};

export default ErrorPage;
