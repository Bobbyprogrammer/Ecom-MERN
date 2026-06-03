import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const [formFields, setFormsFields] = useState({
    email: "",
    password: "",
  });

  const context = useContext(MyContext);

  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("accessToken");

    if (token !== undefined && token !== null && token !== "") {
      history("/");
    }
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

    postData("/api/user/login", formFields, {
      withCredentials: true,
    }).then((res) => {
      if (res?.error !== true) {
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
    <section className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9] flex items-center justify-center px-4 pb-44">
      <div className="w-full max-w-[450px] bg-white rounded-[30px] shadow-2xl border border-[rgba(0,0,0,0.05)] p-8 md:p-10">
        {/* HEADING */}
        <div className="text-center mb-8">
          <h2 className="text-[30px] font-[800] text-gray-800 leading-tight">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 text-[15px] mt-2">
            Login to continue shopping with us
          </p>
        </div>

        {/* FORM */}
        <form className="w-full" onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="form-group w-full mb-5">
            <h4 className="text-[14px] font-[600] mb-2 text-gray-700">
              Email Address
            </h4>

            <TextField
              type="email"
              id="email"
              name="email"
              value={formFields.email}
              disabled={isLoading}
              placeholder="Enter your email"
              variant="outlined"
              className="w-full"
              onChange={onChangeInput}
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group w-full mb-3 relative">
            <h4 className="text-[14px] font-[600] mb-2 text-gray-700">
              Password
            </h4>

            <TextField
              type={isPasswordShow ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              variant="outlined"
              className="w-full"
              name="password"
              value={formFields.password}
              disabled={isLoading}
              onChange={onChangeInput}
            />

            <Button
              className="!absolute top-[38px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-gray-500"
              onClick={() => {
                setIsPasswordShow(!isPasswordShow);
              }}
            >
              {isPasswordShow ? (
                <IoMdEyeOff className="text-[20px]" />
              ) : (
                <IoMdEye className="text-[20px]" />
              )}
            </Button>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end mb-6">
            <Link
              to="/send-otp"
              className="text-[14px] font-[600] text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            disabled={!valideValue || isLoading}
            className="!h-[54px] !rounded-xl !bg-blue-600 hover:!bg-blue-700 !text-white !font-[700] !text-[16px] !capitalize !shadow-lg !w-full"
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              "Sign In"
            )}
          </Button>

          {/* SIGNUP */}
          <p className="text-center text-[14px] text-gray-500 mt-8">
            Don’t have an account?
            <Link
              to="/register"
              className="text-blue-600 font-[700] ml-1 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
