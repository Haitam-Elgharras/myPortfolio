import { useContext } from "react";
import ToggleMenuContext from "../Contexts/toggleMenuContext";

const ThemeButton = () => {
  return <i className="uil uil-moon change-theme" id="theme-button"></i>;
};

const NavToggle = () => {
  const { toggleMenu } = useContext(ToggleMenuContext);
  return (
    <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
      <i className="uil uil-apps"></i>
    </div>
  );
};

export { ThemeButton, NavToggle };
