import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  FaDocker,
  FaGitAlt,
  FaJava,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiAngular,
  SiApachekafka,
  SiExpress,
  SiJavascript,
  SiNextdotjs,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";
import "./style.css";

type Skill = {
  name: string;
  icon: IconType;
  color: string;
  darkColor?: string;
};

type SkillGroup = {
  title: string;
  description: string;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Backend & Architecture",
    description: "Service design, APIs, scalable systems, and platform thinking.",
    skills: [
      { name: "Java", icon: FaJava, color: "#f05d23" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
      { name: "Node.js", icon: FaNodeJs, color: "#5fa04e" },
      { name: "Express", icon: SiExpress, color: "#9ca3af" },
    ],
  },
  {
    title: "Frontend & Web",
    description: "Typed UI engineering, modern frameworks, and production-ready interfaces.",
    skills: [
      { name: "React", icon: FaReact, color: "#61dafb" },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "#111111",
        darkColor: "#f3f4f6",
      },
      { name: "Angular", icon: SiAngular, color: "#dd0031" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
    ],
  },
  {
    title: "DevOps & Tooling",
    description: "Delivery workflows, containers, and event-driven infrastructure.",
    skills: [
      { name: "Docker", icon: FaDocker, color: "#2496ed" },
      {
        name: "Kafka",
        icon: SiApachekafka,
        color: "#111111",
        darkColor: "#f3f4f6",
      },
      { name: "Git", icon: FaGitAlt, color: "#f05032" },
    ],
  },
];

function Skills() {
  return (
    <section className="skills section" id="skills">
      <h2 className="section__title">Skills</h2>
      <span className="section__subtitle">Core engineering strengths</span>

      <div className="skills-showcase container">
        {skillGroups.map((group) => (
          <article className="skills-group-card" key={group.title}>
            <div className="skills-group-header">
              <h3 className="skills-group-title">{group.title}</h3>
              <p className="skills-group-description">{group.description}</p>
            </div>

            <div className="skills-group-grid">
              {group.skills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <div
                    className="skill-chip"
                    key={skill.name}
                    style={
                      {
                        "--skill-color": skill.color,
                        "--skill-color-dark": skill.darkColor ?? skill.color,
                      } as CSSProperties
                    }
                  >
                    <span className="skill-chip-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="skill-chip-name">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;
