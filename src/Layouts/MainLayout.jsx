import { Outlet } from "react-router"
import Navbar from "../Component/Shared/Navbar"

const MainLayout = () => {
  return (
    <div className='bg-white'>
      <Navbar />
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
