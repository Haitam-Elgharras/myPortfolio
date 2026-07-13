import { useEffect, useState } from "react";

const ThemeButton = () => {
  // Initial value comes from the pre-paint script in index.html, which reads
  // localStorage and falls back to the OS preference.
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" &&
    document.body.classList.contains("dark-theme")
  );

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* storage unavailable — theme still applies for the session */
    }
  }, [isDark]);

  return (
    <button
      type="button"
      id="theme-button"
      className={`uil change-theme ${isDark ? "uil-sun" : "uil-moon"}`}
      onClick={() => setIsDark((value) => !value)}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    />
  );
};

export default ThemeButton;
