import { useContext } from "react";
import { Link } from "react-router";
import ToggleMenuContext from "../../Contexts/ToggleMenuContext";

interface NavItemProps {
  name: string;
  icon: string;
  to: string;
  handleActive: (name: string) => void;
  active: string;
}

const NavItem = ({ name, icon, to, handleActive, active }: NavItemProps) => {
  const { toggleMenu } = useContext(ToggleMenuContext);

  const isActive = name === active;

  return (
    <li className="nav__item" onClick={toggleMenu}>
      <Link
        to={to}
        className={`nav__link ${isActive ? "active-link" : ""}`}
        onClick={() => handleActive(name)}
        aria-current={isActive ? "page" : undefined}
      >
        <i className={`${icon} nav__icon`} aria-hidden="true"></i>
        {name}
      </Link>
    </li>
  );
};

export default NavItem;
