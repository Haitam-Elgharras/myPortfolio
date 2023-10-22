import HomeSocial from "./HomeSocial";
import BlobSVG from "./BlobSVG";
import HomeData from "./HomeData";
import img from "../../assets/img/prfl.png";

const HomeContent = () => {
  return (
    <section className="home section" id="Home">
      <div className="home__container container grid">
        <div className="home__content grid">
          <HomeSocial />
          <BlobSVG x="0" y="-70" href={img} />
          <HomeData
            title="Hi, I'm Haitam"
            subtitles={["Software Engineer", "Web Developer", "Freelancer"]}
            description="High level experience in web development knowledge, producing quality work."
            delay={1000}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
