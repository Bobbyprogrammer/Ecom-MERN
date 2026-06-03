import React, { useContext } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

import { FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import Button from "@mui/material/Button";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#fafafa] pt-4 lg:pt-8 mt-10">
      <div className="container">
        {/* TOP FEATURES */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 py-8 border-b border-[rgba(0,0,0,0.08)]">
          {/* ITEM */}
          <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl p-6 shadow-sm border border-[rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group">
            <LiaShippingFastSolid className="text-[42px] text-[#222] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />

            <h3 className="text-[17px] font-[700] mt-4">Free Shipping</h3>

            <p className="text-[13px] text-gray-500 mt-2">
              For all Orders Over $100
            </p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl p-6 shadow-sm border border-[rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group">
            <PiKeyReturnLight className="text-[42px] text-[#222] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />

            <h3 className="text-[17px] font-[700] mt-4">30 Days Returns</h3>

            <p className="text-[13px] text-gray-500 mt-2">
              For an Exchange Product
            </p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl p-6 shadow-sm border border-[rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group">
            <BsWallet2 className="text-[42px] text-[#222] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />

            <h3 className="text-[17px] font-[700] mt-4">Secure Payment</h3>

            <p className="text-[13px] text-gray-500 mt-2">
              Payment Cards Accepted
            </p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl p-6 shadow-sm border border-[rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group">
            <LiaGiftSolid className="text-[42px] text-[#222] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />

            <h3 className="text-[17px] font-[700] mt-4">Special Gifts</h3>

            <p className="text-[13px] text-gray-500 mt-2">
              Our First Product Order
            </p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl p-6 shadow-sm border border-[rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group">
            <BiSupport className="text-[42px] text-[#222] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />

            <h3 className="text-[17px] font-[700] mt-4">Support 24/7</h3>

            <p className="text-[13px] text-gray-500 mt-2">Contact us Anytime</p>
          </div>
        </div>

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-14 py-12">
          {/* CONTACT CARD */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-[rgba(0,0,0,0.06)] h-fit">
            <div className="mb-6">
              <img
                src={localStorage.getItem("logo")}
                alt="logo"
                className="h-[55px] object-contain"
              />
            </div>

            <p className="text-[15px] text-gray-600 leading-8">
              Office - 1105, 11th Floor, Adatiya Complex, Bombay Market,
              Umarwada, Surat 395010, Gujarat, India.
            </p>

            <div className="mt-5">
              <Link
                className="block text-[15px] text-gray-700 hover:text-primary transition-all mb-3"
                to="mailto:support@sareewave.com"
              >
                support@sareewave.com
              </Link>

              <Link
                className="block text-[28px] font-[700] text-primary"
                to="tel:+919925111990"
              >
                +91 9925111990
              </Link>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-3 mt-6">
              <Button className="!min-w-[42px] !w-[42px] !h-[42px] !rounded-full !bg-[#f5f5f5] hover:!bg-primary hover:!text-white transition-all">
                <FaFacebookF />
              </Button>

              <Button className="!min-w-[42px] !w-[42px] !h-[42px] !rounded-full !bg-[#f5f5f5] hover:!bg-primary hover:!text-white transition-all">
                <FaInstagram />
              </Button>

              <Button className="!min-w-[42px] !w-[42px] !h-[42px] !rounded-full !bg-[#f5f5f5] hover:!bg-primary hover:!text-white transition-all">
                <FaPinterestP />
              </Button>

              <Button className="!min-w-[42px] !w-[42px] !h-[42px] !rounded-full !bg-[#f5f5f5] hover:!bg-primary hover:!text-white transition-all">
                <AiOutlineYoutube />
              </Button>
            </div>
          </div>

          {/* INFORMATION */}
          <div className="lg:pt-4">
            <h3 className="text-[18px] font-[700] uppercase tracking-[3px] text-[#111] mb-7">
              Information
            </h3>

            <ul className="space-y-5">
              <li>
                <p
                  onClick={() => {
                    navigate("/about");

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className=" cursor-pointer text-[15px] text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  About Us
                </p>
              </li>

              <li>
                <p
                  onClick={() => {
                    navigate("/contact");

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className=" cursor-pointer text-[15px] text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Contact Us
                </p>
              </li>

              <li>
                <Link className="text-[15px] text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* POLICIES */}
          <div className="lg:pt-4">
            <h3 className="text-[18px] font-[700] uppercase tracking-[3px] text-[#111] mb-7">
              Policies
            </h3>

            <ul className="space-y-5">
              <li>
                <Link
                  to="/return-exchange"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="text-[15px] text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Returns & Exchanges
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="text-[15px] text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Shipping & Delivery
                </Link>
              </li>

              <li>
                <Link
                  to="/terms-conditions"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="text-[15px] text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="text-[15px] text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* BUYERS */}
          <div className="lg:pt-4">
            <h3 className="text-[18px] font-[700] uppercase tracking-[3px] text-[#111] mb-7">
              Buyer's
            </h3>

            <ul className="space-y-5">
              <li>
                <Link
                  to="/my-orders"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="text-[15px] text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  My Orders
                </Link>
              </li>

              <li>
                <Link
                  to="/my-list"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="text-[15px] text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-[rgba(0,0,0,0.08)] py-5 text-center">
          <p className="text-[15px] text-gray-600">
            © 2026 Sareewave | All Rights are reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
