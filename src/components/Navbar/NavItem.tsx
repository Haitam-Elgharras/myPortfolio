import { useContext } from "react";
import { Link } from "react-router";
import ToggleMenuContext from "../../Contexts/ToggleMenuContext";

interface NavItemProps {
  name: string;
  icon: string;
  href: string;
  /** Route links go through the router; same-page anchors stay plain <a>. */
  isRoute: boolean;
  handleActive: (name: string) => void;
  active: string;
}

const NavItem = ({
  name,
  icon,
  href,
  isRoute,
  handleActive,
  active,
}: NavItemProps) => {
  const { toggleMenu } = useContext(ToggleMenuContext);

  const isActive = name === active;
  const className = `nav__link ${isActive ? "active-link" : ""}`;
  const content = (
    <>
      <i className={`${icon} nav__icon`} aria-hidden="true"></i>
      {name}
    </>
  );

  return (
    <li className="nav__item" onClick={toggleMenu}>
      {isRoute ? (
        <Link
          to={href}
          className={className}
          onClick={() => handleActive(name)}
          aria-current={isActive ? "page" : undefined}
        >
          {content}
        </Link>
      ) : (
        <a
          href={href}
          className={className}
          onClick={() => handleActive(name)}
          aria-current={isActive ? "true" : undefined}
        >
          {content}
        </a>
      )}
    </li>
  );
};

export default NavItem;
