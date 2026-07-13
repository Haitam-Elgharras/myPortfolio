import PortfolioItem from "./ProtfolioItem";
import { portfolioData } from "../../data/portfolioData";

const PortfolioContainer = () => {
  const [featured, ...rest] = portfolioData;

  return (
    <div className="portfolio__grid container">
      {featured ? (
        <PortfolioItem {...featured} variant="feature" />
      ) : null}
      {rest.length ? (
        <div className="portfolio__cards">
          {rest.map((item, index) => (
            <PortfolioItem
              key={item.slug}
              {...item}
              variant="card"
              index={index}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PortfolioContainer;
