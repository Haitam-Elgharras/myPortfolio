import { useEffect, useState } from "react";
import AboutData from "./AboutData";
import lightAboutImg from "../../assets/img/about-portrait-light.png";
import darkAboutImg from "../../assets/img/about-portrait-dark.png";

const AboutContent = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    document.body.classList.contains("dark-theme")
  );

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkTheme(document.body.classList.contains("dark-theme"));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about__container container grid">
      <img
        src={isDarkTheme ? darkAboutImg : lightAboutImg}
        alt="Portrait of Haitam"
        className="about__img"
      />
      <AboutData />
    </div>
  );
};

export default AboutContent;
