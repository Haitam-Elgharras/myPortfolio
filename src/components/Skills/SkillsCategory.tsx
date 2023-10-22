import SectionTitle from "../SectionTitle";
import SkillsList from "./SkillsList";

interface Props {
  icon: string;
  title: string;
  subtitle: string;
  skills: {
    icon: string;
    title: string;
    percentage: string;
  }[];
  isOpen: boolean;
  onToggle: () => void;
}

const SkillsCategory = ({
  icon,
  title,
  subtitle,
  skills,
  isOpen,
  onToggle,
}: Props) => {
  return (
    <div
      className={`skills__content ${isOpen ? "skills__open" : "skills__close"}`}
    >
      <div className="skills__header" onClick={onToggle}>
        <i className={`uil ${icon} skills__icon`}></i>
        <SectionTitle title={title} subtitle={subtitle} />
        <i className={`uil uil-angle-down skills__arrow`}></i>
      </div>

      <SkillsList skills={skills} />
    </div>
  );
};

export default SkillsCategory;
