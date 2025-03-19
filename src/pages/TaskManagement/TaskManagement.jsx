import { useEffect, useState } from "react";

import {
  FaBell,
  FaSearch,
  FaUsers,
  FaCog,
  FaPlus,
  FaImage,
} from "react-icons/fa";
import TaskCard from "./TaskCard";
import { LuFileUp } from "react-icons/lu";
import { Link } from "react-router";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("/fake.json")
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks));
  }, []);

  return (
    <div className="flex h-screen bg-[#2E5077] text-white">
      {/* Sidebar */}
      <div className="w-64 p-5 bg-gray-900 h-full ">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="mt-5 space-y-2 flex flex-col">
          <Link className="flex items-center gap-3">
            <FaImage /> Inbox
          </Link>
          <Link className="flex items-center gap-3">
            <LuFileUp /> Drive file
          </Link>
          <Link to="/boards">Boards</Link>
          <Link to="/updates">Updates</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/ecommerce">Ecommerce</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="">
        <div className="grid grid-cols-4 gap-4 p-4 bg-[#2E5077] ">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
