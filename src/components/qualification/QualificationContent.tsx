import QualificationItem from "./QualificationItem";
import qualificationsData from "../../data/qualificationsData";

interface Props {
  activeTab: string;
}

const QualificationContent = ({ activeTab }: Props) => {
  const key = activeTab as keyof typeof qualificationsData;
  return (
    <div className="qualification__content" id={activeTab}>
      {qualificationsData[key].map((qualification, index) => (
        <QualificationItem
          key={index}
          index={index}
          title={qualification.title}
          subtitle={qualification.subtitle}
          calendar={qualification.calendar}
        />
      ))}
    </div>
  );
};

export default QualificationContent;
