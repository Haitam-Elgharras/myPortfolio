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
  { kind: "route", name: "Blog", icon: "uil uil-notes", to: "/blog" },
  {
    kind: "anchor",
    name: "Contact",
    icon: "uil uil-message",
    anchor: "contact",
  },
];

const NavList = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Only the home page needs state: everywhere else the active item follows
  // directly from the path, so it is derived during render rather than pushed
  // into state from an effect.
  const [scrolledSection, setScrolledSection] = useState("Home");
  const active = isHome
    ? scrolledSection
    : pathname.startsWith("/blog")
      ? "Blog"
      : "";

  // Scrollspy, re-run per route: the section ids only exist on the home page,
  // so leaving this keyed on mount meant it never re-attached after navigating
  // back from a project or post.
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
          // Anchor links have to be absolute when we are not on the home page,
          // or "#about" from /blog/foo just appends a fragment and goes nowhere.
          href={
            section.kind === "route"
              ? section.to
              : isHome
                ? `#${section.anchor}`
                : `/#${section.anchor}`
          }
          isRoute={section.kind === "route" || !isHome}
          handleActive={setScrolledSection}
          active={active}
        />
      ))}
    </ul>
  );
};

export default NavList;
