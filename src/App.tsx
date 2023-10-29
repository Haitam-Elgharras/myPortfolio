import AboutSection from "./components/about/AboutSection";
import HomeContent from "./components/home/HomeContent";
import Navbar from "./components/Navbar/Navbar";
import PortfolioSection from "./components/portfolio/PortfolioSection";
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
      </main>
    </>
  );
}

export default App;
