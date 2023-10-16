import { TypeAnimation } from "react-type-animation";

function addDelay(arr: string[], delay: number) {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    newArray.push(arr[i]);
    if (i < arr.length - 1) {
      newArray.push(delay);
    }
  }
  return newArray;
}

interface HomeDataProps {
  title: string;
  subtitles: string[];
  description: string;
  delay: number;
}

const HomeData = ({ title, subtitles, description, delay }: HomeDataProps) => {
  const subtitlesDelay = addDelay(subtitles, delay);
  return (
    <div className="home__data">
      <h1 className="home__title">{title}</h1>
      <h3 className="home__subtitle">
        A{" "}
        <TypeAnimation
          cursor={true}
          sequence={subtitlesDelay}
          speed={40}
          repeat={Infinity}
        />
      </h3>
      <p className="home__description">{description}</p>
      <a href="#contact" className="button button--flex">
        Contact Me <i className="uil uil-message button__icon"></i>
      </a>
    </div>
  );
};

export default HomeData;
