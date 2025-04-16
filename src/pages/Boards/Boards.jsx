import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import BoardsHeader from "./BoardsHeader";
import BoardCard from "./BoardCard"; // Import BoardCard
import CreateBoardModal from "./CreateBoardModal"; // Import CreateBoardModal
import EditBoardModal from "./EditBoardModal"; // Import EditBoardModal

const Boards = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBoard, setEditBoard] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [theme, setTheme] = useState("#3b82f6");
  const [searchQuery, setSearchQuery] = useState("");

  const themeOptions = [
    { name: "Sky Blue", color: "#e0f2fe" },
    { name: "Lavender", color: "#f3e8ff" },
    { name: "Mint Green", color: "#d1fae5" },
    { name: "Warm Beige", color: "#fef3c7" },
    { name: "Soft Gray", color: "#e5e7eb" },
  ];

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get(`https://new-server-brainaics.onrender.com/boards`);
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
        alert("Failed to fetch boards. Please try again later."); // User-friendly error message
      }
    };
    fetchBoards();
  }, []);

  useEffect(() => {
    console.log("Current User:", currentUser); // Log currentUser for debugging
  }, [currentUser]);

  const createBoard = async () => {
    if (!newBoard) return alert("Board name is required!");
    if (!currentUser?._id) return alert("User is not authenticated!");

    const newBoardData = {
      name: newBoard,
      description, // Include description
      visibility,
      theme,
      createdBy: currentUser._id,
      members: [
        {
          userId: currentUser._id,
          name: currentUser.name, // Pass user's name
          email: currentUser.email, // Include user's email
          role: "member",
        },
      ],
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        `https://new-server-brainaics.onrender.com/boards`,
        newBoardData
      );
      setBoards([...boards, response.data]);
      setIsModalOpen(false);
      setNewBoard("");
      setDescription(""); // Reset description
      setVisibility("Public");
      setTheme("#3b82f6");
    } catch (error) {
      console.error("Error creating board:", error);
      alert(
        `Failed to create board: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  const updateBoard = async () => {
    if (!editBoard?.name) return alert("Board name is required!");

    try {
      await axios.put(`https://new-server-brainaics.onrender.com/boards/${editBoard._id}`, {
        name: editBoard.name,
        description: editBoard.description, // Include description
        visibility: editBoard.visibility,
        theme: editBoard.theme,
      });

      setBoards(
        boards.map((board) => (board._id === editBoard._id ? editBoard : board))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };

  const deleteBoard = async (boardId) => {
    if (!window.confirm("Are you sure you want to delete this board?")) return;

    try {
      await axios.delete(`https://new-server-brainaics.onrender.com/boards/${boardId}`);
      setBoards(boards.filter((board) => board._id !== boardId));
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  const filteredBoards = boards
  .filter((board) =>
    currentUser &&
    board.members?.some((member) => member.userId === currentUser._id)
  )
  .filter((board) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const lowerCaseName = board.name.toLowerCase();
    return (
      lowerCaseName.startsWith(lowerCaseQuery.slice(0, 3)) && // Match first 3 letters
      lowerCaseName.includes(lowerCaseQuery) // Further matches
    );
  });


  return (
    <div className="p-6">
      <BoardsHeader
        onCreateBoard={() => setIsModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredBoards.length > 0 ? (
          filteredBoards.map((board) => (
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
          <p className="text-gray-500">No boards match your search.</p>
        )}
      </div>

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createBoard}
        newBoard={newBoard}
        setNewBoard={setNewBoard}
        description={description} // Pass description
        setDescription={setDescription} // Pass setDescription
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
