import AboutSection from "./about/AboutSection";
import HomeContent from "./home/HomeContent";
import Navbar from "./Navbar/Navbar";
import Skills from "./SkillsSection/Skills";
import "./style.css";
function App() {
  return (
    <>
      <Navbar />
      <main className="main">
        <HomeContent />
        <AboutSection />
        <Skills />
      </main>
    </>
  );
}

export default App;
