import type { PointerEvent } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import type { Project } from "../../data/portfolioData";

type Props = Project & {
  variant?: "feature" | "card";
  index?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { stiffness: 220, damping: 22, mass: 0.5 };

/** Faux address bar label: the live/repo hostname, or the case-study slug. */
function frameLabel(links: Project["links"], slug: string) {
  const external = links.find((link) => link.href.startsWith("http"));
  if (!external) return `elhaitam.com/projects/${slug}`;
  try {
    const url = new URL(external.href);
    return (url.hostname + url.pathname).replace(/^www\./, "").replace(/\/$/, "");
  } catch {
    return `elhaitam.com/projects/${slug}`;
  }
}

const PortfolioItem = ({
  slug,
  imageSrc,
  imageAlt,
  title,
  cardDescription,
  summary,
  stack,
  links,
  variant = "card",
  index = 0,
}: Props) => {
  const reduce = useReducedMotion();
  const primaryLink =
    links.find((link) => link.label !== "Project details") ?? links[0];
  const isFeature = variant === "feature";
  const wrapperClass = isFeature ? "portfolio__feature" : "portfolio__card";

  // Pointer position (0-1) and hover state as motion values — updated on
  // pointermove without ever re-rendering the React tree.
  const tilt = isFeature ? 4 : 7;
  const drift = isFeature ? 22 : 12;
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spotX = useMotionValue(-400);
  const spotY = useMotionValue(-400);
  const active = useMotionValue(0);

  const glow = useSpring(active, { stiffness: 200, damping: 30 });
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), SPRING);
  // Screenshot drifts opposite the tilt and scales up slightly → parallax depth.
  const imgX = useSpring(useTransform(px, [0, 1], [drift, -drift]), SPRING);
  const imgY = useSpring(useTransform(py, [0, 1], [drift * 0.7, -drift * 0.7]), SPRING);
  const imgScale = useSpring(useTransform(active, [0, 1], [1, 1.08]), SPRING);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotX}px ${spotY}px, color-mix(in srgb, var(--accent) 16%, transparent), transparent 42%)`;

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    px.set(x / rect.width);
    py.set(y / rect.height);
    spotX.set(x);
    spotY.set(y);
  };

  const handleEnter = () => {
    if (!reduce) active.set(1);
  };
  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    active.set(0);
  };

  const cardVariants: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: 44 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: index * 0.1, ease: EASE },
    },
  };

  return (
    <motion.article
      className={wrapperClass}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={reduce ? undefined : { y: -6 }}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={
        reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }
      }
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <motion.span
        className="portfolio__spotlight"
        aria-hidden="true"
        style={{ background: spotlight, opacity: glow }}
      />

      <div className="portfolio__media">
        <div className="portfolio__frame" aria-hidden="true">
          <span className="portfolio__dots">
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span className="portfolio__url">{frameLabel(links, slug)}</span>
        </div>
        <Link
          to={`/projects/${slug}`}
          className="portfolio__shot"
          aria-label={`Open the ${title} case study`}
        >
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="portfolio__img"
            style={reduce ? undefined : { x: imgX, y: imgY, scale: imgScale }}
          />
        </Link>
      </div>

      <div className="portfolio__body">
        <h3 className="portfolio__title">{title}</h3>
        <p className="portfolio__description">
          {isFeature ? summary : cardDescription}
        </p>
        <div className="portfolio__stack">
          {stack.map((tech) => (
            <span key={tech} className="portfolio__chip">
              {tech}
            </span>
          ))}
        </div>
        <div className="portfolio__actions">
          <Link
            to={`/projects/${slug}`}
            className="button button--flex button--small portfolio__button"
          >
            Case study
            <i className="uil uil-arrow-right button__icon"></i>
          </Link>
          {primaryLink ? (
            <a
              href={primaryLink.href}
              target="_blank"
              rel="noreferrer"
              className="button button--flex button--small portfolio__button portfolio__button--ghost"
            >
              {primaryLink.label}
              <i className="uil uil-external-link-alt button__icon"></i>
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
};

export default PortfolioItem;
