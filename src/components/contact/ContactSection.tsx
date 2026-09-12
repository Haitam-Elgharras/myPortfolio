import type { CSSProperties } from "react";
import SectionTitle from "../shared/SectionTitle";
import { ContactForm } from "./ContactForm";
import { ContactInformation } from "./ContactInformation";

const ContactSection = () => {
  return (
    <section className="contact section" id="contact">
      <SectionTitle title="Let's build something reliable" subtitle="Contact" />

      <div className="contact__container container grid">
        <div className="reveal">
          <ContactInformation />
        </div>
        <div className="reveal" style={{ "--rd": "120ms" } as CSSProperties}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
