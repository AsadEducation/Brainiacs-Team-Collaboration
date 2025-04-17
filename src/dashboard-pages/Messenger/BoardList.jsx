import React from "react";
import { motion } from "framer-motion";

const BoardList = ({ boards, selectedBoard, handleBoardSelect, getUnseenMessageCount, messages }) => {
  return (
    <motion.div
      className="board-list  bg-white p-4 sm:p-6 overflow-y-auto rounded-lg"
      initial={{ x: 200 }}
      animate={{ x: 0 }}
      exit={{ x: 200 }}
      transition={{ duration: 0.5 }}
    >
      
      <ul className="space-y-2 sm:space-y-4">
        {boards.map((board) => {
          const unseenCount =
            board._id === selectedBoard?._id
              ? getUnseenMessageCount(messages)
              : 0;

          return (
            <motion.li
              key={board._id}
              className={`p-4 rounded-lg cursor-pointer ${
                selectedBoard?._id === board._id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800"
              } shadow hover:shadow-lg transition duration-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBoardSelect(board)}
            >
              {board.name}
              {unseenCount > 0 && (
                <span className="ml-2 text-sm text-red-500">
                  {unseenCount} unseen
                </span>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default BoardList;
