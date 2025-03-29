import React from 'react'
import { FaImage } from 'react-icons/fa'
import { LuFileUp } from 'react-icons/lu'
import { RiMenu2Line } from 'react-icons/ri'
import { Link, Outlet } from 'react-router-dom'
import ChatBox from '../Component/Shared/ChatBox/ChatBox'

const DashboardLayout = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-[#F6F4F0] relative">

          {/* Page content here */}
          <label htmlFor="my-drawer-2" role="button" className="btn bg-primary fixed bottom-3 right-3 drawer-button rounded-none text-white lg:hidden z-50">
            <RiMenu2Line className="text-2xl"></RiMenu2Line>
          </label>
          <Outlet/>

          {/* Chat Box */}
          <ChatBox />
        </div>

        {/* Sidebar */}
        <div className="drawer-side bg-primary">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-gradient-to-bl from-primary to-primary/90 text-base-content min-h-full w-56 py-4 px-0 gap-2 text-[12px]">
            {/* Sidebar content */}
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link className="flex items-center gap-3">
                <FaImage /> Inbox
              </Link>
            </li>
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link className="flex items-center gap-3">
                <LuFileUp /> Drive file
              </Link>
            </li>
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/dashboard/boards">Boards</Link>
            </li>
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/updates">Updates</Link>
            </li>
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/projects">Projects</Link>
            </li>
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/settings">Settings</Link>
            </li>
            <li className="hover:bg-white/10 px-2 backdrop-blur-3xl text-white rounded-sm">
              <Link to="/ecommerce">Ecommerce</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
