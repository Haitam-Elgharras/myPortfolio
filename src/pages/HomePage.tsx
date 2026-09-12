import ProjectSection from "../components/ProjectSection";
import Skills from "../components/Skills/SkillsSection";
import AboutSection from "../components/about/AboutSection";
import ContactSection from "../components/contact/ContactSection";
import FooterSection from "../components/footer/FooterSection";
import HomeContent from "../components/home/HomeContent";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import QualificationSection from "../components/qualification/QualificationSection";
import FlowSection from "../components/motion/FlowSection";
import { buildMeta } from "../lib/seo";

export function meta() {
  return buildMeta({
    title:
      "Haitam Elgharras | Software Engineer & Full Stack Developer in Morocco",
    description:
      "Software engineer in Morocco building full-stack web apps, backend services, and distributed systems with Java, Spring Boot, React, Docker, and Kafka. Explore projects by Haitam Elgharras.",
    path: "/",
  });
}

const HomePage = () => {
  return (
    <main className="main">
      <HomeContent />
      <FlowSection dir={1}>
        <AboutSection />
      </FlowSection>
      <FlowSection dir={-1}>
        <Skills />
      </FlowSection>
      <FlowSection dir={1}>
        <QualificationSection />
      </FlowSection>
      <FlowSection dir={-1}>
        <PortfolioSection />
      </FlowSection>
      <FlowSection dir={1} intensity={0.7}>
        <ProjectSection />
      </FlowSection>
      <FlowSection dir={-1} intensity={0.7}>
        <ContactSection />
      </FlowSection>
      <FooterSection />
    </main>
  );
};

export default HomePage;
