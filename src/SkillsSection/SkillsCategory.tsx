import SkillsItem from "./skillsItem";

interface Props {
  icon: string;
  title: string;
  subtitle: string;
  skills: {
    icon: string;
    title: string;
    percentage: string;
  }[];
  toggleShow: () => void;
  show: boolean;
}

const SkillsCategory = ({
  icon,
  title,
  subtitle,
  skills,
  toggleShow,
  show,
}: Props) => {
  return (
    <div
      className={`skills__content ` + (show ? "skills__open" : "skills__close")}
      onClick={toggleShow}
    >
      <div className="skills__header">
        <i className={`uil ${icon} skills__icon`}></i>
        <div>
          <h1 className="skills__title">{title}</h1>
          <span className="skills__subtitle">{subtitle}</span>
        </div>
        <i className="uil uil-angle-down skills__arrow"></i>
      </div>

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
    </div>
  );
};

export default SkillsCategory;
