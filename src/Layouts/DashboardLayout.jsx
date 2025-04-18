import React, { useState } from "react";
import { FaHome, FaImage } from "react-icons/fa";
import { LuFileUp } from "react-icons/lu";
import { RiMenu2Line } from "react-icons/ri";
import { Link, Outlet } from "react-router-dom";
import ChatBox from "../Component/Shared/ChatBox/ChatBox";
import { RxActivityLog } from "react-icons/rx";
import { MdLeaderboard } from "react-icons/md";

import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import useAuth from "../Hooks/useAuth"; // Import useAuth
import {
  FaTachometerAlt,
  FaSearch,
  FaComments,
  FaClipboardList,
  FaHeart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { currentUser } = useAuth(); // Get current user data

  return (
    <div>
      <div className={`drawer ${isDrawerOpen && "drawer-open"}`}>
        {/* <div className="drawer lg:drawer-open"> */}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-[#F6F4F0] z-10 relative">
          {/* Page content here */}
          <label
            onClick={() =>
              setIsDrawerOpen((prev) => {
                return !prev;
              })
            }
            role="button"
            className={`btn bg-[#3F5E82] fixed top-0 drawer-button rounded-none text-white transition-all duration--3500 border-none shadow-none ${
              isDrawerOpen ? "left-56 px-0" : "left-0 px-0"
            } `}
          >
            {isDrawerOpen ? (
              <>
                <IoIosArrowBack />
              </>
            ) : (
              <IoIosArrowForward />
            )}
          </label>
          {/* <label htmlFor="my-drawer-2" role="button" className="btn bg-primary fixed bottom-3 right-3 drawer-button rounded-none text-white lg:hidden z-50">
            <RiMenu2Line className="text-2xl"></RiMenu2Line>
          </label> */}
          <div className="flex">
            {/* <div
              className={`w-3 h-screen custom-gradient-side-bar shadow-none ${
                isDrawerOpen && "hidden"
              }`}
            ></div> */}
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="h-full p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex items-center p-2 space-x-4">
              <img
                src={currentUser?.photoURL}
                alt={currentUser?.name}
                className="w-12 h-12 rounded-full dark:bg-gray-500"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {currentUser?.name || "Unknown User"}
                </h2>
                <span className="flex items-center space-x-1">
                  <Link
                    to="myProfile"
                    className="text-xs hover:underline dark:text-gray-600"
                  >
                    View profile
                  </Link>
                </span>
              </div>
            </div>
            <div className="divide-y dark:divide-gray-300">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="dark:bg-gray-100 dark:text-gray-900">
                  <Link
                    to="/"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <FaHome className="w-5 h-5" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="boards"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <FaClipboardList className="w-5 h-5" />
                    <span>Boards</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="messenger"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <FaComments className="w-5 h-5" />
                    <span>Messenger</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="activity-log"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <RxActivityLog className="w-5 h-5" />
                    <span>Activity Log</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="leaderBoard"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <MdLeaderboard className="w-5 h-5" />
                    <span>LeaderBoard</span>
                  </Link>
                </li>
              </ul>
              <ul className="pt-4 pb-2 space-y-1 text-sm">
                <li>
                  <Link
                    to="/settings"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <FaCog className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <FaSignOutAlt className="w-5 h-5" />
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
