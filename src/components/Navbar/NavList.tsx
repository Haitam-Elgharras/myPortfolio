import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import NavItem from "./NavItem";

type NavSection =
  | { kind: "anchor"; name: string; icon: string; anchor: string }
  | { kind: "route"; name: string; icon: string; to: string };

const sections: NavSection[] = [
  { kind: "anchor", name: "Home", icon: "uil uil-estate", anchor: "home" },
  { kind: "anchor", name: "About", icon: "uil uil-user", anchor: "about" },
  { kind: "anchor", name: "Skills", icon: "uil uil-file-alt", anchor: "skills" },
  {
    kind: "anchor",
    name: "Portfolio",
    icon: "uil uil-scenery",
    anchor: "portfolio",
  },
  {
    kind: "anchor",
    name: "Contact",
    icon: "uil uil-message",
    anchor: "contact",
  },
  { kind: "route", name: "Blog", icon: "uil uil-notes", to: "/blog" },
];

const NavList = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [scrolledSection, setScrolledSection] = useState("Home");
  const active = isHome
    ? scrolledSection
    : pathname.startsWith("/blog")
      ? "Blog"
      : "";

  useEffect(() => {
    if (!isHome) return;

    const entries = sections
      .filter((section) => section.kind === "anchor")
      .map((section) => ({
        name: section.name,
        el: document.getElementById(section.anchor),
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
          if (match) setScrolledSection(match.name);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    entries.forEach((entry) => observer.observe(entry.el));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <ul className="nav__list grid">
      {sections.map((section) => (
        <NavItem
          key={section.name}
          name={section.name}
          icon={section.icon}
          to={section.kind === "route" ? section.to : `/#${section.anchor}`}
          handleActive={setScrolledSection}
          active={active}
        />
      ))}
    </ul>
  );
};

export default NavList;
