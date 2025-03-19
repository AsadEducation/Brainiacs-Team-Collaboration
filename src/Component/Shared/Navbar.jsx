import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import logo from "../../assets/brainiacs logo.png";
import close from "../../assets/icons/close.svg";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = window.scrollY;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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


  const handleLogOut = () => {
    signOutUser()
      .then(res => {
        console.log("Success", res)
        Swal.fire("Logged Out Successfully")
      })
      .catch(err => console.log("error", err))
  }

  return (
    <div>
      {/* Desktop Navbar */}
      <motion.nav
        className="min-w-[95%] fixed top-2 left-1/2 transform -translate-x-1/2 px-4 py-4 flex justify-between items-center rounded-full z-50 bg-white"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <Link to="/" className="text-3xl font-bold leading-none">
          <img className="w-40" src={logo} alt="Brainiacs" />
        </Link>
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center p-3"
            onClick={toggleMenu}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden  relative lg:left-20 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <Link to="/" className="text-sm hover:text-accent cursor-pointer">Home</Link>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <a className="text-sm hover:text-accent cursor-pointer">About Us</a>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <a className="text-sm hover:text-accent cursor-pointer">Services</a>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <a className="text-sm hover:text-accent cursor-pointer">Pricing</a>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <a className="text-sm hover:text-accent cursor-pointer">Contact</a>
          </li>
        </ul>
        {
          user ?
            <Link
              onClick={handleLogOut}
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 text-sm font-bold rounded-xl transition duration-200 bg-secondary hover:bg-accent text-white"
            >
              Log Out
            </Link>
            :
            <Link
              to="/login"
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 text-sm font-bold rounded-xl transition duration-200 bg-secondary hover:bg-accent text-white"
            >
              Log In
            </Link>
        }
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="md:hidden fixed top-0 left-0 right-0 bottom-0 flex flex-col w-full max-w-xs py-6 px-6 bg-white border-r overflow-y-auto z-50"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-8">
              <Link to="/" className="mr-auto text-3xl font-bold leading-none text-primary">
                <img className="w-40" src={logo} alt="Brainiacs" />
              </Link>
              <button
                className="navbar-close text-primary"
                onClick={toggleMenu}
              >
                <img className="w-8" src={close || X} alt="X" />
              </button>
            </div>
            <ul>
              <li className="mb-1">
                <Link to="/" className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded">
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/about" className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded">
                  About Us
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/services" className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded">
                  Services
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/pricing" className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded">
                  Pricing
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/contact" className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-auto">
              <div className="pt-6">
                {
                  user ?
                    <Link
                      onClick={handleLogOut}
                      className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-secondary hover:bg-accent text-white rounded-xl cursor-pointer"
                    >
                      Log Out
                    </Link>
                    :
                    <Link
                      to="/login"
                      className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-secondary hover:bg-accent text-white rounded-xl cursor-pointer"
                    >
                      Log in
                    </Link>
                }

              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
