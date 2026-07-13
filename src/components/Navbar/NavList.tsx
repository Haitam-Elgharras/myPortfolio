import { useEffect, useState } from "react";
import NavItem from "./NavItem";

// combine the sections and the icon into a key value pair
const sections = [
  { name: "Home", icon: "uil uil-estate" },
  { name: "About", icon: "uil uil-user" },
  { name: "Skills", icon: "uil uil-file-alt" },
  { name: "Portfolio", icon: "uil uil-scenery" },
  { name: "Contact", icon: "uil uil-message" },
];

// Anchor id per nav item (Portfolio scrolls to #portfolio).
const anchorId = (name: string) => name.toLowerCase();

const NavList = () => {
  const [active, setActive] = useState("Home");

  const handleActive = (name: string) => {
    setActive(name);
  };

  // Scrollspy: mark the section crossing the viewport middle as active.
  useEffect(() => {
    const entries = sections
      .map((section) => ({
        name: section.name,
        el: document.getElementById(anchorId(section.name)),
      }))
      .filter((entry): entry is { name: string; el: HTMLElement } =>
        Boolean(entry.el)
      );

    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        observed.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = entries.find((item) => item.el === entry.target);
          if (match) setActive(match.name);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    entries.forEach((entry) => observer.observe(entry.el));
    return () => observer.disconnect();
  }, []);

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
