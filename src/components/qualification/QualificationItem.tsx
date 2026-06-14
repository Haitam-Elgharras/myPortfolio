interface Props {
  title: string;
  organization: string;
  calendar: string;
  location?: string;
  bullets?: string[];
  index: number;
  isLast: boolean;
}

const QualificationCard = ({
  title,
  organization,
  calendar,
  location,
  bullets,
}: Omit<Props, "index" | "isLast">) => {
  return (
    <div className="qualification__card">
      <h3 className="qualification__title">{title}</h3>
      <span className="qualification__subtitle">{organization}</span>
      <div className="qualification__meta">
        <div className="qualification__calendar">
          <i className="uil uil-schedule"></i>
          {calendar}
        </div>
        {location ? (
          <div className="qualification__calendar">
            <i className="uil uil-map-marker"></i>
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
  );
};

const QualificationItem = ({
  title,
  organization,
  calendar,
  location,
  bullets,
  index,
  isLast,
}: Props) => {
  const card = (
    <QualificationCard
      title={title}
      organization={organization}
      calendar={calendar}
      location={location}
      bullets={bullets}
    />
  );

  if (index % 2 === 0) {
    return (
      <div className={`qualification__data${isLast ? " qualification__data--last" : ""}`}>
        <div className="qualification__side qualification__side--content">{card}</div>
        <div className="qualification__marker">
          <span className="qualification__rounder"></span>
          {!isLast ? <span className="qualification__line"></span> : null}
        </div>
        <div className="qualification__side qualification__side--spacer"></div>
      </div>
    );
  }

  return (
    <div className={`qualification__data${isLast ? " qualification__data--last" : ""}`}>
      <div className="qualification__side qualification__side--spacer"></div>
      <div className="qualification__marker">
        <span className="qualification__rounder"></span>
        {!isLast ? <span className="qualification__line"></span> : null}
      </div>
      <div className="qualification__side qualification__side--content">{card}</div>
    </div>
  );
};

export default QualificationItem;
