import { useState } from "react";
import NavItem from "./NavItem";

// combine the sections and the icon into a key value pair
const sections = [
  { name: "Home", icon: "uil uil-estate" },
  { name: "About", icon: "uil uil-user" },
  { name: "Skills", icon: "uil uil-file-alt" },
  { name: "Portfolio", icon: "uil uil-scenery" },
  { name: "Contact", icon: "uil uil-message" },
];

const NavList = () => {
  const [active, setActive] = useState("Home");

  const handleActive = (name: string) => {
    setActive(name);
  };
  return (
    <ul className="nav__list grid">
      {sections.map((section) => (
        <NavItem
          key={section.name}
          name={section.name}
          icon={section.icon}
          handleActive={handleActive}
          active={active}
        />
      ))}
    </ul>
  );
};

export default NavList;
