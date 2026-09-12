import type { CSSProperties } from "react";
import AboutData from "./AboutData";
import lightAboutImg from "../../assets/img/about-portrait-light.png";
import darkAboutImg from "../../assets/img/about-portrait-dark.png";

// See the note in HomeContent.tsx: the theme swap is CSS-driven so this stays
// correct in prerendered HTML and costs no JS state.
const aboutVars = {
  "--img-light": `url(${lightAboutImg})`,
  "--img-dark": `url(${darkAboutImg})`,
} as CSSProperties;

const AboutContent = () => {
  return (
    <div className="about__container container grid">
      <div
        className="about__img theme-img reveal"
        style={aboutVars}
        role="img"
        aria-label="Haitam Elgharras working"
      />
      <AboutData />
    </div>
  );
};

export default AboutContent;
