import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import MainLayout from "./Layouts/MainLayout";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";
import DashboardLayout from "./Layouts/DashboardLayout";
import TaskManagement from "./pages/TaskManagement/TaskManagement.jsx";
import Boards from "./pages/Boards/Boards.jsx";
import NewTaskManagement from "./pages/TaskManagement/NewTaskManagement.jsx";
import LeaderBoard from "./pages/LeaderBoardAndReview/LeaderBoard.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<NewTaskManagement></NewTaskManagement>} />
        <Route path="boards" element={<Boards />} />
        <Route path="leaderBoard" element={<LeaderBoard></LeaderBoard>} />
      </Route>
    </Routes>
  );
}

export default App;
