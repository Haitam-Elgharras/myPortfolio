import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.body.classList.contains("dark-theme");

const getServerSnapshot = () => false;

export function useIsDarkTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setDarkTheme(isDark: boolean) {
  document.body.classList.toggle("dark-theme", isDark);
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
  }
}
