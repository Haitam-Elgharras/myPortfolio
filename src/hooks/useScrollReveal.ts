import { useEffect } from "react";

/**
 * Reveals elements carrying the `.reveal` class as they scroll into view by
 * toggling `.is-visible`. Progressive enhancement: the `.reveal-ready` flag is
 * only set when JS runs, so content stays visible if this never executes.
 * Honors `prefers-reduced-motion` by leaving everything visible and static.
 *
 * Pass a `key` (e.g. the current pathname) so it re-scans after route changes.
 */
export function useScrollReveal(key?: string) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);
}
