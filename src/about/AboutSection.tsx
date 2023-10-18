import AboutContent from "./AboutContent";

const AboutSection = () => {
  return (
    <section className="about section" id="About">
      <h2 className="section__title">About Me</h2>
      <span className="section__subtitle">My introduction</span>

      <AboutContent />
    </section>
  );
};

export default AboutSection;
