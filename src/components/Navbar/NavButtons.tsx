import { useContext } from "react";
import ToggleMenuContext from "../../Contexts/ToggleMenuContext";

const NavToggle = () => {
  const { toggleMenu } = useContext(ToggleMenuContext);
  return (
    <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
      <i className="uil uil-apps"></i>
    </div>
  );
};

export { NavToggle };
