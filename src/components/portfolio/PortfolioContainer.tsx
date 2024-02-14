import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination, Mousewheel } from "swiper/modules";

import PortfolioItem from "./ProtfolioItem";
import { portfolioData } from "../../data/portfolioData";

const PortfolioContainer = () => {
  return (
    <div className="portfolio__container">
      <Swiper
        modules={[Mousewheel, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        mousewheel={true}
        loop={true}
        breakpoints={{
          // when window width is >= 640px
          768: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
      >
        {portfolioData.map((item, index) => (
          <SwiperSlide key={index}>
            <PortfolioItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PortfolioContainer;
