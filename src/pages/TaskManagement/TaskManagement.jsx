import { useEffect, useState } from "react";

import TaskCard from "./TaskCard";
import { closestCorners, DndContext, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";








// This component is not used anymore 












const TaskManagement = () => {
  // setting the fetched tasks into a state 
  const [tasks, setTasks] = useState({});
  useEffect(() => {
    fetch("/tasks.json")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);
// this function is used below on handleDragEnd
const getPosition=id=>tasks.toDo.findIndex(obj=>obj.id===id);

  // setting a function for the functionality when drag ends 
  const handleDragEnd=event=>{
     const {active,over}=event;
     console.log(active,over)
    if(active.id===over.id) return;

    const originalPosition=getPosition(active.id);
    const latestPosition=getPosition(over.id);
    setTasks(
      (prevTasks) => ({ ...prevTasks, toDo: arrayMove(tasks.toDo,originalPosition,latestPosition) })
      
    )

  }

  const sensors = useSensors(
    useSensor(PointerSensor,{
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  // checking the current tasks length
  console.log("tasks", Object.keys(tasks).length)
  return (
    <div className=" bg-secondary text-white">

      {/* Main Content */}
      <div className=" p-4 h-screen grid grid-cols-3 gap-3 justify-items-center">

        <div className=" h-fit w-72 p-2 bg-[#F1F2F4] rounded-xl">
          <h3 className=" w-full px-4 text-start rounded-md  text-[12px] py-1 font-semibold flex items-center text-[#172B4D] hover:text-gray-90">To-Do</h3>
          <div className="max-h-[calc(100vh-120px)] h-fit overflow-y-scroll  ">
            <div className=" flex flex-col items-center gap-2">
              {
                Object.keys(tasks).length < 1 ?
                  <h1>Loading</h1>
                  :
                  <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                    <SortableContext items={tasks.toDo} strategy={verticalListSortingStrategy}>

                      {
                        tasks.toDo?.map((task, index) => <TaskCard key={index} task={task} />)
                      }
                    </SortableContext>
                  </DndContext>
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
