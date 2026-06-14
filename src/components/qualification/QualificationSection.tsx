import { useState } from "react";
import SectionTitle from "../SectionTitle";
import QualificationButtonItem from "./QualificationButtonItem";
import QualificationContent from "./QualificationContent";

const QualificationSection = () => {
  const [activeTab, setActiveTab] = useState("work");

  const handleTabClick = (target: string) => {
    setActiveTab(target);
  };

  return (
    <section className="qualification section">
      <SectionTitle title="Experience & Education" subtitle="My engineering path" />
      <div className="qualification__container container">
        <div className="qualification__tabs">
          <QualificationButtonItem
            text="Work"
            iconClass="uil uil-briefcase-alt qualification__icon"
            isActive={activeTab === "work"}
            onClick={() => handleTabClick("work")}
            target="#work"
          />

          <QualificationButtonItem
            text="Education"
            iconClass="uil uil-graduation-cap qualification__icon"
            isActive={activeTab === "education"}
            onClick={() => handleTabClick("education")}
            target="#education"
          />
        </div>
        <div className="qualification__sections">
          <QualificationContent activeTab={activeTab} />
        </div>
      </div>
    </section>
  );
};

export default QualificationSection;
