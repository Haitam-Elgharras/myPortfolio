import { useEffect, useRef, useState } from "react";

/**
 * Back-to-top control. Visibility is driven by an IntersectionObserver on a
 * top sentinel (no scroll listener), so it appears once the user has scrolled
 * past the first viewport.
 */
const ScrollUp = () => {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-420px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span
        ref={sentinelRef}
        aria-hidden="true"
        style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }}
      />
      <a
        href="#home"
        aria-label="Back to top"
        className={`scrollup ${visible ? "show-scroll" : ""}`}
      >
        <i className="uil uil-arrow-up scrollup__icon" aria-hidden="true"></i>
      </a>
    </>
  );
};

export default ScrollUp;
