import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import LoadingButton from "@mui/lab/LoadingButton";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useContext } from "react";
import { MyContext } from "../../App.jsx";

import { useEffect } from "react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isPasswordShow, setisPasswordShow] = useState(false);

  const [formFields, setFormsFields] = useState({
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    fetchDataFromApi("/api/logo").then((res) => {
      localStorage.setItem("logo", res?.logo[0]?.logo);
    });
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(formFields).every((el) => el);

  const forgotPassword = () => {
    if (formFields.email === "") {
      context.alertBox("error", "Please enter email id");
      return false;
    } else {
      context.alertBox("success", `OTP send to ${formFields.email}`);
      localStorage.setItem("userEmail", formFields.email);
      localStorage.setItem("actionType", "forgot-password");

      postData("/api/user/forgot-password", {
        email: formFields.email,
      }).then((res) => {
        if (res?.error === false) {
          context.alertBox("success", res?.message);
          history("/verify-account");
        } else {
          context.alertBox("error", res?.message);
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.email === "") {
      context.alertBox("error", "Please enter email id");
      setIsLoading(false);
      return false;
    }

    if (formFields.password === "") {
      context.alertBox("error", "Please enter password");
      setIsLoading(false);
      return false;
    }

    postData("/api/user/login", formFields).then((res) => {
      if (res?.error !== true) {
        // CHECK ROLE
        if (res?.data?.role !== "ADMIN") {
          context.alertBox("error", "Access denied. Admin only!");
          setIsLoading(false);
          return;
        }

        setIsLoading(false);

        context.alertBox("success", res?.message);

        setFormsFields({
          email: "",
          password: "",
        });

        localStorage.setItem("accessToken", res?.data?.accesstoken);
        localStorage.setItem("refreshToken", res?.data?.refreshToken);

        context.setIsLogin(true);

        history("/");
      } else {
        context.alertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <section className="bg-white w-full">
      <header className="w-full fixed top-0 left-0 px-6 py-4 flex items-center justify-center z-50 backdrop-blur-md bg-white/80 border-b border-[rgba(0,0,0,0.06)]">
        <Link to="/" className="flex items-center justify-center">
          <img
            src={localStorage.getItem("logo")}
            alt="logo"
            className="h-[55px] w-auto object-contain"
          />
        </Link>
      </header>
      <img src="/patern.webp" className="w-full fixed top-0 left-0 opacity-5" />

      <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-br from-[#f8fafc] to-[#eef2ff]">
        <div className="loginBox w-full md:w-[500px] bg-white rounded-3xl shadow-2xl border border-[rgba(0,0,0,0.05)] p-8 md:p-10 relative z-50">
          <div className="text-center mb-6">
            <div className="w-[80px] h-[80px] rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <img src="/icon.svg" className="w-[40px]" />
            </div>

            <h1 className="text-[28px] md:text-[34px] font-[800] text-gray-800 leading-tight">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 text-[15px] mt-2">
              Login to access your dashboard
            </p>
          </div>

          <form className="w-full mt-6" onSubmit={handleSubmit}>
            <div className="form-group mb-5 w-full">
              <h4 className="text-[14px] font-[600] mb-2 text-gray-700">
                Email Address
              </h4>

              <input
                type="email"
                className="w-full h-[54px] border border-[rgba(0,0,0,0.12)] rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none px-4 transition-all"
                name="email"
                value={formFields.email}
                disabled={isLoading}
                onChange={onChangeInput}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group mb-3 w-full">
              <h4 className="text-[14px] font-[600] mb-2 text-gray-700">
                Password
              </h4>

              <div className="relative w-full">
                <input
                  type={isPasswordShow ? "text" : "password"}
                  className="w-full h-[54px] border border-[rgba(0,0,0,0.12)] rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none px-4 transition-all"
                  name="password"
                  value={formFields.password}
                  disabled={isLoading}
                  onChange={onChangeInput}
                  placeholder="Enter your password"
                />

                <Button
                  className="!absolute top-[9px] right-[10px] z-50 !rounded-full !w-[36px] !h-[36px] !min-w-[36px] !text-gray-500"
                  onClick={() => setisPasswordShow(!isPasswordShow)}
                >
                  {isPasswordShow ? (
                    <FaEyeSlash className="text-[18px]" />
                  ) : (
                    <FaRegEye className="text-[18px]" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!valideValue}
              className="!h-[54px] !rounded-xl btn-blue !w-full !text-[16px] !font-[700]"
            >
              {isLoading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
