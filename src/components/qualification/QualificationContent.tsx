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
          isLast={index === qualificationsData[key].length - 1}
          title={qualification.title}
          organization={qualification.organization}
          calendar={qualification.calendar}
          location={qualification.location}
          bullets={qualification.bullets}
        />
      ))}
    </div>
  );
};

export default QualificationContent;
