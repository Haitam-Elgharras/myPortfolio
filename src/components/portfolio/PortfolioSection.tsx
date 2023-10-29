import SectionTitle from "../SectionTitle";
import PortfolioContainer from "./PortfolioContainer";

const PortfolioSection = () => {
  return (
    <section className="portfolio section" id="portfolio">
      <SectionTitle title="Portfolio" subtitle="Most recent work" />
      <PortfolioContainer />
    </section>
  );
};

export default PortfolioSection;
