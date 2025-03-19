import { useEffect, useState } from "react";

import TaskCard from "./TaskCard";


const TaskManagement = () => {
  const [tasks, setTasks] = useState({});
  useEffect(() => {
    fetch("/tasks.json")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);
  console.log("tasks", tasks)
  return (
    <div className=" bg-secondary text-white">

      {/* Main Content */}
      <div className=" p-4 h-screen grid grid-cols-3 gap-3 justify-items-center">

        <div className=" h-fit w-72 p-2 bg-[#F1F2F4] rounded-xl">
          <h3 className=" w-full px-4 text-start rounded-md mt- text-[12px] py-1 font-semibold flex items-center text-[#172B4D] hover:text-gray-90">To-Do</h3>
          <div className="max-h-[calc(100vh-120px)] h-fit overflow-y-scroll  ">
            <div className=" flex flex-col items-center gap-2">
              {
                tasks.toDo?.map((task, index) => <TaskCard key={index} task={task} />)
              }
            </div>
          </div>
          <button className="hover:bg-[#D0D4DB] w-full px-4 text-start rounded-md mt-2 text-[12px] py-1 font-semibold flex items-center text-[#172B4D] hover:text-gray-900">+  Add a card</button>
        </div>


        <div className=" h-fit w-72 p-2 bg-[#F1F2F4] rounded-xl">
          <h3 className=" w-full px-4 text-start rounded-md mt- text-[12px] py-1 font-semibold flex items-center text-[#172B4D] hover:text-gray-90">In Progress</h3>
          <div className="max-h-[calc(100vh-120px)] h-fit overflow-y-scroll  ">
            <div className=" flex flex-col items-center gap-2">
              {
                tasks.inProgress?.map((task, index) => <TaskCard key={index} task={task} />)
              }
            </div>
          </div>
          <button className="hover:bg-[#D0D4DB] w-full px-4 text-start rounded-md mt-2 text-[12px] py-1 font-semibold flex items-center text-[#172B4D] hover:text-gray-900">+  Add a card</button>
        </div>
        <div className=" h-fit w-72 p-2 bg-[#F1F2F4] rounded-xl">
          <h3 className=" w-full px-4 text-start rounded-md mt- text-[12px] py-1 font-semibold flex items-center text-[#172B4D] hover:text-gray-90">Done</h3>
          <div className="max-h-[calc(100vh-120px)] h-fit overflow-y-scroll  ">
            <div className=" flex flex-col items-center gap-2">
              {
                tasks.done?.map((task, index) => <TaskCard key={index} task={task} />)
              }
            </div>
          </div>
          <button className="hover:bg-[#D0D4DB] w-full px-4 text-start rounded-md mt-2 text-[12px] py-1 font-semibold flex items-center text-[#172B4D] hover:text-gray-900">+  Add a card</button>
        </div>




      </div>
      {/* Main Content */}


    </div>
  );
};

export default TaskManagement;
