import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import ProjectDetailPage from "../pages/ProjectDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetailPage />,
      },
    ],
  },
]);

export default router;
