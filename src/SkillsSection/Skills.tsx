import SkillsCategory from "./SkillsCategory";
import skillsData from "../data/skillsData";
import { useState } from "react";

function Skills() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <section className="skills section" id="skills">
        <h2 className="section__title">Skills</h2>
        <span className="section__subtitle">My technical level</span>
        <div className="skills__container container grid">
          {skillsData.map((category, index) => (
            <SkillsCategory
              key={index}
              title={category.title}
              subtitle={category.subtitle}
              icon={category.icon}
              skills={category.skills}
              toggleShow={() => setShow(!show)}
              show={show}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Skills;
