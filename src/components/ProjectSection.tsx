import Magnetic from "./motion/Magnetic";

const ProjectSection = () => {
  return (
    <section className="project section">
      <div className="project__bg reveal">
        <div className="project__container">
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            Available for work
          </span>
          <h2 className="project__title">
            Need a software engineer in Morocco for a product build?
          </h2>
          <p className="project__description">
            I build full-stack products, backend services, and scalable web
            applications with a focus on clean architecture, reliable delivery,
            and maintainable code.
          </p>
          <Magnetic>
            <a href="#contact" className="button button--flex button--white">
              Get in touch
              <i className="uil uil-message project__icon button__icon"></i>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
