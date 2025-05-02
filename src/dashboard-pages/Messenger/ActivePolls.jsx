import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2"; // Import SweetAlert2
import { IoTrashBin } from "react-icons/io5";
import { FaArrowUpRightDots, FaMinus } from "react-icons/fa6";

const ActivePolls = ({
  polls,
  votePoll,
  removePoll,
  onCreatePoll,
  removeVote,
  currentUser,
}) => {
  const [isPollModalOpen, setPollModalOpen] = useState(false);
  const [activePollId, setActivePollId] = useState(null);
  const [remainingTimes, setRemainingTimes] = useState({}); // State to track remaining times

  useEffect(() => {
    const updateRemainingTimes = () => {
      const now = new Date();
      const updatedTimes = polls.reduce((acc, poll) => {
        const expiresAt = new Date(poll.expiresAt);
        const remainingTime = Math.max(0, expiresAt - now); // Ensure non-negative time
        acc[poll._id] = remainingTime;
        return acc;
      }, {});
      setRemainingTimes(updatedTimes);
    };

    updateRemainingTimes(); // Initial calculation
    const interval = setInterval(updateRemainingTimes, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [polls]);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return `${days > 0 ? `${days}d ` : ""}${hours > 0 ? `${hours}h ` : ""}${
      minutes > 0 ? `${minutes}m ` : ""
    }${seconds}s`;
  };

  const handleVoteToggle = async (pollId, optionIndex, hasVoted) => {
    if (!currentUser?._id) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to vote!",
      });
      return;
    }
    try {
      const poll = polls.find((p) => p._id === pollId);
      const optionText = poll.options[optionIndex].text;

      if (hasVoted) {
        await removeVote(pollId, optionIndex);
        Swal.fire({
          icon: "success",
          title: "Vote Removed",
          text: `You removed your vote from "${optionText}" in the poll "${poll.question}".`,
        });
      } else {
        await votePoll(pollId, optionIndex);
        Swal.fire({
          icon: "success",
          title: "Vote Added",
          text: `You voted for "${optionText}" in the poll "${poll.question}".`,
        });
      }
    } catch (error) {
      console.error("Voting failed:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to toggle vote. Please try again.",
      });
    }
  };

  if (!polls || polls.length === 0) return null;
  return (
    <div className="pt-2">
      {polls.map((poll) => (
        <div key={poll._id} className="poll-card mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">Active Polls</h3>
            <button
              className="underline transition p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
              onClick={() =>
                setActivePollId(activePollId === poll._id ? null : poll._id)
              }
            >
              {activePollId === poll._id ? (
                <FaMinus className="text-xl text-red-700" />
              ) : (
                <FaArrowUpRightDots className="text-xl text-secondary" />
              )}
            </button>
          </div>
          {activePollId === poll._id && (
            <ul className="mt-2 space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-medium">{poll.question}</p>
                <p className="text-xs text-gray-500">
                  Time remaining:{" "}
                  {remainingTimes[poll._id]
                    ? formatTime(remainingTimes[poll._id])
                    : "Expired"}
                </p>
                {currentUser?._id === poll.createdBy && (
                  <button
                    className="text-red-500 hover:text-red-700 text-xl transition"
                    onClick={() => removePoll(poll._id)}
                  >
                    <IoTrashBin />
                  </button>
                )}
              </div>

              {poll.options.map((option, index) => {
                const hasVoted = option.votes.some(
                  (vote) => vote.userId === currentUser?._id
                );
                return (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={hasVoted}
                        onChange={() =>
                          handleVoteToggle(poll._id, index, hasVoted)
                        }
                        className="cursor-pointer"
                      />
                      <span>{option.text}</span>
                    </div>
                    <div className="flex -space-x-2 group relative">
                      {option.votes.slice(0, 5).map((vote, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="relative"
                        >
                          <img
                            src={vote.photoURL || "/default-avatar.png"}
                            alt="Voter"
                            className="w-7 h-7 rounded-full border-2 border-white shadow-md transition duration-300 transform group-hover:scale-110 cursor-pointer"
                          />
                          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {vote.name || "Anonymous"}
                          </div>
                        </motion.div>
                      ))}
                      {option.votes.length > 5 && (
                        <div className="w-7 h-7 bg-gray-500 text-white text-xs font-semibold rounded-full flex items-center justify-center border-2 border-white shadow-md">
                          +{option.votes.length - 5}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivePolls;
