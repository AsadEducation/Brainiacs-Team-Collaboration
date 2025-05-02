import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import EditBoardModal from "./EditBoardModal";
import { BsThreeDots } from "react-icons/bs";
import { LucideLayoutDashboard } from "lucide-react";

const BoardCard = ({ board, onDelete, navigate, onEdit }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

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
      className="p-4 backdrop-blur-lg bg-white/30 shadow-lg border border-white/20 rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300 h-36 w-full flex items-center "
      style={{ backgroundColor: board.theme }}
      onClick={() => navigate(`/dashboard/boards/${board._id}`)}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex-1">
        <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
          <LucideLayoutDashboard size={18} /> {board.name}
        </h3>

        <p className="text-sm md:text-base mt-2 line-clamp-2">
          {board.description || "No description provided."}
        </p>
      </div>

      <div className=" flex flex-col items-end" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="hover:bg-gray-50 rounded-full p-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <BsThreeDots />
        </button>
        <div className="flex mt-3">
          {board.members?.slice(0, 3).map((member, i) => (
            <img
              key={i}
              src={member.photoURL}
              className="w-6 h-6 rounded-full border-2 border-white -ml-2"
              alt="member"
            />
          ))}
        </div>
        {isMenuOpen && (
          <div
            className="absolute top-2 right-14 w-32 bg-white shadow-lg rounded-md z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsEditModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onDelete(board._id);
                setIsMenuOpen(false);
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
