import type { CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "../components/seo/Seo";
import { getProjectBySlug, portfolioData } from "../data/portfolioData";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <section className="project-page container">
        <Seo
          title="Project Not Found | Haitam Elgharras"
          description="The requested project case study could not be found on elhaitam.com."
          path="/projects/not-found"
        />
        <div className="project-page__empty">
          <h1>Project not found</h1>
          <p>The project page you requested does not exist.</p>
          <Link to="/" className="button button--flex">
            Back to homepage
          </Link>
        </div>
      </section>
    );
  }

  const relatedProjects = portfolioData.filter((item) => item.slug !== project.slug);
  const projectDescription = `${project.title} by Haitam Elgharras: ${project.summary}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${project.title} | Haitam Elgharras`,
    url: `https://www.elhaitam.com/projects/${project.slug}`,
    mainEntity: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.summary,
      creator: {
        "@type": "Person",
        name: "Haitam Elgharras"
      },
      keywords: project.stack.join(", ")
    }
  };

  return (
    <section className="project-page container">
      <Seo
        title={`${project.title} | Haitam Elgharras`}
        description={projectDescription}
        path={`/projects/${project.slug}`}
        schema={schema}
      />
      <Link to="/#portfolio" className="project-page__back">
        <i className="uil uil-arrow-left" aria-hidden="true"></i>
        Back to projects
      </Link>
      <div className="project-page__hero">
        <div className="project-page__copy reveal">
          <p className="project-page__eyebrow">Project case study</p>
          <h1>{project.title}</h1>
          <p className="project-page__summary">{project.summary}</p>
          <div className="project-page__links">
            {project.links
              .filter((link) => !link.href.startsWith("/"))
              .map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="button button--flex button--small portfolio__button--ghost"
                >
                  {link.label}
                </a>
              ))}
          </div>
        </div>
        <img
          src={project.imageSrc}
          alt={project.imageAlt}
          className="project-page__cover reveal"
          style={{ "--rd": "120ms" } as CSSProperties}
        />
      </div>

      <div className="project-page__grid">
        <article className="project-page__card">
          <h2>Engineering focus</h2>
          <ul className="project-page__list">
            {project.keyOutcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="project-page__card">
          <h2>Stack</h2>
          <div className="project-page__tags">
            {project.stack.map((item) => (
              <span key={item} className="project-page__tag">
                {item}
              </span>
            ))}
          </div>
        </article>
      </div>

      <article className="project-page__gallery">
        <h2>Project screenshots</h2>
        <div className="project-page__image-grid">
          {project.images.map((image) => (
            <figure key={image.src} className="project-page__figure">
              <img src={image.src} alt={image.alt} className="project-page__image" />
            </figure>
          ))}
        </div>
      </article>

      <aside className="project-page__related">
        <h2>More projects</h2>
        <div className="project-page__related-grid">
          {relatedProjects.map((item) => (
            <Link
              key={item.slug}
              to={`/projects/${item.slug}`}
              className="project-page__related-card"
            >
              <img src={item.imageSrc} alt={item.imageAlt} />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </aside>
    </section>
  );
};

export default ProjectDetailPage;
