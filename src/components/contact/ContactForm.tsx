import React from "react";

// Contact Form Component
export const ContactForm = () => {
  return (
    <form action="" className="contact__form grid">
      <div className="contact__inputs grid">
        <div className="contact__content">
          <label htmlFor="" className="contact__label">
            Name
          </label>
          <input type="text" className="contact__input" />
        </div>
        <div className="contact__content">
          <label htmlFor="" className="contact__label">
            Email
          </label>
          <input type="email" className="contact__input" />
        </div>
      </div>
      <div className="contact__content">
        <label htmlFor="" className="contact__label">
          Project
        </label>
        <input type="text" className="contact__input" />
      </div>
      <div className="contact__content">
        <label htmlFor="" className="contact__label">
          Message
        </label>
        <textarea
          name=""
          id=""
          cols="0"
          rows="7"
          className="contact__input"
        ></textarea>
      </div>
      <div>
        <a href="#" className="button button--flex">
          Send Message
          <i className="uil uil-message button__icon"></i>
        </a>
      </div>
    </form>
  );
};
