import { Link } from "react-router-dom";
import type { Project } from "../../data/portfolioData";

const PortfolioItem = ({
  slug,
  imageSrc,
  imageAlt,
  title,
  cardDescription,
  links
}: Project) => {
  const primaryLink = links.find((link) => link.label !== "Project details") ?? links[0];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "2rem",
        padding: "2rem",
        justifyContent: "center",
      }}
      className="portfolio__content grid swiper-slide"
    >
      <img src={imageSrc} alt={imageAlt} className="portfolio__img" />
      <div className="portfolio__data">
        <h3 className="portfolio__title">{title}</h3>
        <p className="portfolio__description">{cardDescription}</p>
        <div className="portfolio__actions">
          <Link
            to={`/projects/${slug}`}
            className="button button--flex button--small portfolio__button"
          >
            Case Study
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
    </div>
  );
};

export default PortfolioItem;
