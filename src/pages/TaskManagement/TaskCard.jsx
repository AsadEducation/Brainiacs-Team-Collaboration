import React, { useContext, useState } from 'react';
import { MdDone, MdOutlineMessage } from 'react-icons/md';
import { RiAttachmentFill } from 'react-icons/ri';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskModal from './TaskModal';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';

const TaskCard = ({ task }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { currentUser } = useAuth();


  
  const handleTaskDone = async (e) => {
    e.stopPropagation();
  
    const taskData = {
      taskId: task.id,
      taskTittle: task.taskTittle,
      email: currentUser?.email,
      completedAt: new Date(),
    };
  
    try {
      const res = await axiosPublic.post('/completedTask', taskData);
      if (res.data.success) {
        toast.success("Task completed & point added!");
        setIsCompleted(true);
  
        await axiosPublic.post('/leaderboard');
      }
    } catch (err) {
      console.error("Error completing task", err);
      toast.error("Something went wrong!");
    }
  };
  



  const { setNodeRef, attributes, listeners, transform, transition, isDragging, active } = useSortable({
    id: task.id,
    data: task,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: active ? "grabbing" : "grab"
  };


  if (isDragging) {
    return (
      <div style={style} ref={setNodeRef} className="bg-white rounded-2xl h-24 shadow-lg w-64"></div>
    )
  }
  const { taskTittle } = task

  return (
    <>

      <div style={style} ref={setNodeRef} {...attributes} {...listeners} className="bg-white rounded-2xl p-4 shadow-lg w-[250px] border-sky-500 hover:border "
        onClick={() => document.getElementById(task.id).showModal()}
      >
        <div style={{ touchAction: "none" }}>

          <div className='flex justify-between items-center'>
            <h3 className="text-[12px] font-medium text-gray-900"> {taskTittle}</h3>
            <button
            // disabled={isCompleted}
            onClick={handleTaskDone}
              className={
             `flex items-center px-1 py-1 rounded-full 
   ${isCompleted ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-cyan-600 text-black'}`}
        
            >
              <MdDone />
            </button>


          </div>

         {/* Display dates if they exist */}
         {(task.startDate || task.dueDate) && (
            <div className="mt-2 text-xs text-gray-600">
              {task.startDate && task.startTime && (
                <div>
                  <span className="font-medium">Start:</span> {task.startDate} {task.startTime}
                </div>
              )}
              {task.dueDate && task.dueTime && (
                <div>
                  <span className="font-medium">Due:</span> {task.dueDate} {task.dueTime}
                </div>
              )}
            </div>
          )}

          {/* Member img */}
          <div className="flex items-center justify-between mt-3">

            {/* img */}
            <div className="flex items-center -space-x-2">

              <img className="w-7 h-7 rounded-full border-2 border-white" src="https://i.ibb.co.com/7tY0Hq0/rapunzels-face-v0-l1vu0bitjpjd1.webp" alt="User 1" />
              <img className="w-7 h-7 rounded-full border-2 border-white" src="https://i.ibb.co.com/7tY0Hq0/rapunzels-face-v0-l1vu0bitjpjd1.webp" alt="User 2" />

              {/* number of added members */}
              <p className="w-7 h-7 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full  text-[10px] font-medium border-2 border-white">+5</p>

            </div>

            {/* Add More round dashed Icon */}
            <div className="w-6 h-6 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-full">
              <div className=' rounded-full w-4 h-4 flex items-center justify-center'>
                <p className="text-gray-400">+</p>
              </div>
            </div>


            {/* Attachments & Comments */}
            <div className="flex space-x-2">

              {/* attachments */}
              <div className="flex items-center text-purple-600 space-x-1">
                <span className="text-lg"><RiAttachmentFill /></span>
                <p className="text-sm font-medium">2</p>
              </div>

              {/* messages */}
              <div className="flex items-center text-orange-500 space-x-1">
                <p className="text-lg mt-1"><MdOutlineMessage /></p>
                <p className="text-sm font-medium">3</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <TaskModal task={task} ></TaskModal>
      
     
      <ToastContainer />
    </>
  );
};

export default TaskCard;        