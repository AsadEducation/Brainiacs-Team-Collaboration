import React from 'react';
import { LiaFileSolid } from 'react-icons/lia';
import { MdOutlineMessage } from 'react-icons/md';
import { RiAttachmentFill } from 'react-icons/ri';

const TaskCard = ({task}) => {
  const {taskTitle, dueTime} = task
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg w-64">
   
   <div className='flex justify-between items-center'>
   <h3 className="text-[12px] font-medium text-gray-900"> {taskTitle}</h3>
   <div className="flex items-center text-cyan-600 space-x-1">
          <span className="text-base"><LiaFileSolid /></span>
          <p className="text-xs font-medium">4</p>
        </div>
   </div>

  
    {/* <div className="flex space-x-2 mt-2">
      <p className="bg-gray-100 text-gray-700 px-2  rounded-md  text-[10px] font-medium">#UI007</p>
      <p className="bg-blue-100 text-blue-600 px-2  rounded-md  text-[10px] font-medium">Design</p>
      <p className="bg-yellow-100 text-yellow-600 px-2  rounded-md  text-[10px] font-medium">Backlog</p>
    </div> */}

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
  );
};

export default TaskCard;
