import { useEffect } from "react";
import { useLocation } from "react-router";

export function useRouteScroll() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior = prefersReduced ? "auto" : "smooth";

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash, key]);
}
