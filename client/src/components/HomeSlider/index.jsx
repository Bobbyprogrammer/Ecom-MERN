import React, { useContext } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { MyContext } from "../../App";

const HomeSlider = (props) => {
  const context = useContext(MyContext);

  return (
    <section className="homeSlider  relative z-[99] w-screen">
      <div>
        <Swiper
          loop={true}
          spaceBetween={20}
          navigation={context?.windowWidth > 992}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="sliderHome w-full overflow-hidden shadow-xl"
        >
          {props?.data?.length !== 0 &&
            props?.data
              ?.slice()
              ?.reverse()
              ?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    {/* BANNER ITEM */}

                    <div className="relative w-full overflow-hidden ">
                      {/* IMAGE */}

                      <img
                        src={item?.images[0]}
                        alt="Banner slide"
                        className="
    w-full
    h-[180px]
    sm:h-[250px]
    md:h-[380px]
    lg:h-[500px]
    xl:h-[650px]
    object-cover
    object-center
  "
                      />

                      {/* DARK OVERLAY */}

                      <div className="absolute inset-0 bg-[rgba(0,0,0,0.20)]"></div>

                      {/* CONTENT */}

                      <div className="absolute top-0 left-0 w-full h-full flex items-center">
                        <div className="container">
                          <div className="max-w-[90%] md:max-w-[60%] lg:max-w-[45%] text-white px-4 md:px-10">
                            {/* <span className="uppercase tracking-[3px] text-[11px] md:text-[14px] font-[500] text-gray-200 block mb-3">
                              Premium Saree Collection
                            </span> */}
                            {/* 
                            <h2
                              className="
                              text-[22px]
                              sm:text-[30px]
                              md:text-[42px]
                              lg:text-[55px]
                              xl:text-[65px]
                              font-[800]
                              leading-tight
                              mb-4
                            "
                            >
                              Elegance In Every Drape
                            </h2> */}

                            {/* <p
                              className="
                              text-[12px]
                              sm:text-[14px]
                              md:text-[16px]
                              text-gray-100
                              leading-[22px]
                              mb-5
                              hidden sm:block
                            "
                            >
                              Discover timeless saree collections crafted with
                              tradition, elegance, and premium fabrics.
                            </p> */}

                            {/* <button
                              className="
                              bg-red-500
                              hover:bg-red-600
                              transition-all
                              duration-300
                              text-white
                              font-[700]
                              px-5
                              md:px-7
                              py-2
                              md:py-3
                              rounded-lg
                              text-[13px]
                              md:text-[15px]
                              shadow-lg
                            "
                            >
                              SHOP NOW
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeSlider;
