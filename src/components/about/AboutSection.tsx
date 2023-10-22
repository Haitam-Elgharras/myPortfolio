import SectionTitle from "../SectionTitle";
import AboutContent from "./AboutContent";

const AboutSection = () => {
  return (
    <section className="about section" id="About">
      <SectionTitle title="About Me" subtitle="My introduction" />
      <AboutContent />
    </section>
  );
};

export default AboutSection;
