interface NavItemProps {
  name: string;
  handleActive: (name: string) => void;
  active: string;
  icon: string;
}

const NavItem = ({ name, handleActive, active, icon }: NavItemProps) => {
  const activeLink = name == active ? "active-link" : "";

  return (
    <li className="nav__item">
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
