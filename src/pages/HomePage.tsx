import ProjectSection from "../components/ProjectSection";
import Skills from "../components/Skills/SkillsSection";
import AboutSection from "../components/about/AboutSection";
import ContactSection from "../components/contact/ContactSection";
import FooterSection from "../components/footer/FooterSection";
import HomeContent from "../components/home/HomeContent";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import QualificationSection from "../components/qualification/QualificationSection";
import "../style.css";

const HomePage = () => {
  return (
    <main className="main">
      <HomeContent />
      <AboutSection />
      <Skills />
      <QualificationSection />
      <PortfolioSection />
      <ProjectSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
};

export default HomePage;
