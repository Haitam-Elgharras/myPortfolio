import cv from "/HAITAM_ELGHARRAS_RESUME.pdf";

const AboutButtons = () => {
  return (
    <div className="about__buttons">
      <a download={cv} href={cv} className="button button--flex">
        Download Resume
        <i className="uil uil-download-alt button__icon"></i>
      </a>
    </div>
  );
};

export default AboutButtons;
