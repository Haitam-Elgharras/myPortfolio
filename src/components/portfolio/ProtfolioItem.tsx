interface Props {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
  demoLink: string;
}

const PortfolioItem = ({ imageSrc, title, description, demoLink }: Props) => {
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
      <img src={imageSrc} alt="an image" className="portfolio__img" />
      <div className="portfolio__data">
        <h3 className="portfolio__title">{title}</h3>
        <p className="portfolio__description">{description}</p>
        {/* replace with LinkTo */}
        <a
          href={demoLink}
          target="_blank"
          className="button button--flex button--small portfolio__button"
        >
          Demo
          <i className="uil uil-arrow-right button__icon"></i>
        </a>
      </div>
    </div>
  );
};

export default PortfolioItem;
