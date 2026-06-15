import SectionTitle from "../SectionTitle";
import PortfolioContainer from "./PortfolioContainer";

const PortfolioSection = () => {
  return (
    <section className="portfolio section" id="portfolio">
      <SectionTitle title="Projects" subtitle="Selected software engineering work" />
      <PortfolioContainer />
    </section>
  );
};

export default PortfolioSection;
