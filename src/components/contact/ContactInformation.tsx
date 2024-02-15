// Contact Information Component
export const ContactInformation = () => {
  return (
    <div>
      <div className="contact__information">
        <i className="uil uil-phone contact__icon"></i>
        <div>
          <h3 className="contact__title">Call Me</h3>
          <span className="contact__subtitle">+212 6 00 00 00 00</span>
        </div>
      </div>
      <div className="contact__information">
        <i className="uil uil-envelope contact__icon"></i>
        <div>
          <h3 className="contact__title">Email</h3>
          <span className="contact__subtitle">
            <a href="mailto:Elgharras.haitam@gmail.com" id="email">
              Elgharras.haitam@gmail.com
            </a>
          </span>
        </div>
      </div>
      <div className="contact__information">
        <i className="uil uil-map-marker contact__icon"></i>
        <div>
          <h3 className="contact__title">Location</h3>
          <span className="contact__subtitle">Mohammedia | Morocco</span>
        </div>
      </div>
    </div>
  );
};
