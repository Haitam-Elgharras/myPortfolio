import SectionTitle from "../SectionTitle";
import PortfolioItem from "./ProtfolioItem";
import ptfl1 from "../../assets/img/portfolio1.jpg";

const PortfolioSection = () => {
  return (
    <section className="portfolio section" id="portfolio">
      <SectionTitle title="Portfolio" subtitle="Most recent work" />
      {/* test portfolio item */}
      <PortfolioItem
        imageSrc={ptfl1}
        title="Portfolio Test"
        description="This portfolio website was created using React and TypeScript."
        demoLink="#"
      />
    </section>
  );
};

export default PortfolioSection;
