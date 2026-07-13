import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import AnalyticsTracker from "../components/analytics/AnalyticsTracker";
import ScrollUp from "../components/ScrollUp";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Layout = () => {
  const location = useLocation();
  useScrollReveal(location.pathname);

  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <AnalyticsTracker />
      <Navbar />
      <Outlet />
      <ScrollUp />
    </>
  );
};

export default Layout;
