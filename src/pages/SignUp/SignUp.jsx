import { useForm } from "react-hook-form";
import facebook from "../../assets/icons/facebook.svg";
import google from "../../assets/icons/google.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import user from "../../assets/icons/user.svg";
import email from "../../assets/icons/email.svg";
import password from "../../assets/icons/password.svg";
import logo from "../../assets/brainiacs logo.png";
import { Link } from "react-router";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center px-5 py-5 text-white min-h-screen scale-75">
      <div className="rounded-4xl shadow-2xl w-full overflow-hidden max-w-lg md:max-w-7xl bg-white pb-48 md:pb-0 ">
        {/* <div className="hidden md:block absolute top-10">
          <img className="w-32" src={logo} alt="" />
        </div> */}
        <div className="md:flex w-full h-[95vh]">
          {/* Left side */}
          <div className="flex flex-col justify-center items-center md:w-1/3 py-10 px-10 text-center bg-secondary">
            <h2 className="text-white text-2xl md:text-4xl mb-4 font-bold">
              Welcome Back!
            </h2>
            <p className="text-white text-lg md:text-xl mb-8">
              To keep connected with us please login with your personal info
            </p>
            <button className="text-lg text-white border-2 rounded-full py-1 md:py-3 px-10 md:px-14">
              Sign Up
            </button>
          </div>
          {/* right side */}
          <div className="text-black flex flex-col items-center justify-center gap-10 w-full md:w-2/3 py-10 px-10">
            <div>
              <h1 className="text-2xl md:text-4xl text-secondary font-medium text-center mb-6">
                Create an account
              </h1>
              <div className="flex items-center justify-center gap-4 mb-8">
                <button className="p-2 border border-gray-300 rounded-full cursor-pointer">
                  <img className="w-7 md:w-10" src={facebook} alt="" />
                </button>
                <button className="p-2 border border-gray-300 rounded-full cursor-pointer">
                  <img className="w-7 md:w-10" src={google} alt="" />
                </button>
                <button className="p-3 border border-gray-300 rounded-full cursor-pointer">
                  <img className="w-5 md:w-8" src={linkedin} alt="" />
                </button>
              </div>
              <p className="text-center">or use your email for registration</p>
            </div>

            <form
              className="flex flex-col items-center justify-center gap-4"
              action="#"
              method="POST"
            >
              <div className="relative w-full">
                <img
                  src={user}
                  alt="user icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                />
                <input
                  type="text"
                  id="username"
                  className="w-full lg:w-lg p-5 pl-12 mt-2 bg-gray-200 rounded-lg focus:outline-none"
                  placeholder="Enter username"
                />
              </div>

              <div className="relative w-full">
                <img
                  src={email}
                  alt="email icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                />
                <input
                  type="email"
                  id="email"
                  className="w-full lg:w-lg p-5 pl-12 mt-2 bg-gray-200 rounded-lg focus:outline-none"
                  placeholder="Enter email"
                />
              </div>

              <div className="relative w-full">
                <img
                  src={password}
                  alt="password icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                />
                <input
                  type="password"
                  id="password"
                  className="w-full lg:w-lg p-5 pl-12 mt-2 bg-gray-200 rounded-lg focus:outline-none"
                  placeholder="Enter password"
                />
              </div>
              <p>
                Already have an account,{" "}
                <Link className="text-secondary" to="/login">
                  Log in
                </Link>
              </p>
              <button
                type="submit"
                className="mx-auto w-2xs text-xl text-white bg-secondary cursor-pointer hover:bg-accent py-4 px-16 mt-5 rounded-full focus:outline-none"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
