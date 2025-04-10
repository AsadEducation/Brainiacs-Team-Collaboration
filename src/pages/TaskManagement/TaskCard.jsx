import React, { useState } from 'react';
import { LiaFileSolid } from 'react-icons/lia';
import { MdOutlineMessage } from 'react-icons/md';
import { RiAttachmentFill } from 'react-icons/ri';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskModal from './TaskModal';

const TaskCard = ({ task }) => {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging, active } = useSortable({
    id: task.id,
    data: task,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: active ? "grabbing" : "grab"
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <div className="flex items-center text-cyan-600 space-x-1">
              <span className="text-base"><LiaFileSolid /></span>
              <p className="text-xs font-medium">4</p>
            </div>
          </div>



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
      

    </>
  );
};

export default TaskCard;