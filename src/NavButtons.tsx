const ThemeButton = () => {
  return <i className="uil uil-moon change-theme" id="theme-button"></i>;
};

const NavToggle = () => {
  return (
    <div className="nav__toggle" id="nav-toggle">
      <i className="uil uil-apps"></i>
    </div>
  );
};

const NavButtons = () => {
  return (
    <div className="nav__btns">
      <ThemeButton />
      <NavToggle />
    </div>
  );
};

export default NavButtons;
