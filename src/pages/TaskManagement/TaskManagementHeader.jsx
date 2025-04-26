import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { SiMessenger } from "react-icons/si"; // Import SiMessenger
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios
import Swal from "sweetalert2"; // Import Swal

export default function TaskManagementHeader({
  board,
  members,
  setIsModalOpen,
}) {
  const navigate = useNavigate(); // Initialize navigate

  const addMember = async (newMember) => {
    if (!newMember || !newMember.userId || typeof newMember.userId !== "string") {
      console.error("Invalid member data:", newMember);
      Swal.fire({
        icon: "error",
        title: "Invalid Member Data",
        text: "The member data is incomplete or invalid. Please try again.",
      });
      return;
    }

    try {
      const updatedMembers = [
        ...members,
        {
          userId: newMember.userId,
          email: newMember.email,
          displayName: newMember.displayName,
          photoURL: newMember.photoURL || "/default-avatar.png", // Ensure photoURL is included
          role: "member", // Default role for new members
        },
      ];

      // Update the board with the new member
      await axios.put(`/boards/${board._id}`, { members: updatedMembers });

      Swal.fire({
        icon: "success",
        title: "Member Added",
        text: `${newMember.displayName} has been added successfully!`,
      });
    } catch (error) {
      console.error("Error adding member:", error);
      Swal.fire({
        icon: "error",
        title: "Add Member Failed",
        text: "Failed to add the member. Please try again later.",
      });
    }
  };
  return (
    <header
      className="shadow-md px-4 py-3"
      style={{
        backgroundColor: board?.theme || location.state?.theme || "#f4f5f7",
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">
            {board?.name || "Untitled Board"}
          </h1>
          <p className="text-xs">({board?.visibility || "Public"})</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-gray-700">Members:</h2>
            <ul className="flex flex-wrap gap-1 items-center">
              {members.slice(0, 4).map((member) => (
                <li
                  key={member.userId} // Ensure `userId` is unique
                  className="w-8 h-8 rounded-full overflow-hidden border border-gray-300"
                >
                  <img
                    src={member.photoURL || "/default-avatar.png"} // Fallback to default avatar
                    alt={member.displayName || "Member"} // Use displayName for alt text
                    className="w-full h-full object-cover"
                  />
                </li>
              ))}
              {members.length > 4 && (
                <li className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-sm font-semibold text-gray-700">
                  +{members.length - 4}
                </li>
              )}
            </ul>
          </div>
          <button
            onClick={() => navigate(`/dashboard/messenger/${board?._id}`)} // Navigate to messenger
            className="p-2 bg-primary cursor-pointer text-white rounded flex items-center"
          >
            <SiMessenger className="text-lg" />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 bg-primary cursor-pointer text-white rounded flex items-center"
          >
            <FaUserPlus className="text-lg" />
          </button>
        </div>
      </div>
    </header>
  );
}
