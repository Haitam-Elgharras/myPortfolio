// Contact Form Component
export const ContactForm = () => {
  return (
    <form
      className="contact__form grid"
      action="mailto:Elgharras.haitam@gmail.com"
      method="post"
      encType="text/plain"
    >
      <div className="contact__inputs grid">
        <div className="contact__content">
          <label htmlFor="contact-name" className="contact__label">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="contact__input"
          />
        </div>
        <div className="contact__content">
          <label htmlFor="contact-email" className="contact__label">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="contact__input"
          />
        </div>
      </div>
      <div className="contact__content">
        <label htmlFor="contact-project" className="contact__label">
          Project
        </label>
        <input
          id="contact-project"
          name="project"
          type="text"
          className="contact__input"
        />
      </div>
      <div className="contact__content">
        <label htmlFor="contact-message" className="contact__label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          required
          className="contact__input"
        ></textarea>
      </div>
      <div>
        <a
          href="mailto:Elgharras.haitam@gmail.com?subject=Project%20Inquiry%20from%20elhaitam.com"
          className="button button--flex"
        >
          Send message
          <i className="uil uil-message button__icon"></i>
        </a>
      </div>
    </form>
  );
};
