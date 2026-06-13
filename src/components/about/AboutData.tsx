import AboutButtons from "./AboutButtons";
import AboutInfo from "./AboutInfo";

const AboutData = () => {
  return (
    <div className="about__data">
      <p className="about__description">
        I am a software engineer focused on backend systems, scalable web
        applications, and clean product delivery. My work spans Java, Spring
        Boot, Docker, Kafka, and modern frontend development, allowing me to
        build complete solutions instead of isolated interfaces.
      </p>
      <AboutInfo />
      <AboutButtons />
    </div>
  );
};

export default AboutData;
