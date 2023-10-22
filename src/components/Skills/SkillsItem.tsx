interface skillsItemProps {
  icon: string;
  title: string;
  percentage: string;
}

function SkillsItem({ icon, title, percentage }: skillsItemProps) {
  return (
    <div className="skills__data">
      <div className="skills__titles">
        <h3 className="skills__name">{title}</h3>
        <span className="skills__number">{percentage}</span>
      </div>
      <div className="skills__bar">
        <span className={`skills__percentage skills__${icon}`}></span>
      </div>
    </div>
  );
}

export default SkillsItem;
