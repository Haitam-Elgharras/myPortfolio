import { useState } from "react";
import SectionTitle from "../SectionTitle";
import QualificationButtonItem from "./QualificationButtonItem";

const QualificationSection = () => {
  const [activeTab, setActiveTab] = useState("education");
  const handleTabClick = (target: string) => {
    setActiveTab(target);
  };
  return (
    <section className="qualification section">
      <SectionTitle title="Qualification" subtitle="My personal journey" />
      <div className="qualification__container container">
        <div className="qualification__tabs">
          <QualificationButtonItem
            text="Education"
            iconClass="uil uil-graduation-cap qualification__icon"
            isActive={activeTab === "education"}
            onClick={() => handleTabClick("education")}
            target="#education"
          />

          <QualificationButtonItem
            text="Work"
            iconClass="uil uil-briefcase-alt qualification__icon"
            isActive={activeTab === "work"}
            onClick={() => handleTabClick("work")}
            target="#work"
          />
        </div>
      </div>
    </section>
  );
};

export default QualificationSection;
