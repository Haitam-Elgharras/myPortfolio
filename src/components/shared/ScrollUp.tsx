import { useSyncExternalStore } from "react";

const SHOW_AFTER_PX = 420;

function subscribe(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

const getSnapshot = () => window.scrollY > SHOW_AFTER_PX;
const getServerSnapshot = () => false;

const ScrollUp = () => {
  const visible = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`scrollup ${visible ? "show-scroll" : ""}`}
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : true}
    >
      <i className="uil uil-arrow-up scrollup__icon" aria-hidden="true"></i>
    </button>
  );
};

export default ScrollUp;
