import QualificationItem from "./QualificationItem";
import qualificationsData from "../../data/qualificationsData";

const QualificationContent = () => {
  return (
    <div
      className="qualification__content qualification__active"
      data-content
      id="education"
    >
      {qualificationsData.map((qualification, index) => (
        <QualificationItem
          key={index}
          title={qualification.title}
          subtitle={qualification.subtitle}
          calendar={qualification.calendar}
        />
      ))}
    </div>
  );
};

export default QualificationContent;
