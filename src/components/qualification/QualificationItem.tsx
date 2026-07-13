interface Props {
  title: string;
  organization: string;
  calendar: string;
  location?: string;
  bullets?: string[];
  isLast: boolean;
}

const QualificationItem = ({
  title,
  organization,
  calendar,
  location,
  bullets,
  isLast,
}: Props) => {
  return (
    <div
      className={`qualification__data${
        isLast ? " qualification__data--last" : ""
      }`}
    >
      <div className="qualification__marker" aria-hidden="true">
        <span className="qualification__rounder"></span>
        {!isLast ? <span className="qualification__line"></span> : null}
      </div>
      <div className="qualification__card">
        <h3 className="qualification__title">{title}</h3>
        <span className="qualification__subtitle">{organization}</span>
        <div className="qualification__meta">
          <div className="qualification__calendar">
            <i className="uil uil-schedule" aria-hidden="true"></i>
            {calendar}
          </div>
          {location ? (
            <div className="qualification__calendar">
              <i className="uil uil-map-marker" aria-hidden="true"></i>
              {location}
            </div>
          ) : null}
        </div>
        {bullets?.length ? (
          <ul className="qualification__bullets">
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default QualificationItem;
