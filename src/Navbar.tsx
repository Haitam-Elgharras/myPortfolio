import NavList from "./NavList";
import Logo from "./logo";
import NavButtons from "./NavButtons";

const Navbar = () => {
  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Logo name="Haitam" />
        <div className="nav__menu" id="nav-menu">
          <NavList />
          <i className="uil uil-times nav__close" id="nav-close"></i>
        </div>
        <NavButtons />
      </nav>
    </header>
  );
};

export default Navbar;
