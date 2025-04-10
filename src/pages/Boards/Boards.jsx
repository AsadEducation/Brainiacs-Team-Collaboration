import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import BoardsHeader from "./BoardsHeader"; // Import the new BoardsHeader component

const BoardCard = ({ board, onEdit, onDelete, navigate }) => (
  <motion.div
    className="p-4 shadow rounded cursor-pointer"
    style={{ backgroundColor: board.theme }}
    onClick={() => navigate(`/dashboard/boards/${board._id}`)}
  >
    <h3 className="text-lg font-bold">{board.name}</h3>
    <p className="text-sm text-gray-100">{board.visibility}</p>
    <div className="flex justify-end gap-2 mt-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(board);
        }}
        className="btn btn-sm"
      >
        Edit
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(board._id);
        }}
        className="btn btn-sm btn-error"
      >
        Delete
      </button>
    </div>
  </motion.div>
);

const CreateBoardModal = ({
  isOpen,
  onClose,
  onCreate,
  newBoard,
  setNewBoard,
  visibility,
  setVisibility,
  theme,
  setTheme,
  themeOptions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-bold mb-3">Create New Board</h3>
        <input
          type="text"
          placeholder="Board Name"
          value={newBoard}
          onChange={(e) => setNewBoard(e.target.value)}
          className="input input-bordered w-full mb-3"
          required
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
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Theme Color</label>
          <div className="flex gap-2">
            {themeOptions.map((option) => (
              <div
                key={option.name}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                  theme === option.color ? "border-black" : "border-transparent"
                }`}
                style={{ backgroundColor: option.color }}
                onClick={() => setTheme(option.color)}
                title={option.name}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn btn-error">
            Cancel
          </button>
          <button onClick={onCreate} className="btn btn-success">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

const EditBoardModal = ({
  isOpen,
  onClose,
  onSave,
  editBoard,
  setEditBoard,
  themeOptions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-bold mb-3">Edit Board</h3>
        <input
          type="text"
          placeholder="Board Name"
          value={editBoard?.name || ""}
          onChange={(e) => setEditBoard({ ...editBoard, name: e.target.value })}
          className="input input-bordered w-full mb-3"
          required
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
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Theme Color</label>
          <div className="flex gap-2">
            {themeOptions.map((option) => (
              <div
                key={option.name}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                  editBoard?.theme === option.color
                    ? "border-black"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: option.color }}
                onClick={() =>
                  setEditBoard({ ...editBoard, theme: option.color })
                }
                title={option.name}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn btn-error">
            Cancel
          </button>
          <button onClick={onSave} className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const Boards = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBoard, setEditBoard] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [theme, setTheme] = useState("#3b82f6");


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
        const response = await axios.get(`http://localhost:5000/boards`);
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchBoards();
  }, []);

  const createBoard = async () => {
    if (!newBoard) return alert("Board name is required!");
    if (!currentUser?._id) return alert("User is not authenticated!");

    const newBoardData = {
      name: newBoard,
      visibility,
      theme,
      createdBy: currentUser._id, // Ensure currentUser._id is valid
      members: [
        {
          userId: currentUser._id,
          role: "admin",
        },
      ],
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`http://localhost:5000/boards`, newBoardData);
      setBoards([...boards, response.data]);
      setIsModalOpen(false);
      setNewBoard("");
      setVisibility("Public");
      setTheme("#3b82f6");
    } catch (error) {
      console.error("Error creating board:", error);
      alert(`Failed to create board: ${error.response?.data?.error || error.message}`);
    }
  };

  const updateBoard = async () => {
    if (!editBoard?.name) return alert("Board name is required!");

    try {
      await axios.put(`http://localhost:5000/boards/${editBoard._id}`, {
        name: editBoard.name,
        visibility: editBoard.visibility,
        theme: editBoard.theme,
      });

      setBoards(boards.map((board) => (board._id === editBoard._id ? editBoard : board)));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };

  const deleteBoard = async (boardId) => {
    if (!window.confirm("Are you sure you want to delete this board?")) return;

    try {
      await axios.delete(`http://localhost:5000/boards/${boardId}`);
      setBoards(boards.filter((board) => board._id !== boardId));
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <div className="p-6">
      <BoardsHeader onCreateBoard={() => setIsModalOpen(true)} /> {/* Use BoardsHeader */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boards.length > 0 ? (
          boards.map((board) => (
            <BoardCard
              key={board._id}
              board={board}
              onEdit={(board) => {
                setEditBoard(board);
                setIsEditModalOpen(true);
              }}
              onDelete={deleteBoard}
              navigate={navigate}
            />
          ))
        ) : (
          <p className="text-gray-500">No boards available. Create a new board to get started.</p>
        )}
      </div>

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createBoard}
        newBoard={newBoard}
        setNewBoard={setNewBoard}
        visibility={visibility}
        setVisibility={setVisibility}
        theme={theme}
        setTheme={setTheme}
        themeOptions={themeOptions}
      />

      <EditBoardModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={updateBoard}
        editBoard={editBoard}
        setEditBoard={setEditBoard}
        themeOptions={themeOptions}
      />
    </div>
  );
};

export default Boards;