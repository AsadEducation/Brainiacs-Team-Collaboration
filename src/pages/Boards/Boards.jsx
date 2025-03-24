import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    const newBoardData = { name: newBoard, visibility };

    try {
      const response = await axios.post("http://localhost:5000/boards", newBoardData);
      setBoards([...boards, response.data]);
      setNewBoard("");
      setVisibility("Public");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating board:", error);
      alert("Failed to create board. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Boards</h2>
        <button onClick={() => setIsModalOpen(true)} className="btn border-none text-white btn-primary">
          + Create Board
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {boards.length > 0 ? (
          boards.map((board) => (
            <motion.div 
              key={board._id}
              className="p-4 bg-white shadow-lg rounded-lg border cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-semibold">{board.name}</h3>
              <p className="text-sm text-gray-500">Visibility: {board.visibility}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No boards available. Create a new one!</p>
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
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="btn btn-error">Cancel</button>
              <button onClick={createBoard} className="btn btn-success">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boards;
