import { Outlet } from "react-router"
import Navbar from "../Component/Shared/Navbar"
import Footer from "../pages/Home/Footer/Footer"

const MainLayout = () => {
  return (
    <div className='bg-white'>
      <Navbar />
      <div className='min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
   
      <Footer></Footer>
    </div>
  )
}

export default MainLayout
