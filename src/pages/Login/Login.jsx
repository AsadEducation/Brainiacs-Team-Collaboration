import { useForm } from "react-hook-form";
import facebook from "../../assets/icons/facebook.svg";
import google from "../../assets/icons/google.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import user from "../../assets/icons/user.svg";
import email from "../../assets/icons/email.svg";
import password from "../../assets/icons/password.svg";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/brainiacs logo.png";
import GoogleButton from "../SignUp/GoogleButton";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { logInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await logInUser(email, password);
      console.log("success", res);
      Swal.fire("Successfully Logged In").then(() => {
        navigate("/dashboard"); // Redirect to dashboard page after alert
      });
    } catch (err) {
      console.error("Login error:", err);
      let errorMessage = "Login failed. Please check your credentials and try again.";
      if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email format. Please enter a valid email.";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "No user found with this email. Please sign up first.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      }
      Swal.fire(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center px-5 py-5 pt-20 text-white min-h-screen bg-[#F0F4F3] ">
      <div className="rounded-4xl shadow-2xl w-full overflow-hidden max-w-lg md:max-w-7xl bg-white  scale-75 ">
        {/* <div className="hidden md:block relative top-0 ">
          <img className="w-32" src={logo} alt="" />
        </div> */}
        <div className="flex flex-col-reverse md:flex-row-reverse w-full ">
          {/* toggle functionality side */}
          <div className="flex flex-col justify-center items-center md:w-1/3 py-10 px-10 text-center bg-secondary">
            <h2 className=" text-white text-2xl md:text-4xl mb-4 font-bold">
              Hello, Friend!
            </h2>
            <p className="text-white text-lg md:text-xl mb-8">
              Enter your personal details and start journey with us</p>
            <Link to="/signup" className="text-lg text-white border-2 rounded-full py-1 md:py-3 px-10 md:px-14  hover:bg-accent ">
              Register
            </Link>
          </div>
          {/* login side */}
          <div className="text-black flex flex-col items-center justify-center gap-5 w-full md:w-2/3 py-10 px-10">
            <div>
              <h1 className="text-2xl md:text-4xl text-secondary font-medium text-center mb-6">
                Log in to Brainiacs
              </h1>
              <div className="flex items-center justify-center gap-4 mb-8">
                <button className="p-2 border border-gray-300 rounded-full cursor-pointer">
                  <img className="w-7 md:w-10" src={facebook} alt="" />
                </button>
                <GoogleButton></GoogleButton>
                <button className="p-3 border border-gray-300 rounded-full cursor-pointer">
                  <img className="w-5 md:w-8" src={linkedin} alt="" />
                </button>
              </div>
              <p className="text-center">or use your email for registration</p>
            </div>


            {/* Login form  */}
            <form
              className="flex flex-col items-center justify-center gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* email input  */}
              <div className="relative w-full">
                <img
                  src={email}
                  alt="email icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                />
                <input
                  type="email"
                  id="email"
                  className="w-full lg:w-lg p-5 pl-12 mt-2 bg-gray-200 rounded-lg focus:outline-none text-xl"
                  placeholder="Enter email"
                  {...register("email")}
                />
              </div>

              {/* password input  */}
              <div className="relative w-full">
                <img
                  src={password}
                  alt="password icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                />
                <input
                  type="password"
                  id="password"
                  className="w-full lg:w-lg p-5 pl-12 mt-2 bg-gray-200 rounded-lg focus:outline-none text-xl"
                  placeholder="Enter password"
                  {...register("password")}
                />
              </div>
              <Link to="/forgot-password">Forgot your password?</Link>
              {/* <p>Don't have an account, <Link className="text-secondary" to="/signup">Sign Up</Link></p> */}
              <button
                type="submit"
                className="mx-auto w-2xs text-xl text-white bg-secondary cursor-pointer hover:bg-accent py-4 px-16 mt-5 rounded-full focus:outline-none"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
