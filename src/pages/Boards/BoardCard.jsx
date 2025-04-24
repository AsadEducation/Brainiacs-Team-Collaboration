import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import EditBoardModal from "./EditBoardModal"; // Import the EditBoardModal
import { BsThreeDots } from "react-icons/bs";

const BoardCard = ({ board, onDelete, navigate, onEdit }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref for the dropdown menu
  const fallbackImage = "https://via.placeholder.com/150"; // Fallback image URL

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent event propagation
    setIsMenuOpen((prev) => !prev);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      className="p-4 shadow-inner shadow-slate-500/80 rounded cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      style={{ backgroundColor: board.theme }}
      onClick={() => navigate(`/dashboard/boards/${board._id}`)}
    >
      <div className="flex-1">
        <h3 className="text-lg font-bold">
          {board.name} <sup className="text-xs">({board.visibility})</sup>
        </h3>
        <p className="text-sm mt-2">
          {board.description || "No description provided."}
        </p>
      </div>
      <div className="relative bottom-6 left-3" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="hover:bg-gray-50 rounded-full p-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <BsThreeDots />
        </button>
        {isMenuOpen && (
          <div
            className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-10"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
          >
            <button
              onClick={() => {
                setIsEditModalOpen(true);
                setIsMenuOpen(false); // Close menu
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onDelete(board._id);
                setIsMenuOpen(false); // Close menu
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {isEditModalOpen && (
        <EditBoardModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          board={board}
          onEdit={onEdit}
        />
      )}
    </motion.div>
  );
};

export default BoardCard;
