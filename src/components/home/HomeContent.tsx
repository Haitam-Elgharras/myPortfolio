import type { CSSProperties } from "react";
import HomeSocial from "./HomeSocial";
import HomeData from "./HomeData";
import lightHeadshot from "../../assets/img/hero-headshot-light.png";
import darkHeadshot from "../../assets/img/hero-headshot-dark.png";

const portraitVars = {
  "--img-light": `url(${lightHeadshot})`,
  "--img-dark": `url(${darkHeadshot})`,
} as CSSProperties;

const HomeContent = () => {
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
              <div
                className="home__portrait-inner theme-img"
                style={portraitVars}
                role="img"
                aria-label="Portrait of Haitam Elgharras, software engineer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
