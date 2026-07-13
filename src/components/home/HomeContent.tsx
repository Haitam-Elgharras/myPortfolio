import { useEffect, useState } from "react";
import HomeSocial from "./HomeSocial";
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
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__content">
          <HomeSocial />
          <HomeData
            eyebrow="Software Engineer"
            title="Haitam Elgharras"
            subtitles={[
              "Modern Web Applications",
              "Full Stack Developer",
              "Backend Systems",
            ]}
            description="I build full-stack web applications, backend services, and distributed systems with Java, Spring Boot, React, TypeScript, Docker, and Kafka."
            delay={1000}
          />
          <div className="home__img reveal">
            <div className="home__portrait">
              <div className="home__portrait-inner">
                <img
                  src={isDarkTheme ? darkHeadshot : lightHeadshot}
                  alt="Portrait of Haitam Elgharras, software engineer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
