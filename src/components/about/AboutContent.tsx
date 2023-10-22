import AboutData from "./AboutData";
import aboutImg from "../../assets/img/aboutme.jpeg";

const AboutContent = () => {
  return (
    <div className="about__container container grid">
      <img src={aboutImg} alt="" className="about__img" />
      <AboutData />
    </div>
  );
};

export default AboutContent;
