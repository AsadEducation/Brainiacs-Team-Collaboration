import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { GoPersonAdd } from "react-icons/go";
import { IoMdPricetag } from "react-icons/io";
import { IoCloseSharp, IoLocationOutline } from "react-icons/io5";
import { RiAttachment2 } from "react-icons/ri";
import { TbChecklist } from "react-icons/tb";

const TaskModal = ({ task }) => {
    

    const [showActivity, setShowActivity] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <dialog id={task?.id} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box max-w-[800px] p-2">
                <div className="flex items-center justify-center w-full">
                    <div className="bg-white p-4 rounded-xl shadow-lg w-full">

                        <div className="flex justify-between mb-3">
                            <h2 className="text-xl font-semibold text-gray-900">{task.taskTittle} <span className="text-gray-600 text-base font-medium my-2">( {task.columnTittle})</span></h2>

                            {/* close button */}
                            <button className="px-2 py-2 text-gray-600 bg-gray-200 rounded-full" onClick={()=>document.getElementById(task.id).close()}>
                                <IoCloseSharp />
                            </button>

                        </div>

                        

                        <div className=" flex justify-between space-x-6 items-center">

                            {/* left side */}
                            <div className="flex-1 ">

                                <form onSubmit={handleSubmit}>

                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700 ">Due Date</label>

                                        <input
                                            type="date"
                                            id="date"
                                            className="w-full p-2 mt-2 border rounded-md"
                                            placeholder="Due Date"

                                        />
                                    </div>

                                    <label className="block text-sm font-medium text-gray-700 mt-4">Description</label>
                                    <textarea
                                        className="w-full p-2 mt-2 border rounded-md"
                                        placeholder="Add task description..."
                                    ></textarea>


                                    <div className="w-full my-2">
                                        <div className="flex justify-between items-center" >
                                            <label className="block text-sm font-medium text-gray-700 ">Activity</label>
                                            <button
                                                className="px-4 py-2 rounded-lg text-black bg-gray-200 hover:bg-gray-300"
                                                onClick={() => setShowActivity(!showActivity)}
                                            >
                                                {showActivity ? "Hide activity" : "Show activity"}
                                            </button>
                                        </div>

                                        <input
                                            type="text"
                                            id="activity"
                                            className="w-full p-2 mt-2 border rounded-md"
                                            placeholder="Write a comment"

                                        />
                                    </div>

                                </form>

                            </div>


                            {/* right side */}

                            <div className="flex flex-col space-y-2">
                                <button
                                    className="px-16 py-2 rounded-lg text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-start gap-3">
                                    <GoPersonAdd />
                                    Join
                                </button>
                                <button
                                    className="px-16 py-2 rounded-lg text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-start gap-3">
                                    <BsPerson />
                                    Members
                                </button>

                                <button
                                    className="px-16 py-2 rounded-lg text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-start gap-3">
                                    <IoMdPricetag />
                                    Labels
                                </button>

                                <button
                                    className="px-16 py-2 rounded-lg text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-start gap-3">
                                    <TbChecklist />
                                    Checklist
                                </button>

                                <button
                                    className="px-16 py-2 rounded-lg text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-start gap-3">
                                    <RiAttachment2 />
                                    Attachment
                                </button>

                                <button
                                    className="px-16 py-2 rounded-lg text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-start gap-3">
                                    <IoLocationOutline />
                                    Location
                                </button>

                            </div>

                        </div>


                        {/* <p className="text-sm text-gray-500 mt-1">Due Date: {task.dueDate || "Not set"}</p> */}



                        {/* Button */}
                        <div className="mt-4 flex justify-start space-x-2">

                            <button className="px-4 py-2 text-white bg-[#2E5077] rounded-lg">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>

    );
};

export default TaskModal;