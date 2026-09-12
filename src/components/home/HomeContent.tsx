import type { CSSProperties } from "react";
import HomeSocial from "./HomeSocial";
import HomeData from "./HomeData";
import lightHeadshot from "../../assets/img/hero-headshot-light.png";
import darkHeadshot from "../../assets/img/hero-headshot-dark.png";

// The light/dark swap is done in CSS (see `.theme-img` in style.css) rather than
// React state: the browser only fetches the URL the active custom property
// resolves to, the markup is identical on the server and the client, and the
// pre-paint theme script means there is never a wrong-theme flash.
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
