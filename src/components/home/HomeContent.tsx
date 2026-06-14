import { useEffect, useState } from "react";
import HomeSocial from "./HomeSocial";
import BlobSVG from "./BlobSVG";
import HomeData from "./HomeData";
import lightHeadshot from "../../assets/img/hero-headshot-light.png";
import darkHeadshot from "../../assets/img/hero-headshot-dark.png";

const HomeContent = () => {
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
    <section className="home section" id="Home">
      <div className="home__container container grid">
        <div className="home__content grid">
          <HomeSocial />
          <BlobSVG x="0" y="70" href={isDarkTheme ? darkHeadshot : lightHeadshot} />
          <HomeData
            title="Hi, I'm Haitam"
            subtitles={["Software Engineer", "Full Stack Developer", "Freelancer"]}
            description="I design and build reliable web platforms, backend services, and distributed systems with a focus on performance, maintainability, and product quality."
            delay={1000}
            prefix=""
          />
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
