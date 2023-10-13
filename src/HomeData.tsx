interface HomeDataProps {
  title: string;
  subtitle: string;
  description: string;
}

const HomeData = ({ title, subtitle, description }: HomeDataProps) => {
  return (
    <div className="home__data">
      <h1 className="home__title">{title}</h1>
      <h3 className="home__subtitle">{subtitle}</h3>
      <p className="home__description">{description}</p>
      <a href="#contact" className="button button--flex">
        Contact Me <i className="uil uil-message button__icon"></i>
      </a>
    </div>
  );
};

export default HomeData;
