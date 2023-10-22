// Skills.js
import { useState } from "react";
import SkillsCategory from "./SkillsCategory";
import skillsData from "../data/skillsData";

function Skills() {
  const [openCategory, setOpenCategory] = useState(-1);

  const toggleCategory = (index: number) => {
    if (index === openCategory) {
      setOpenCategory(-1);
    } else {
      setOpenCategory(index);
    }
  };

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
              isOpen={index === openCategory}
              onToggle={() => toggleCategory(index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Skills;
