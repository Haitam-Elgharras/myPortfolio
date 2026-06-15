import ProjectSection from "../components/ProjectSection";
import Skills from "../components/Skills/SkillsSection";
import AboutSection from "../components/about/AboutSection";
import ContactSection from "../components/contact/ContactSection";
import FooterSection from "../components/footer/FooterSection";
import HomeContent from "../components/home/HomeContent";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import QualificationSection from "../components/qualification/QualificationSection";
import Seo from "../components/seo/Seo";
import "../style.css";

const HomePage = () => {
  return (
    <main className="main">
      <Seo
        title="Haitam Elgharras | Software Engineer & Full Stack Developer in Morocco"
        description="Software engineer in Morocco building full-stack web apps, backend services, and distributed systems with Java, Spring Boot, React, Docker, and Kafka. Explore projects by Haitam Elgharras."
        path="/"
      />
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
