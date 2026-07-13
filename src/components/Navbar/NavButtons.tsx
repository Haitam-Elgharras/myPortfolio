import { useContext } from "react";
import ToggleMenuContext from "../../Contexts/ToggleMenuContext";

const NavToggle = () => {
  const { toggleMenu } = useContext(ToggleMenuContext);
  return (
    <button
      type="button"
      className="nav__toggle"
      id="nav-toggle"
      onClick={toggleMenu}
      aria-label="Open navigation menu"
    >
      <i className="uil uil-apps" aria-hidden="true"></i>
    </button>
  );
};

export { NavToggle };
