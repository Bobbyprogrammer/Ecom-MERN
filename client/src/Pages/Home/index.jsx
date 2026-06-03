import React, { useContext, useEffect, useState } from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from "../../components/AdsBannerSlider";
import AdsBannerSliderV2 from "../../components/AdsBannerSliderV2";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductsSlider from "../../components/ProductsSlider";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { Navigation, FreeMode } from "swiper/modules";
import BlogItem from "../../components/BlogItem";
import HomeBannerV2 from "../../components/HomeSliderV2";
import BannerBoxV2 from "../../components/bannerBoxV2";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import ProductLoading from "../../components/ProductLoading";
import BannerLoading from "../../components/LoadingSkeleton/bannerLoading";
import { Button } from "@mui/material";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import ProductItem from "../../components/ProductItem";

const Home = () => {
  const [value, setValue] = useState(0);
  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [popularProductsData, setPopularProductsData] = useState([]);
  const [productsData, setAllProductsData] = useState([]);
  const [productsBanners, setProductsBanners] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bannerV1Data, setBannerV1Data] = useState([]);
  const [bannerList2Data, setBannerList2Data] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [randomCatProducts, setRandomCatProducts] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchDataFromApi("/api/homeSlides").then((res) => {
      setHomeSlidesData(res?.data);
    });
    fetchDataFromApi("/api/product/getAllProducts?page=1&limit=12").then(
      (res) => {
        setAllProductsData(res?.products);
      },
    );

    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      setProductsBanners(res?.products);
    });

    fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res) => {
      setFeaturedProducts(res?.products);
    });

    fetchDataFromApi("/api/bannerV1").then((res) => {
      setBannerV1Data(res?.data);
    });

    fetchDataFromApi("/api/bannerList2").then((res) => {
      setBannerList2Data(res?.data);
    });

    fetchDataFromApi("/api/blog").then((res) => {
      setBlogData(res?.blogs);
    });
  }, []);

  useEffect(() => {
    if (context?.catData?.length !== 0) {
      fetchDataFromApi(
        `/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`,
      ).then((res) => {
        if (res?.error === false) {
          setPopularProductsData(res?.products);
        }
      });
    }

    const numbers = new Set();
    while (numbers.size < context?.catData?.length - 1) {
      const number = Math.floor(1 + Math.random() * 8);

      // Add the number to the set (automatically ensures uniqueness)
      numbers.add(number);
    }

    getRendomProducts(Array.from(numbers), context?.catData);
  }, [context?.catData]);

  const getRendomProducts = (arr, catArr) => {
    const filterData = [];

    for (let i = 0; i < arr.length; i++) {
      let catId = catArr[arr[i]]?._id;

      fetchDataFromApi(`/api/product/getAllProductsByCatId/${catId}`).then(
        (res) => {
          filterData.push({
            catName: catArr[arr[i]]?.name,
            data: res?.products,
          });

          setRandomCatProducts(filterData);
        },
      );
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId = (id) => {
    setPopularProductsData([]);
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      if (res?.error === false) {
        setPopularProductsData(res?.products);
      }
    });
  };

  return (
    <div>
      {homeSlidesData?.length === 0 && <BannerLoading />}

      {homeSlidesData?.lengtn !== 0 && <HomeSlider data={homeSlidesData} />}

      <section className="bg-white py-3 lg:py-8">
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            <div className="rightSec w-full lg:w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              ></Tabs>
            </div>
          </div>
        </div>
      </section>

      <section className="py-3 lg:py-2 pt-0 bg-white">
        <div className="container">
          <div className="flex items-center justify-between gap-3 mb-6">
            {/* TITLE */}
            <h2
              className="
    text-[18px]
    sm:text-[22px]
    md:text-[26px]
    font-[700]
    text-gray-800
  "
            >
              New Arrivals
            </h2>

            {/* BUTTON */}
            <Link to="/products">
              <Button
                className="
      !bg-gray-100
      hover:!bg-gray-200
      !text-gray-800
      !capitalize
      !px-3
      md:!px-5
      !border
      !border-[rgba(0,0,0,0.15)]
      !rounded-full
      !text-[12px]
      md:!text-[14px]
      !min-w-max
      "
                size="small"
              >
                View All <MdArrowRightAlt size={22} />
              </Button>
            </Link>
          </div>

          {productsData?.length === 0 && <ProductLoading />}

          {productsData?.length !== 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
              {productsData?.slice(0, 8).map((item, index) => {
                return <ProductItem key={index} item={item} />;
              })}
            </div>
          )}
        </div>
      </section>
      <section className="py-8 lg:py-0 pt-0 bg-white">
        <div className="container my-12">
          <h2 className="text-[28px] font-[700] text-center">
            Featured Products
          </h2>

          {featuredProducts?.length === 0 && <ProductLoading />}

          {featuredProducts?.length !== 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
              {featuredProducts?.slice(0, 8).map((item, index) => {
                return <ProductItem key={index} item={item} />;
              })}
            </div>
          )}

          {bannerList2Data?.length !== 0 && (
            <AdsBannerSlider items={4} data={bannerList2Data} />
          )}
        </div>
      </section>

      <section className="py-6 pt-0 mt-10 bg-white">
        <div className="container">
          <div className="w-full rounded-2xl overflow-hidden shadow-md">
            {productsBanners?.length > 0 && (
              <HomeBannerV2 data={productsBanners} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
