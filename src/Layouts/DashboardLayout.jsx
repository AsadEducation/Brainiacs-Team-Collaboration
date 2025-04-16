import React, { useState } from 'react'
import { FaImage } from 'react-icons/fa'
import { LuFileUp } from 'react-icons/lu'
import { RiMenu2Line } from 'react-icons/ri'
import { Link, Outlet } from 'react-router-dom'
import ChatBox from '../Component/Shared/ChatBox/ChatBox'
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io'

const DashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  return (
    <div>
      <div className={`drawer ${isDrawerOpen && "drawer-open"}`} >
        {/* <div className="drawer lg:drawer-open"> */}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-[#F6F4F0] relative">

          {/* Page content here */}
          <label onClick={() => setIsDrawerOpen(prev => { return !prev })} role="button" className={`btn bg-[#3F5E82] fixed top-3 drawer-button rounded-none text-white transition-all duration-300 border-none z-50 shadow-none ${isDrawerOpen ? "left-56 px-0" : "left-3 px-0"} `}>
            {isDrawerOpen ?
              <>
                <IoIosArrowBack />
              </>
              :
              <IoIosArrowForward />
            }
          </label>
          {/* <label htmlFor="my-drawer-2" role="button" className="btn bg-primary fixed bottom-3 right-3 drawer-button rounded-none text-white lg:hidden z-50">
            <RiMenu2Line className="text-2xl"></RiMenu2Line>
          </label> */}
          <div className='flex'>
            <div className={`w-3 h-screen custom-gradient-side-bar shadow-none ${isDrawerOpen&&"hidden"}`}></div>
            <div className='flex-1'> 
            <Outlet />
            </div>
          </div>

          
        </div>

        {/* Sidebar */}
        <div className="drawer-side ">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu custom-gradient-side-bar text-base-content min-h-full w-56 py-4 px-0 gap-2 text-[12px]">
            {/* Sidebar content */}
            {/* <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link className="flex items-center gap-3">
                <FaImage /> Inbox
              </Link>
            </li> */}
            {/* <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link className="flex items-center gap-3">
                <LuFileUp /> Drive file
              </Link>
            </li> */}
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/dashboard/boards">Boards</Link>
            </li>
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/dashboard/messenger">Messenger</Link>
            </li>
            {/* <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/updates">Updates</Link>
            </li> */}
            {/* <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/projects">Projects</Link>
            </li> */}
            {/* <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/settings">Settings</Link>
            </li> */}
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/dashboard/activity-log">Activity Log</Link>
            </li>
            {/* <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/ecommerce">Ecommerce</Link>
            </li> */}
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/dashboard/leaderBoard">LeaderBoard</Link>
            </li>
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/dashboard/myProfile">My Profile</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
