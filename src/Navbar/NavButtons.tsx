const ThemeButton = () => {
  return <i className="uil uil-moon change-theme" id="theme-button"></i>;
};

const NavToggle = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
      <i className="uil uil-apps"></i>
    </div>
  );
};

export { ThemeButton, NavToggle };
