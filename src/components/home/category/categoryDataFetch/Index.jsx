import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Navigation } from "swiper/modules";
import Container from "@/components/commonComponent/containers/Container";
import { useCategory } from "@/hooks/useCategory";
import { allIcons } from "@/helpers/IconProvider";
import { Link } from "react-router-dom";

const Index = () => {
  const { data, isError, isLoading } = useCategory();

  if (isLoading) {
    return (
      <div className="pt-6 sm:pt-10">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-4">
            {[...new Array(6)].map((_, index) => (
              <div
                className="shadow-xl border border-gray-100 w-full h-[180px] sm:h-[210px] lg:h-[236px] flex flex-col items-center gap-y-4 pt-[24px] px-[28px] rounded-md animate-pulse"
                key={index}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-full border-4 border-gray-100"></div>
                <div className="w-24 h-5 bg-gray-200 rounded-full mt-2"></div>
                <div className="w-20 h-4 bg-gray-200 rounded-full mt-3"></div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  if (isError)
    return (
      <Container>
        <p>Error is Appear</p>
      </Container>
    );

  const { arrowIcon } = allIcons;

  return (
    <div className="pt-6 sm:pt-10">
      <Container>
        {/* Swiper wrapper with overflow-hidden to prevent x-scroll */}
        <div className="relative px-6 sm:px-8">
          {/* Prev Button */}
          <button className="custom-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 lg:h-[48px] lg:w-[48px] border border-primary_500 rounded-full flex justify-center items-center bg-primary_500 z-10 cursor-pointer shadow-md">
            <span className="text-base sm:text-xl text-gray_00">
              {arrowIcon[0].icon}
            </span>
          </button>
          {/* Next Button */}
          <button className="custom-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 lg:h-[48px] lg:w-[48px] border border-primary_500 rounded-full flex justify-center items-center bg-primary_500 z-10 cursor-pointer shadow-md">
            <span className="text-base sm:text-xl text-gray_00">
              {arrowIcon[1].icon}
            </span>
          </button>

          <Swiper
            slidesPerView={2}
            spaceBetween={12}
            freeMode={true}
            modules={[FreeMode, Navigation]}
            className="mySwiper"
            navigation={{
              prevEl: ".custom-swiper-button-prev",
              nextEl: ".custom-swiper-button-next",
            }}
            breakpoints={{
              480: { slidesPerView: 3, spaceBetween: 14 },
              640: { slidesPerView: 4, spaceBetween: 16 },
              768: { slidesPerView: 5, spaceBetween: 16 },
              1024: { slidesPerView: 6, spaceBetween: 18 },
            }}
          >
            {data.map((items, index) => (
              <SwiperSlide key={index} className="pt-1 pb-4">
                <Link to={`/product-details/${items?.id}`}>
                  <div className=" shadow-md border border-gray_100 w-full flex flex-col items-center gap-y-3 px-3 py-4 sm:px-5 sm:py-5 lg:px-[28px] lg:py-[24px] rounded-md h-[150px] sm:h-[180px] lg:h-[220px] hover:-translate-y-1 transition duration-300">
                    <picture className="flex justify-center">
                      <img
                        src={items.thumbnail}
                        alt={items.title}
                        className="w-18 h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-full"
                        loading="lazy"
                      />
                    </picture>
                    <p className="text-[11px] sm:text-sm lg:text-base font-medium text-center line-clamp-2">
                      {items.title}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Index;
