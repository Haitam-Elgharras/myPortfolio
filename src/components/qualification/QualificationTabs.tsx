import React from "react";

const QualificationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="qualification__tabs">
      <div
        className={`qualification__button button--flex ${
          activeTab === "education" ? "qualification__active" : ""
        }`}
        data-target="#education"
        onClick={() => setActiveTab("education")}
      >
        <i className="uil uil-graduation-cap qualification__icon"></i>
        Education
      </div>
      <div
        className={`qualification__button button--flex ${
          activeTab === "work" ? "qualification__active" : ""
        }`}
        data-target="#work"
        onClick={() => setActiveTab("work")}
      >
        <i className="uil uil-briefcase-alt qualification__icon"></i>
        Work
      </div>
    </div>
  );
};

export default QualificationTabs;
