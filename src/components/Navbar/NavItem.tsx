import { useContext } from "react";
import ToggleMenuContext from "../../Contexts/ToggleMenuContext";

interface NavItemProps {
  name: string;
  handleActive: (name: string) => void;
  active: string;
  icon: string;
}

const NavItem = ({ name, handleActive, active, icon }: NavItemProps) => {
  const { toggleMenu } = useContext(ToggleMenuContext);

  const activeLink = name == active ? "active-link" : "";

  return (
    <li className="nav__item" onClick={toggleMenu}>
      <a
        href={`#${name.toLowerCase()}`}
        className={"nav__link " + activeLink}
        onClick={() => handleActive(name)}
        aria-current={name === active ? "true" : undefined}
      >
        <i className={icon + " nav__icon"} aria-hidden="true"></i>
        {name}
      </a>
    </li>
  );
};

export default NavItem;
