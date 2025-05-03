import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { Link } from "react-router";
import logo from "../../../assets/brainiacs logo.png";

const Footer = () => {
  return (
    <footer className="border-gray-300 border-t mb-5 pt-5 bg-gray-50">
      <div className="footer flex  sm:flex-row max-w-7xl mx-auto text-black items-center sm:items-start justify-between p-6 sm:p-8 ">
        {/* Left Section: Logo and Copyright */}
        <div className="flex flex-col items-start  sm:text-left">
          <Link to="/" className="text-3xl font-bold leading-none">
            <img className="w-28 sm:w-32 md:w-40" src={logo} alt="Brainiacs" />
          </Link>
          <p className="ml-2 text-xs md:text-sm text-gray-600 whitespace-nowrap">
            © {new Date().getFullYear()} - All rights reserved.
          </p>
        </div>

        {/* Right Section: Navigation and Social Links */}
        <div className="flex flex-col-reverse md:flex-col items-center md:items-end ">
          <div className="flex items-center justify-center space-x-4">
            <Link
              className="bg-white text-[#1877F2] text-xs sm:text-lg p-2 sm:p-3 rounded-full shadow-md hover:shadow-lg transition duration-300"
              title="Facebook"
            >
              <FaFacebookF />
            </Link>
            <Link
              className="bg-white text-[#0077B5] text-xs sm:text-lg p-2 sm:p-3 rounded-full shadow-md hover:shadow-lg transition duration-300"
              title="LinkedIn"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              className="bg-white text-[#1DA1F2] text-xs sm:text-lg p-2 sm:p-3 rounded-full shadow-md hover:shadow-lg transition duration-300"
              title="Twitter"
            >
              <IoLogoTwitter />
            </Link>
          </div>

          <nav className="text-xs md:text-sm flex gap-2 font-semibold text-center sm:text-right">
            <Link
              to="/about"
              className="hover:text-accent cursor-pointer transition duration-300 whitespace-nowrap"
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="hover:text-accent cursor-pointer transition duration-300"
            >
              Services
            </Link>
            <Link
              to="/pricing"
              className="hover:text-accent cursor-pointer transition duration-300"
            >
              Pricing
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
