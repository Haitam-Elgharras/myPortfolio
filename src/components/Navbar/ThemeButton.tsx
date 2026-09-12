import { setDarkTheme, useIsDarkTheme } from "../../hooks/useIsDarkTheme";

const ThemeButton = () => {
  const isDark = useIsDarkTheme();

  return (
    <button
      type="button"
      id="theme-button"
      className={`uil change-theme ${isDark ? "uil-sun" : "uil-moon"}`}
      onClick={() => setDarkTheme(!isDark)}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      suppressHydrationWarning
    />
  );
};

export default ThemeButton;
