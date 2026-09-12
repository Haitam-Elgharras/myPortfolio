import { Suspense, lazy, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import AnalyticsTracker from "../components/analytics/AnalyticsTracker";
import ScrollUp from "../components/ScrollUp";
import { useScrollReveal } from "../hooks/useScrollReveal";

// three.js is a heavy, separate chunk — only fetched when the 3D background
// actually mounts (dark theme, motion allowed).
const BackgroundExperience = lazy(
  () => import("../three/BackgroundExperience")
);

const Layout = () => {
  const location = useLocation();
  useScrollReveal(location.pathname);


  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sync = () =>
      setShowBackground(
        !reduce && document.body.classList.contains("dark-theme")
      );
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      {showBackground ? (
        <Suspense fallback={null}>
          <BackgroundExperience />
        </Suspense>
      ) : null}
      <AnalyticsTracker />
      <Navbar />
      <Outlet />
      <ScrollUp />
    </>
  );
};

export default Layout;
