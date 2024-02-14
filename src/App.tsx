import AboutSection from "./components/about/AboutSection";
import ContactSection from "./components/contact/ContactSection";
import FooterSection from "./components/footer/FooterSection";
import HomeContent from "./components/home/HomeContent";
import Navbar from "./components/Navbar/Navbar";
import PortfolioSection from "./components/portfolio/PortfolioSection";
import ProjectSection from "./components/ProjectSection";
import QualificationSection from "./components/qualification/QualificationSection";
import Skills from "./components/Skills/SkillsSection";
import "./style.css";
function App() {
  return (
    <>
      <Navbar />
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
    </>
  );
}

export default App;
