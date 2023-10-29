import PortfolioItem from "./ProtfolioItem";
import { portfolioData } from "../../data/portfolioData";

const PortfolioContainer = () => {
  return (
    <div className="portfolio__container container swiper-container">
      <div className="swiper-wrapper">
        {portfolioData.map((item, index) => (
          <PortfolioItem key={index} {...item} />
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default PortfolioContainer;
