import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { GoPersonAdd } from "react-icons/go";
import { IoMdPricetag } from "react-icons/io";
import { IoCloseSharp, IoLocationOutline } from "react-icons/io5";
import { RiAttachment2 } from "react-icons/ri";
import { TbChecklist } from "react-icons/tb";

const TaskModal = ({ task, isOpen, onClose }) => {
    if (!isOpen) return null;


    const [showActivity, setShowActivity] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[700px]">


                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>

                    {/* close button */}
                    <button className="px-2 py-2 text-gray-600 bg-gray-200 rounded-full" onClick={onClose}>
                        <IoCloseSharp />
                    </button>

                </div>

                <p className="text-gray-600 my-2"> {task.category}</p>


                <div className=" flex justify-between space-x-6">

                    {/* left side */}
                    <div className="flex-1">

                        <form onSubmit={handleSubmit}>

                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 mt-4">Due Date</label>

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


                            <div className="w-full">
                                <div className="flex justify-between">
                                    <label className="block text-sm font-medium text-gray-700 mt-4">Activity</label>
                                    <button
                                        className="px-4 py-3 rounded-lg text-black bg-gray-200 hover:bg-gray-300"
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
                        className="px-16 py-3 rounded-lg text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-start gap-3">
                        <GoPersonAdd />
                            Join
                        </button>
                        <button 
                        className="px-16 py-3 rounded-lg text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-start gap-3">
                            <BsPerson />
                            Members
                        </button>

                        <button
                        className="px-16 py-3 rounded-lg text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-start gap-3">
                            <IoMdPricetag />
                            Labels
                        </button>

                        <button 
                        className="px-16 py-3 rounded-lg text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-start gap-3">
                            <TbChecklist />
                            Checklist
                        </button>

                        <button
                        className="px-16 py-3 rounded-lg text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-start gap-3">
                            <RiAttachment2 />
                            Attachment
                        </button>

                        <button
                        className="px-16 py-3 rounded-lg text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-start gap-3">
                            <IoLocationOutline />
                            Location
                        </button>

                    </div>

                </div>


                {/* <p className="text-sm text-gray-500 mt-1">Due Date: {task.dueDate || "Not set"}</p> */}



                {/* Button */}
                <div className="mt-4 flex justify-end space-x-2">

                    <button className="px-4 py-2 text-white bg-[#2E5077] rounded-lg">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
