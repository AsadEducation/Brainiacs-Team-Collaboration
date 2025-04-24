import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import BoardsHeader from "./BoardsHeader";
import BoardCard from "./BoardCard"; // Import BoardCard
import CreateBoardModal from "./CreateBoardModal"; // Import CreateBoardModal
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2"; // Import SweetAlert2

const Boards = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState("#e0f2fe");
  const [searchQuery, setSearchQuery] = useState("");
  const axiosPublic = useAxiosPublic();

  const themeOptions = [
    { name: "Sky Blue", color: "#e0f2fe" },
    { name: "Lavender", color: "#f3e8ff" },
    { name: "Mint Green", color: "#d1fae5" },
    { name: "Warm Beige", color: "#fef3c7" },
    { name: "Soft Gray", color: "#e5e7eb" },
  ];

  const fetchBoards = async () => {
    try {
      const response = await axiosPublic.get(`/boards`);
      setBoards(response.data);
    } catch (error) {
      console.error("Error fetching boards:", error);
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: "Failed to fetch boards. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchBoards(); // Fetch boards when the component mounts
  }, []);

  const fetchCurrentUser = async () => {
    try {
      if (!currentUser?.email) {
        console.log("Current user email is not available in AuthContext.");
        return;
      }

      const response = await axiosPublic.get(`/user`, {
        params: { email: currentUser.email.trim() },
        headers: {
          Authorization: `Bearer ${yourAuthTokenHere}`, // Add this line
        },
      });
      console.log("Current User:", response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const createBoard = async () => {
    if (!newBoard) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Board name is required!",
      });
      return;
    }
    if (!currentUser?._id) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "User is not authenticated!",
      });
      return;
    }

    const newBoardData = {
      name: newBoard,
      description, // Include description
      visibility,
      theme,
      createdBy: currentUser._id,
      members: [
        {
          userId: currentUser._id,
          name: currentUser.displayName,
          email: currentUser.email, // Include user's email
          role: "member",
        },
      ],
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosPublic.post(`/boards`, newBoardData);
      setIsModalOpen(false);
      setNewBoard("");
      setDescription(""); // Reset description
      setVisibility("Public");
      setTheme("#3b82f6");

      // Refetch boards after creation
      await fetchBoards();

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Board Created",
        text: "Your board has been created successfully!",
      });
    } catch (error) {
      console.error("Error creating board:", error);
      Swal.fire({
        icon: "error",
        title: "Creation Failed",
        text: `Failed to create board: ${
          error.response?.data?.error || error.message
        }`,
      });
    }
  };

  const deleteBoard = async (boardId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        await axiosPublic.delete(`/boards/${boardId}`);
        setBoards(boards.filter((board) => board._id !== boardId));
        Swal.fire("Deleted!", "The board has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting board:", error);
        Swal.fire("Error!", "Failed to delete the board. Please try again.", "error");
      }
    }
  };

  const editBoard = async (updatedBoard) => {
    try {
      await axiosPublic.put(`/boards/${updatedBoard._id}`, updatedBoard);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board._id === updatedBoard._id ? updatedBoard : board
        )
      );
      Swal.fire({
        icon: "success",
        title: "Board Updated",
        text: "The board has been updated successfully!",
      });
    } catch (error) {
      console.error("Error updating board:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update the board. Please try again later.",
      });
    }
  };

  const filteredBoards = boards
    .filter(
      (board) =>
        currentUser &&
        board.members?.some((member) => member.userId === currentUser._id)
    )
    .filter((board) => {
      const lowerCaseQuery = searchQuery?.toLowerCase() || ""; // Ensure searchQuery is a string
      const lowerCaseName = board.name?.toLowerCase() || ""; // Ensure board.name is a string
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBoards.length > 0 ? (
          filteredBoards.map((board) => (
            <BoardCard
              key={board._id}
              board={board}
              onDelete={deleteBoard}
              navigate={navigate}
              onEdit={editBoard} // Pass the edit function
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
    </div>
  );
};

export default Boards;
