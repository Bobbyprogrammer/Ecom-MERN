import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (formFields.name === "") {
        context.alertBox("error", "Please enter full name");
        return false;
      }

      if (formFields.email === "") {
        context.alertBox("error", "Please enter email id");
        return false;
      }

      if (formFields.password === "") {
        context.alertBox("error", "Please enter password");
        return false;
      }
      if (formFields.password.length < 6) {
        context.alertBox("error", "Password requires minimum 6 characterd");
        return false;
      }

      postData("/api/user/register", formFields).then((res) => {
        if (res?.error !== true) {
          setIsLoading(false);
          context.alertBox("success", res?.message);
          localStorage.setItem("userEmail", formFields.email);
          localStorage.setItem("actionType", "register");
          setFormFields({
            name: "",
            email: "",
            password: "",
          });
          navigate("/verify");
        } else {
          context.alertBox("error", res?.message);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9] flex items-center justify-center px-4 pb-44">
      <div className="w-full max-w-[500px] bg-white rounded-[30px] shadow-2xl border border-[rgba(0,0,0,0.05)] p-8 md:p-10">
        {/* HEADING */}
        <div className="text-center mb-8">
          <h2 className="text-[30px] font-[800] text-gray-800 leading-tight">
            Create Account
          </h2>

          <p className="text-gray-500 text-[15px] mt-2">
            Join us and start your shopping journey
          </p>
        </div>

        {/* FORM */}
        <form className="w-full" onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div className="form-group w-full mb-5">
            <h4 className="text-[14px] font-[600] mb-2 text-gray-700">
              Full Name
            </h4>

            <TextField
              type="text"
              id="name"
              name="name"
              value={formFields.name}
              disabled={isLoading}
              placeholder="Enter your full name"
              variant="outlined"
              className="w-full"
              onChange={onChangeInput}
            />
          </div>

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
          <div className="form-group w-full mb-5 relative">
            <h4 className="text-[14px] font-[600] mb-2 text-gray-700">
              Password
            </h4>

            <TextField
              type={isPasswordShow ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Create strong password"
              variant="outlined"
              className="w-full"
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

          {/* REGISTER BUTTON */}
          <Button
            type="submit"
            disabled={isLoading || !valideValue}
            className="!h-[54px] !rounded-xl !bg-blue-600 hover:!bg-blue-700 !text-white !font-[700] !text-[16px] !capitalize !shadow-lg !w-full"
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              "Create Account"
            )}
          </Button>

          {/* LOGIN LINK */}
          <p className="text-center text-[14px] text-gray-500 mt-8">
            Already have an account?
            <Link
              className="text-blue-600 font-[700] ml-1 hover:underline"
              to="/login"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
