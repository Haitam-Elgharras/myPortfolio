import { ContactForm } from "./ContactForm";
import { ContactInformation } from "./ContactInformation";

// Main Contact Section Component
const ContactSection = () => {
  return (
    <section className="contact section" id="Contact">
      <h2 className="section__title">Contact Me</h2>
      <span className="section__subtitle">Get in touch</span>

      <div className="contact__container container grid">
        <div>
          <ContactInformation />
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
