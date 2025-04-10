import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router";
import { TbBellRinging2Filled } from "react-icons/tb";
import { IoClose } from 'react-icons/io5';
const Boards = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBoard, setEditBoard] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [theme, setTheme] = useState("#3b82f6");
  const [open, setOpen] = useState(false);


  const themeOptions = [
    { name: "Blue", color: "#3b82f6" },
    { name: "Green", color: "#22c55e" },
    { name: "Red", color: "#ef4444" },
    { name: "Yellow", color: "#eab308" },
    { name: "Purple", color: "#8b5cf6" },
  ];

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/boards");
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchBoards();
  }, []);

  const createBoard = async () => {
    if (!newBoard) return alert("Board name is required!");

    const currentUser = { id: "currentUserId", name: "Current User" }; // Replace with actual user data
    const newBoardData = { name: newBoard, visibility, theme, creator: currentUser, members: [currentUser] };

    try {
      const response = await axios.post(
        "http://localhost:5000/boards",
        newBoardData
      );
      setBoards([...boards, response.data]);
      setNewBoard("");
      setVisibility("Public");
      setTheme("#3b82f6");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating board:", error);
      alert("Failed to create board. Please try again.");
    }
  };

  const openEditModal = (board) => {
    setEditBoard(board);
    setIsEditModalOpen(true);
  };

  const updateBoard = async () => {
    if (!editBoard.name) return alert("Board name is required!");

    try {
      await axios.put(`http://localhost:5000/boards/${editBoard._id}`, {
        name: editBoard.name,
        visibility: editBoard.visibility,
      });

      setBoards(
        boards.map((board) => (board._id === editBoard._id ? editBoard : board))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating board:", error);
      alert("Failed to update board. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex  justify-between  items-center mb-4">
        <h2 className="text-xl font-bold">Your Boards</h2>
       <div className="flex gap-3 ">

<button></button>

       <button
          onClick={() => setIsModalOpen(true)}
          className="btn border-none text-white btn-primary"
        >
          + Create Board
        </button>

        
       </div>




      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {boards.length > 0 ? (
          boards.map((board) => (
            <motion.div
              key={board._id}
              className="p-8 shadow-lg rounded-lg cursor-pointer relative"
              style={{ backgroundColor: board.theme }}
              onClick={() =>
                navigate(`/dashboard/boards/${board._id}`, {
                  state: { theme: board.theme },
                })
              }
            >
              <h3 className="text-lg font-semibold">{board.name}</h3>
              <p className="text-sm text-white">
                Visibility: {board.visibility}
              </p>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(board);
                  }}
                  className="btn btn-sm btn-info"
                >
                  Edit
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">
            No boards available. Create a new one!
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-3">Create New Board</h3>
            <input
              type="text"
              placeholder="Board Name"
              value={newBoard}
              onChange={(e) => setNewBoard(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="select select-bordered w-full mb-3"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Team Only">Team Only</option>
            </select>
            <div className="flex gap-2 mb-3">
              {themeOptions.map((option) => (
                <div
                  key={option.name}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    theme === option.color ? "border-black" : "border-transparent"
                  }`}
                  style={{ backgroundColor: option.color }}
                  onClick={() => setTheme(option.color)}
                ></div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-error"
              >
                Cancel
              </button>
              <button onClick={createBoard} className="btn btn-success">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-3">Edit Board</h3>
            <input
              type="text"
              placeholder="Board Name"
              value={editBoard?.name || ""}
              onChange={(e) =>
                setEditBoard({ ...editBoard, name: e.target.value })
              }
              className="input input-bordered w-full mb-3"
            />
            <select
              value={editBoard?.visibility || "Public"}
              onChange={(e) =>
                setEditBoard({ ...editBoard, visibility: e.target.value })
              }
              className="select select-bordered w-full mb-3"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Team Only">Team Only</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="btn btn-error"
              >
                Cancel
              </button>
              <button onClick={updateBoard} className="btn btn-success">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boards;
