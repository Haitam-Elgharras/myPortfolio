const ProjectSection = () => {
  return (
    <section className="project section">
      <div className="project__bg">
        <div className="project__container container grid">
          <div className="project__data">
            <h2 className="project__title">
              Need a software engineer in Morocco for a product build?
            </h2>
            <p className="project__description">
              I build full-stack products, backend services, and scalable web
              applications with a focus on clean architecture, reliable
              delivery, and maintainable code.
            </p>
            <a href="#contact" className="button button--flex button--white">
              Contact Me
              <i className="uil uil-message project__icon button__icon"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
