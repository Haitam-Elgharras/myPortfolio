import { useEffect, useState } from "react";

const ThemeButton = () => {
  // State to track the current theme
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Effect to add or remove dark-theme class based on isDarkTheme state
  useEffect(() => {
    if (!isDarkTheme) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkTheme]);

  return (
    // Toggle the icon based on the current theme state
    <i
      className={`uil change-theme ${isDarkTheme ? "uil-moon" : "uil-sun"}`}
      id="theme-button"
      onClick={toggleTheme}
    ></i>
  );
};

export default ThemeButton;
