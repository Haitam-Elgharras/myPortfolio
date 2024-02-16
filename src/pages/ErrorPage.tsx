import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          fontSize: "2rem",
        }}
      >
        <h2>Oops</h2>
        <p
          style={{
            color: "#dc3545",
          }}
        >
          {isRouteErrorResponse(error)
            ? "This page does not exist"
            : "An error occurred"}
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
