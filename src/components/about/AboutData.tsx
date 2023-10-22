import AboutButtons from "./AboutButtons";
import AboutInfo from "./AboutInfo";

const AboutData = () => {
  return (
    <div className="about__data">
      <p className="about__description">
        I am a Frontend Developer with 2 years of experience in web development
        and coding. I have a passion for web development and love to create for
        web and mobile devices.
      </p>
      <AboutInfo />
      <AboutButtons />
    </div>
  );
};

export default AboutData;
