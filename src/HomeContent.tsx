import HomeSocial from "./HomeSocial";
import BlobSVG from "./BlobSVG";
import HomeData from "./HomeData";
import img from "./assets/prfl.png";

const HomeContent = () => {
  return (
    <main className="main">
      <section className="home section" id="home">
        <div className="home__container container grid">
          <div className="home__content grid">
            <HomeSocial />
            <BlobSVG x="0" y="-70" href={img} />
            <HomeData
              title="Hi, I'm Haitam"
              subtitle="Software Engineer"
              description="High level experience in web development knowledge, producing quality work."
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeContent;
