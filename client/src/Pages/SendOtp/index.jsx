import React, { useContext, useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router-dom";

import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const SendOtp = () => {
  const context = useContext(MyContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async (e) => {
    e.preventDefault();

    if (email === "") {
      context.alertBox("error", "Please enter email");
      return;
    }

    setIsLoading(true);

    try {
      const res = await postData("/api/user/forgot-password", { email });

      if (res?.error === false) {
        localStorage.setItem("userEmail", email);

        localStorage.setItem("actionType", "forgot-password");

        context.alertBox("success", res?.message);

        navigate("/verify");
      } else {
        context.alertBox("error", res?.message);
      }
    } catch (error) {
      context.alertBox("error", "Something went wrong");
    }

    setIsLoading(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9] flex items-center justify-center px-4">
      <div className="w-full max-w-[450px] bg-white rounded-[30px] shadow-2xl border border-[rgba(0,0,0,0.05)] p-8 md:p-10">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-[90px] h-[90px] rounded-full bg-blue-50 mx-auto flex items-center justify-center mb-5">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
              alt=""
              className="w-[45px]"
            />
          </div>

          <h2 className="text-[30px] font-[800] text-gray-800">
            Forgot Password?
          </h2>

          <p className="text-gray-500 text-[15px] mt-2">
            Enter your email to receive OTP
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={sendOTP}>
          <div className="mb-6">
            <h4 className="text-[14px] font-[600] mb-2 text-gray-700">
              Email Address
            </h4>

            <TextField
              type="email"
              placeholder="Enter your email"
              variant="outlined"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="!h-[54px] !rounded-xl !bg-blue-600 hover:!bg-blue-700 !text-white !font-[700] !text-[16px] !capitalize !shadow-lg !w-full"
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              "Send OTP"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SendOtp;
