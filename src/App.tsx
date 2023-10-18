import AboutSection from "./about/AboutSection";
import HomeContent from "./home/HomeContent";
import Navbar from "./Navbar/Navbar";
import "./style.css";
function App() {
  return (
    <>
      <Navbar />
      <main className="main">
        <HomeContent />
        <AboutSection />
      </main>
    </>
  );
}

export default App;
