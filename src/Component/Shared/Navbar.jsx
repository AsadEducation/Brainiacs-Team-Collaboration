import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import logo from "../../assets/brainiacs logo.png";
import close from "../../assets/icons/close.svg";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import userimage from "../../assets/icons/user.svg";
import { MdOutlineLogout } from "react-icons/md";
import { FaBars, FaChartBar } from "react-icons/fa";

const Navbar = () => {
  const { currentUser, signOutUser } = useAuth(); // Use currentUser instead of user
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let lastScrollY = window.scrollY;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    lastScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then((res) => {
            console.log("Success", res);
            Swal.fire(
              "Logged Out!",
              "You have been logged out successfully.",
              "success"
            );
          })
          .catch((err) => {
            console.log("Error", err);
            Swal.fire(
              "Error!",
              "Something went wrong. Please try again.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div>
      {/* Desktop and Tablet Navbar */}
      <motion.nav
        className="min-w-[90%] fixed top-2 left-1/2 transform -translate-x-1/2 p-1 md:p-4 flex justify-between items-center rounded-full z-50 bg-white"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <Link to="/" className="text-3xl font-bold leading-none">
          <img className="w-32 md:w-40" src={logo} alt="Brainiacs" />
        </Link>
        <div className="lg:hidden ml-auto">
          <button
            className=" navbar-burger flex items-center p-3"
            onClick={toggleMenu}
          >
            <FaBars className="text-xl" />
          </button>
        </div>
        <ul className="mx-auto hidden lg:flex lg:items-center lg:space-x-6">
          <li>
            <Link to="/" className="text-sm hover:text-accent cursor-pointer">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-sm hover:text-accent cursor-pointer"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="text-sm hover:text-accent cursor-pointer"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className="text-sm hover:text-accent cursor-pointer"
            >
              Pricing
            </Link>
          </li>
          {/* <li>
            <Link
              to="/contact"
              className="text-sm hover:text-accent cursor-pointer"
            >
              Contact
            </Link>
          </li> */}
          {currentUser && (
            <li>
              <Link
                to="/dashboard"
                className="text-sm hover:text-accent cursor-pointer"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
        {currentUser ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 text-2xl text-secondary cursor-pointer"
            >
              <img
                className="w-10 h-10 rounded-full"
                src={currentUser.photoURL || userimage}
                alt="User"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-14 w-48 bg-white rounded-lg shadow-lg dropdown">
                <div className="flex flex-col justify-center px-4 py-2 text-sm text-gray-700">
                  <Link to="/dashboard/myProfile">
                    <p>{currentUser.displayName}</p>
                    <p className="text-xs">{currentUser.email}</p>
                  </Link>
                </div>
                <Link
                  to="/dashboard/boards"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 text-sm font-bold rounded-xl transition duration-200 bg-secondary hover:bg-accent text-white"
          >
            Log In
          </Link>
        )}
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="fixed top-0 left-0 right-0 bottom-0 flex flex-col w-full max-w-xs py-6 px-6 bg-white border-r overflow-y-auto z-50"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-8">
              <Link
                to="/"
                className="mr-auto text-3xl font-bold leading-none text-primary"
              >
                <img className="w-32" src={logo} alt="Brainiacs" />
              </Link>
              <button
                className="navbar-close text-primary cursor-pointer"
                onClick={toggleMenu}
              >
                <img className="w-8" src={close || X} alt="Close" />
              </button>
            </div>
            <ul>
              <li className="mb-1">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded"
                >
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to="/services"
                  onClick={() => setIsOpen(false)}
                  className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded"
                >
                  Services
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded"
                >
                  Pricing
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
            <div className="mt-auto">
              <div className="pt-6">
                {currentUser ? (
                  <Link to="/dashboard/myProfile" className="flex items-center mb-4">
                    <img
                      className="w-10 h-10 rounded-full mr-3"
                      src={currentUser.photoURL || userimage}
                      alt="User"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        {currentUser.displayName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {currentUser.email}
                      </span>
                    </div>
                    <button
                      onClick={handleLogOut}
                      className="ml-auto text-sm font-semibold text-secondary hover:text-accent cursor-pointer"
                    >
                      <MdOutlineLogout className="text-4xl" />
                    </button>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-secondary hover:bg-accent text-white rounded-xl cursor-pointer"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
