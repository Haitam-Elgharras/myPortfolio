import { useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { addDelay } from "../../utils/addDelay";
import Magnetic from "../motion/Magnetic";
import { useMounted } from "../../hooks/useMounted";
import cv from "/HAITAM_ELGHARRAS_RESUME.pdf";

interface HomeDataProps {
  eyebrow?: string;
  title: string;
  subtitles: string[];
  description: string;
  delay: number;
}

const HomeData = ({
  eyebrow,
  title,
  subtitles,
  description,
  delay,
}: HomeDataProps) => {
  const subtitlesDelay = addDelay(subtitles, delay);
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const staticSubtitle = mounted && prefersReducedMotion;

  return (
    <div className="home__data reveal">
      {eyebrow ? <p className="home__eyebrow">{eyebrow}</p> : null}
      <h1 className="home__title">{title}</h1>
      <h3 className="home__subtitle">
        {staticSubtitle ? (
          <span className="home__subtitle-accent">{subtitles.join(" / ")}</span>
        ) : (
          <TypeAnimation
            cursor={true}
            sequence={subtitlesDelay}
            speed={40}
            repeat={Infinity}
          />
        )}
      </h3>
      <p className="home__description">{description}</p>
      <div className="home__actions">
        <Magnetic>
          <a href="#portfolio" className="button button--flex">
            View projects
            <i className="uil uil-arrow-right button__icon"></i>
          </a>
        </Magnetic>
        <Magnetic>
          <a href={cv} download className="button button--flex button--ghost">
            Download CV
            <i className="uil uil-download-alt button__icon"></i>
          </a>
        </Magnetic>
      </div>
    </div>
  );
};

export default HomeData;
