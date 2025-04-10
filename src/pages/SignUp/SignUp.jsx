import { useForm } from "react-hook-form";
import facebook from "../../assets/icons/facebook.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import user from "../../assets/icons/user.svg";
import email from "../../assets/icons/email.svg";
import password from "../../assets/icons/password.svg";
import logo from "../../assets/brainiacs logo.png";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import GoogleButton from "./GoogleButton";
import Swal from "sweetalert2";
const SignUp = () => {
  const navigate=useNavigate()
  const { signUpUser } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { userName, email, password } = data;
    const newUser = { name: userName, email, role: "user" }; // Include role
    try {
      const res = await signUpUser(email, password);
      console.log("Signup Success:", res.user); // Log signup success data

      // Save user to the database
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to the database");
      }

      const result = await response.json();
      console.log("User Added to DB:", result); // Log database response
      Swal.fire(`Welcome ${userName} to Brainiacs`).then(() => {
        navigate("/"); // Redirect to home page after alert
      });
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Signup failed. Please check your details and try again.");
    }
  };

  // TODO: Make facebook and linkedin signup functionality

  return (
    <div className="flex items-center justify-center px-5 py-5 pt-20 text-white min-h-screen bg-[#F0F4F3] ">
      <div className="rounded-4xl shadow-2xl w-full overflow-hidden max-w-lg md:max-w-7xl bg-white  scale-75 ">
        {/* <div className="hidden md:block absolute top-10">
          <img className="w-32" src={logo} alt="" />
        </div> */}
        <div className="flex flex-col-reverse md:flex-row w-full ">

          {/* toggle functionality side */}
          <div className="flex flex-col justify-center items-center md:w-1/3 py-10 px-10 text-center bg-secondary">
            <h2 className="text-white text-2xl md:text-4xl mb-4 font-bold">
              Welcome Back!
            </h2>
            <p className="text-white text-lg md:text-xl mb-8">
              To keep connected with us please login with your personal info
            </p>
            <Link to="/login" className="text-lg text-white border-2 rounded-full py-1 md:py-3 px-10 md:px-14  hover:bg-accent ">
              Login
            </Link>
          </div>
          {/* signup side */}
          <div className="text-black flex flex-col items-center justify-center gap-5 w-full md:w-2/3 py-10 px-10">
            <div>
              <h1 className="text-2xl md:text-4xl text-secondary font-medium text-center mb-6">
                Create an account
              </h1>
              <div className="flex items-center justify-center gap-4 mb-8">
                <button className="p-2 border border-gray-300 rounded-full cursor-pointer">
                  <img className="w-7 md:w-10" src={facebook} alt="" />
                </button>
                {/* Google button  */}
                <GoogleButton></GoogleButton>
                <button className="p-3 border border-gray-300 rounded-full cursor-pointer">
                  <img className="w-5 md:w-8" src={linkedin} alt="" />
                </button>
              </div>
              <p className="text-center">or use your email for registration</p>
            </div>

            {/* Registration form  */}
            <form
              className="flex flex-col items-center justify-center gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* username input  */}
              <div className="relative w-full">
                <img
                  src={user}
                  alt="user icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                />
                <input
                  type="text"
                  id="username"
                  className="w-full lg:w-lg p-5 pl-12 mt-2 bg-gray-200 rounded-lg focus:outline-none text-xl"
                  placeholder="Enter username"
                  {...register("userName")}
                />
              </div>

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
                  {...register("password", {
                    required: true, pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
                  })}
                />
                <br />
              </div>
                {/* error message  */}
                {errors.password && <div className="w-96">
                  <span className="text-red-600 mt-2 ">Password should contain at least one special character,one uppercase,one lowercase,one number and 6 characters</span>
                  </div>}

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
