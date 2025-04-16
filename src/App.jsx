import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import MainLayout from "./Layouts/MainLayout";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";
import DashboardLayout from "./Layouts/DashboardLayout";
import Boards from "./pages/Boards/Boards.jsx";
import NewTaskManagement from "./pages/TaskManagement/NewTaskManagement.jsx";
import LeaderBoard from "./pages/LeaderBoardAndReview/LeaderBoard.jsx";
import ActivityLog from './dashboard-pages/ActivityLog.jsx'
import MyProfile from "./pages/MyProfile/MyProfile.jsx";
import Messenger from "./dashboard-pages/Messenger/Messenger.jsx";
import About from "./pages/About/About.jsx";
import Services from "./pages/Services/Services.jsx";
import Pricing from "./pages/Pricing/Pricing.jsx";

function App() {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* dashboard routes  */}

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="boards" replace />} />
        <Route path="boards" element={<Boards />} />
        <Route path="leaderBoard" element={<LeaderBoard />} />
        <Route path="myProfile" element={<MyProfile />} />
        <Route path="boards/:id" element={<NewTaskManagement />} />  
        <Route path="activity-log" element={<ActivityLog/>} />
        <Route path="messenger/:boardId" element={<Messenger />} />
        <Route path="messenger" element={<Messenger />} /> {/* Default route */}
      </Route>

    </Routes>
  );
}

export default App;
