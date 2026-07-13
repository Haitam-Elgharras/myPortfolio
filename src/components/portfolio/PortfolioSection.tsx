import SectionTitle from "../SectionTitle";
import PortfolioContainer from "./PortfolioContainer";

const PortfolioSection = () => {
  return (
    <section className="portfolio section" id="portfolio">
      <SectionTitle title="Selected work" subtitle="Projects" />
      <PortfolioContainer />
    </section>
  );
};

export default PortfolioSection;
