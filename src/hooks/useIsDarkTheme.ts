import { useSyncExternalStore } from "react";

/**
 * Reads the active theme straight off `<body>`, which the pre-paint script sets
 * before React ever runs.
 *
 * The body class is the single source of truth: subscribing to it means any
 * component can read the theme, and a change made anywhere re-renders all of
 * them without a context or a store.
 */
function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.body.classList.contains("dark-theme");

// The server has no <body> to read. Light is the safe default: it only affects
// the icon in the theme button for one frame, never the page itself, which the
// pre-paint script has already painted correctly.
const getServerSnapshot = () => false;

export function useIsDarkTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Flips the theme and persists it. The observer above propagates the change. */
export function setDarkTheme(isDark: boolean) {
  document.body.classList.toggle("dark-theme", isDark);
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
    /* storage unavailable — theme still applies for the session */
  }
}
