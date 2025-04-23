import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const ReactionModal = ({ 
  isOpen, 
  reactions, 
  currentUser, 
  getSenderName, 
  removeReaction, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Reactors</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <IoCloseCircleOutline className="text-2xl" />
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <ul className="space-y-2 w-1/2">
            {reactions.users.map((userId) => {
              const userName =
                userId === currentUser._id ? "You" : getSenderName(userId);
              return (
                <li key={userId} className="text-gray-700 text-center">
                  {userName || "Unknown User"}
                </li>
              );
            })}
          </ul>
          <ul className="space-y-2 w-1/2">
            {reactions.users.map((userId) => (
              <li
                key={userId}
                className="text-gray-700 text-center flex justify-between items-center"
              >
                <span>{reactions.emoji}</span>
                {userId === currentUser._id && (
                  <button
                    className="text-red-500 hover:text-red-700 text-sm"
                    onClick={() =>
                      removeReaction(reactions.messageId, reactions.emoji, userId)
                    }
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReactionModal;
