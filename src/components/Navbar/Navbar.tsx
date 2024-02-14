import { useState } from "react";
import NavList from "./NavList";
import { NavToggle } from "./NavButtons";
import ThemeButton from "./ThemeButton";
import Logo from "./Logo";
import ToggleMenuContext from "../../Contexts/ToggleMenuContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ToggleMenuContext.Provider value={{ toggleMenu }}>
      <header className="header" id="header">
        <nav className="nav container">
          <Logo name="Haitam.dev" />
          <div
            className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`}
            id="nav-menu"
          >
            <NavList />
            <i
              className="uil uil-times nav__close"
              id="nav-close"
              onClick={toggleMenu}
            ></i>
          </div>

          <div className="nav__btns">
            <ThemeButton />
            <NavToggle />
          </div>
        </nav>
      </header>
    </ToggleMenuContext.Provider>
  );
};

export default Navbar;
