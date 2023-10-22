import { useContext } from "react";
import ToggleMenuContext from "../Contexts/toggleMenuContext";

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
        href={"#" + name}
        className={"nav__link " + activeLink}
        onClick={() => handleActive(name)}
      >
        <i className={icon + " nav__icon"}></i>
        {name}
      </a>
    </li>
  );
};

export default NavItem;
