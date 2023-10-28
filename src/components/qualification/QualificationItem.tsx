interface Props {
  title: string;
  subtitle: string;
  calendar: string;
  index: number;
}

const QualificationItem = ({ title, subtitle, calendar, index }: Props) => {
  if (index % 2 === 0) {
    return (
      <div className="qualification__data">
        <div>
          <h3 className="qualification__title">{title}</h3>
          <span className="qualification__subtitle">{subtitle}</span>
          <div className="qualification__calendar">
            <i className="uil uil-calendar-alt"></i>
            {calendar}
          </div>
        </div>
        <div>
          <span className="qualification__rounder"></span>
          <span className="qualification__line"></span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="qualification__data">
        <div></div>
        <div>
          <span className="qualification__rounder"></span>
          <span className="qualification__line"></span>
        </div>
        <div>
          <h3 className="qualification__title">{title}</h3>
          <span className="qualification__subtitle">{subtitle}</span>
          <div className="qualification__calendar">
            <i className="uil uil-calendar-alt"></i>
            {calendar}
          </div>
        </div>
      </div>
    );
  }
};

export default QualificationItem;
