import cv from "/HAITAM_ELGHARRAS_CV.pdf";

const AboutButtons = () => {
  return (
    <div className="about__buttons">
      <a download={cv} href={cv} className="button button--flex">
        Download CV
        <i className="uil uil-download-alt button__icon"></i>
      </a>
    </div>
  );
};

export default AboutButtons;
