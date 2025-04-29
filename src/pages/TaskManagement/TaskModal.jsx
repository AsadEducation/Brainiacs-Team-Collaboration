import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify'; 
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const TaskModal = ({ task }) => {
  const axiosPublic = useAxiosPublic();
  const [showActivity, setShowActivity] = useState(false);
  const [submittedTime, setSubmittedTime] = useState(null); 
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scheduleId, setScheduleId] = useState(null);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const startDate = form.startDate.value;
    const startTime = form.startTime.value;
    const dueDate = form.dueDate.value;
    const dueTime = form.dueTime.value;
    const reminder = form.reminder.value;
    const description = form.description.value;
    const activity = form.activity.value;
  
    const addTime = { startDate, startTime, dueDate, dueTime, reminder, description, activity };
  
    try {
      if (!isSubmitted) {
       
        const res = await axiosPublic.post('/timeSchedules', addTime);
  
        if (res.data.insertedId) {
          toast.success('Time schedule added successfully!');
          document.getElementById(task.id).close();

          setSubmittedTime({ startDate, startTime, dueDate, dueTime });
          setScheduleId(res.data.insertedId); 
          setIsSubmitted(true);
         
        } else {
          toast.error('Failed to add time schedule. Please try again.');
        }
      } else {
       
        const res = await axiosPublic.put(`/timeSchedules/${scheduleId}`, addTime);
  
        if (res.data.modifiedCount > 0) {
          toast.success('Time schedule updated successfully!');
          document.getElementById(task.id).close();

          setSubmittedTime({ startDate, startTime, dueDate, dueTime });
        } else {
          toast.warn('No changes detected.');
        }
      }
    } catch (error) {
      console.error('Error saving/updating time schedule:', error);
      toast.error('Something went wrong.');
    }
  };
  

  return (
    <dialog id={task?.id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-[600px] p-2">
        <div className="flex items-center justify-center w-full">
          <div className="bg-white p-4 rounded-xl shadow-lg w-full">

            <div className="flex justify-between mb-3">
              <h2 className="text-xl font-semibold text-gray-900">
                {task.taskTittle}{" "}
                <span className="text-gray-600 text-base font-medium my-2">
                  ({task.columnTittle})
                </span>
              </h2>

              {/* close button */}
              <button
                className="px-2 py-2 text-gray-600 bg-gray-200 rounded-full"
                onClick={() => document.getElementById(task.id).close()}
              >
                <IoCloseSharp />
              </button>
            </div>

            {/* Show updated times if submitted */}
            {submittedTime && (
              <>
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Start:</strong> {submittedTime.startDate} at {submittedTime.startTime}
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Due:</strong> {submittedTime.dueDate} at {submittedTime.dueTime}
                </div>
              </>
            )}

            {/* Default values from task  */}
            {!submittedTime && task.startDate && task.startTime && (
              <div className="text-sm text-gray-700 mb-2">
                <strong>Start:</strong> {task.startDate} at {task.startTime}
              </div>
            )}
            {!submittedTime && task.dueDate && task.dueTime && (
              <div className="text-sm text-gray-700 mb-2">
                <strong>Due:</strong> {task.dueDate} at {task.dueTime}
              </div>
            )}

            <div className="flex justify-between space-x-6 items-center">
              <div className="flex-1">
                <form onSubmit={handleSubmit}>
                  {/* Dates Section */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        className="w-full p-2 mt-1 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Time</label>
                      <input
                        type="time"
                        name="startTime"
                        id="startTime"
                        className="w-full p-2 mt-1 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Due Date</label>
                      <input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        className="w-full p-2 mt-1 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Due Time</label>
                      <input
                        type="time"
                        name="dueTime"
                        id="dueTime"
                        className="w-full p-2 mt-1 border rounded-md"
                      />
                    </div>
                  </div>

                  {/* Reminder */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Reminder</label>
                    <select
                      name="reminder"
                      id="reminder"
                      className="w-full p-2 mt-1 border rounded-md"
                    >
                      <option value="">None</option>
                      <option value="5min">5 minutes before</option>
                      <option value="1hour">1 hour before</option>
                      <option value="1day">1 day before</option>
                    </select>
                  </div>

                  {/* Description */}
                  <label className="block text-sm font-medium text-gray-700 mt-4">Description</label>
                  <textarea
                    defaultValue={task.description || ""}
                    name="description"
                    id="description"
                    className="w-full p-2 mt-2 border rounded-md"
                    placeholder="Add task description..."
                  ></textarea>

                  {/* Activity */}
                  <div className="w-full my-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700">Activity</label>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg text-black bg-gray-200 hover:bg-gray-300"
                        onClick={() => setShowActivity(!showActivity)}
                      >
                        {showActivity ? "Hide activity" : "Show activity"}
                      </button>
                    </div>
                    <input
                      type="text"
                      name="activity"
                      id="activity"
                      className="w-full p-2 mt-2 border rounded-md"
                      placeholder="Write a comment"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-[#2E5077] rounded-lg"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </dialog>
  );
};

export default TaskModal;
