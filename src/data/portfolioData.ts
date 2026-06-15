import gamehub from "../assets/img/gamehubDark.png";
import gamehubBrowse from "../assets/img/gamehub.png";
import nimbustalkHome from "../assets/img/nimbustalkHome.png";
import nimbustalkLogin from "../assets/img/nimbustalkLogin.png";
import nimbustalkRegister from "../assets/img/nimbustalkRegister.png";
import nimbustalkUser from "../assets/img/nimbustalkUser.png";
import ekartHome from "../assets/img/ekartHome.png";
import ekartSearch from "../assets/img/ekartSearch.png";
import ekartDetails from "../assets/img/ekartDetails.png";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  cardDescription: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  stack: string[];
  keyOutcomes: string[];
  links: ProjectLink[];
  images: ProjectImage[];
};

export const portfolioData: Project[] = [
  {
    id: 1,
    slug: "game-hub",
    title: "Game Hub",
    cardDescription:
      "Video game discovery platform built with React, TypeScript, and a clean browsing experience for exploring new titles.",
    summary:
      "Game Hub is a responsive web application for browsing games, filtering by genre and platform, and reviewing detailed information in real time.",
    imageSrc: gamehub,
    imageAlt:
      "Screenshot of Game Hub video game discovery platform built with React and TypeScript",
    stack: ["React", "TypeScript", "Chakra UI", "Zustand"],
    keyOutcomes: [
      "Built a fast filtering and discovery experience for video game catalogs.",
      "Used typed state management to keep the browsing flow reliable and maintainable.",
      "Designed a UI that stays readable across desktop and mobile screens."
    ],
    links: [
      { label: "Live demo", href: "https://gamehub-23.vercel.app/" },
      { label: "Project details", href: "/projects/game-hub" }
    ],
    images: [
      {
        src: gamehub,
        alt: "Game Hub home screen showing featured game discovery cards"
      },
      {
        src: gamehubBrowse,
        alt: "Game Hub browse interface with searchable game listings"
      }
    ]
  },
  {
    id: 2,
    slug: "nimbustalk",
    title: "NimbusTalk",
    cardDescription:
      "Secure desktop communication application using WebSockets for realtime messaging and account-based user flows.",
    summary:
      "NimbusTalk is a desktop chat application focused on secure communication, authentication flows, and responsive realtime updates.",
    imageSrc: nimbustalkHome,
    imageAlt:
      "Screenshot of NimbusTalk secure desktop messaging application home screen",
    stack: ["Desktop UI", "WebSockets", "Authentication", "Realtime Messaging"],
    keyOutcomes: [
      "Implemented realtime communication with a desktop-oriented user interface.",
      "Created login, registration, and profile flows for secure account access.",
      "Focused on responsive messaging interactions and clean user state handling."
    ],
    links: [
      { label: "GitHub repository", href: "https://github.com/Haitam-Elgharras/NimbusTalk" },
      { label: "Project details", href: "/projects/nimbustalk" }
    ],
    images: [
      {
        src: nimbustalkHome,
        alt: "NimbusTalk desktop messaging dashboard screenshot"
      },
      {
        src: nimbustalkLogin,
        alt: "NimbusTalk login screen for secure user authentication"
      },
      {
        src: nimbustalkRegister,
        alt: "NimbusTalk registration page for new user onboarding"
      },
      {
        src: nimbustalkUser,
        alt: "NimbusTalk user profile and messaging interface screenshot"
      }
    ]
  },
  {
    id: 3,
    slug: "ekart",
    title: "Ekart Online Store",
    cardDescription:
      "E-commerce frontend for product search, browsing, and order-focused shopping flows with Angular-based development.",
    summary:
      "Ekart is an online store experience designed around product discovery, structured category browsing, and customer shopping flows.",
    imageSrc: ekartHome,
    imageAlt:
      "Screenshot of Ekart online store application homepage with product listings",
    stack: ["Angular", "E-commerce UI", "Product Search", "Customer Flows"],
    keyOutcomes: [
      "Built structured navigation for product discovery and category browsing.",
      "Designed customer-facing shopping journeys with product detail screens.",
      "Prepared the application for payment and order-tracking extensions."
    ],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/Haitam-Elgharras/E-Commerce-Angular-App"
      },
      { label: "Project details", href: "/projects/ekart" }
    ],
    images: [
      {
        src: ekartHome,
        alt: "Ekart homepage showing featured products and storefront layout"
      },
      {
        src: ekartSearch,
        alt: "Ekart product search view with filtered shopping results"
      },
      {
        src: ekartDetails,
        alt: "Ekart product detail page with item information and purchase options"
      }
    ]
  }
];

export function getProjectBySlug(slug: string) {
  return portfolioData.find((project) => project.slug === slug);
}
