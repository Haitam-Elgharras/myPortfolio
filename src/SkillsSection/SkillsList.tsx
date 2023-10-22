import SkillsItem from "./skillsItem";

interface Props {
  skills: {
    icon: string;
    title: string;
    percentage: string;
  }[];
}

const SkillsList = ({ skills }: Props) => {
  return (
    <div className="skills__list grid">
      {skills.map((skill, index) => (
        <SkillsItem
          key={index}
          icon={skill.icon}
          title={skill.title}
          percentage={skill.percentage}
        />
      ))}
    </div>
  );
};

export default SkillsList;
