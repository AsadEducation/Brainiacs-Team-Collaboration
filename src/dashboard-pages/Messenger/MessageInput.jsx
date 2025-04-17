import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCirclePlus } from "react-icons/fa6";
import { AiOutlineSend } from "react-icons/ai";

const MessageInput = ({
  newMessage,
  setNewMessage,
  sendMessage,
  showAttachDropdown,
  setShowAttachDropdown,
  attachDropdownRef,
}) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (attachDropdownRef.current && !attachDropdownRef.current.contains(event.target)) {
        setShowAttachDropdown(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center relative shadow-md p-4 rounded-lg bg-gray-100"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="relative mr-0 sm:mr-4 mb-4 sm:mb-0"
        ref={attachDropdownRef}
      >
        <button
          className="text-primary hover:text-accent transition duration-200"
          onClick={() => setShowAttachDropdown(!showAttachDropdown)}
        >
          <FaCirclePlus className="text-2xl sm:text-3xl" />
        </button>
        {showAttachDropdown && (
          <motion.div
            className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-inner shadow-gray-500/80 w-40 sm:w-48 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Attach File
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Attach Image
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Create Poll
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Other Options
              </li>
            </ul>
          </motion.div>
        )}
      </div>
      <input
        type="text"
        className="flex-1 border rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent newline
            sendMessage();
          }
        }}
      />
      <motion.button
        className="ml-0 sm:ml-4 mt-4 sm:mt-0 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary transition duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={sendMessage}
      >
        <AiOutlineSend className="inline-block text-xl sm:text-2xl" />
      </motion.button>
    </motion.div>
  );
};

export default MessageInput;
