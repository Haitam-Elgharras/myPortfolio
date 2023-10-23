import { useState } from "react";
import SectionTitle from "../SectionTitle";
import QualificationButtonItem from "./QualificationButtonItem";
import QualificationItem from "./QualificationItem";

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
        {/* tester qualificationItem */}
        <div className="qualification__sections">
          <div
            className="qualification__content qualification__active"
            data-content
            id="education"
          >
            <div className="qualification__sections">
              <div
                className="qualification__content qualification__active"
                data-content
                id="education"
              >
                <QualificationItem
                  title="Computer Science"
                  subtitle="University of California, Irvine"
                  calendar="2019 - 2021"
                />
                <QualificationItem
                  title="Computer Science"
                  subtitle="University of California, Irvine"
                  calendar="2019 - 2021"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualificationSection;
