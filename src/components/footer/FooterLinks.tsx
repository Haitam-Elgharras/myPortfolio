import { Link } from "react-router";

export const FooterLinks = () => {
  return (
    <ul className="footer__links">
      <li>
        <Link to="/#about" className="footer__link">
          About
        </Link>
      </li>
      <li>
        <Link to="/#portfolio" className="footer__link">
          Projects
        </Link>
      </li>
      <li>
        <Link to="/blog" className="footer__link">
          Blog
        </Link>
      </li>
      <li>
        <Link to="/#contact" className="footer__link">
          Contact
        </Link>
      </li>
    </ul>
  );
};
