import socialLinks from "../../data/socialLinks";

export const FooterSocials = () => {
  return (
    <div className="footer__socials">
      {socialLinks.map((socialLink, i) => (
        <a
          key={i}
          href={socialLink.link}
          target="_blank"
          className="footer__social"
        >
          <i className={socialLink.icon}></i>
        </a>
      ))}
    </div>
  );
};
