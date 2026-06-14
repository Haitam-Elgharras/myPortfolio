export type QualificationEntry = {
  title: string;
  organization: string;
  calendar: string;
  location?: string;
  bullets?: string[];
};

const qualificationsData: Record<"education" | "work", QualificationEntry[]> = {
  education: [
    {
      title: "State Engineer's Degree",
      organization: "ENSET Mohammedia",
      calendar: "Sep 2022 - Jul 2025",
      location: "Mohammedia, Morocco",
      bullets: [
        "Software and Distributed Information Systems.",
      ],
    },
    {
      title: "DEUST",
      organization: "Faculty of Science and Technology Tangier",
      calendar: "Jan 2020 - Jul 2022",
      location: "Tangier, Morocco",
      bullets: [
        "Mathematics, Computer Science, Physics and Chemistry.",
      ],
    },
  ],
  work: [
    {
      title: "Software Engineer",
      organization: "Theodo Morocco",
      calendar: "Feb 2025 - Present",
      location: "Casablanca Metropolitan Area - On-site",
      bullets: [
        "Build full stack product features in agile teams with a focus on performance and user experience.",
      ],
    },
    {
      title: "Software Engineer Intern",
      organization: "NTT DATA Morocco",
      calendar: "Jul 2024 - Aug 2024",
      location: "Tetouan Metropolitan Area - On-site",
      bullets: [
        "Reduced certificate processing time by 75% by automating certificate workflows with Angular and Spring Boot.",
      ],
    },
    {
      title: "Software Engineer Intern",
      organization: "Eurogate Tanger S.A.",
      calendar: "Jul 2023",
      location: "Tangier, Morocco - Hybrid",
      bullets: [
        "Contributed to an internal operations platform using C#, ASP.NET, and Entity Framework.",
      ],
    },
  ],
};

export default qualificationsData;
