import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// SWIPER CSS
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// MODULES
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import { MyContext } from "../../App";

const HomeBannerV2 = (props) => {
  const context = useContext(MyContext);

  return (
    <Swiper
      loop={true}
      slidesPerView={1}
      spaceBetween={30}
      effect={"fade"}
      navigation={context?.windowWidth < 992 ? false : true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      className="homeSliderV2 rounded-2xl overflow-hidden"
    >
      {props?.data?.map((item, index) => {
        if (
          item?.isDisplayOnHomeBanner === true &&
          item?.bannerimages?.length !== 0
        ) {
          return (
            <SwiperSlide key={index}>
              {/* MAIN BANNER */}
              <div className="relative w-full h-[220px] sm:h-[280px] md:h-[350px] lg:h-[450px] overflow-hidden rounded-2xl">
                {/* BACKGROUND IMAGE */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105"
                  style={{
                    backgroundImage: `url(${item?.bannerimages[0]})`,
                  }}
                ></div>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.35)]"></div>

                {/* CONTENT */}
                <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center">
                  <div className="container">
                    <div className="max-w-[600px] text-white">
                      {/* SMALL TITLE */}
                      <span className="inline-block text-[13px] md:text-[16px] font-[500] tracking-[1px] uppercase mb-3 bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm">
                        {item?.bannerTitleName}
                      </span>

                      {/* MAIN TITLE */}
                      <h2 className="text-[18px] sm:text-[28px] md:text-[45px] lg:text-[60px] font-[800] leading-snug md:leading-tight mb-3 md:mb-4 drop-shadow-lg">
                        {item?.name?.length > 70
                          ? item?.name?.substr(0, 70) + "..."
                          : item?.name}
                      </h2>

                      {/* PRICE */}
                      <div className="flex items-center gap-3 flex-wrap mb-6">
                        <span className="text-[15px] md:text-[18px] font-[500] text-gray-200">
                          Starting At Only
                        </span>

                        <span className="text-[18px] sm:text-[24px] md:text-[38px] font-[800] text-[#ff4d4d] drop-shadow-lg">
                          {item?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </span>
                      </div>

                      {/* BUTTON */}
                      <Link to={`/product/${item?._id}`}>
                        <Button className="!bg-red-500 hover:!bg-red-600 !text-white !font-[700] !px-5 md:!px-7 !py-1 md:!py-3 !rounded-xl !shadow-xl !text-[13px] md:!text-[15px]">
                          SHOP NOW
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
};

export default HomeBannerV2;
