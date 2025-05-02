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

import MyProfile from "./pages/MyProfile/MyProfile.jsx";
import Messenger from "./dashboard-pages/Messenger/Messenger.jsx";
import About from "./pages/About/About.jsx";
import Services from "./pages/Services/Services.jsx";
import Pricing from "./pages/Pricing/Pricing.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ActivityLog from "./dashboard-pages/Activity Log/ActivityLog.jsx";
import Settings from "./dashboard-pages/Settings/Settings.jsx";
import PrivateRoute from "./Routes/PrivateRoute"; // Import PrivateRoute
import PublicRoute from "./Routes/PublicRoute"; // Import PublicRoute

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Route>

      {/* dashboard routes  */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="boards" replace />} />
        <Route path="boards" element={<Boards />} />
        <Route path="leaderBoard" element={<LeaderBoard />} />
        <Route path="myProfile" element={<MyProfile />} />
        <Route path="boards/:id" element={<NewTaskManagement />} />
        <Route path="activity-log" element={<ActivityLog />} />
        <Route path="messenger/:boardId" element={<Messenger />} />
        <Route path="messenger" element={<Messenger />} /> {/* Default route */}
        <Route path="settings" element={<Settings />} /> {/* Default route */}
      </Route>

      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
