import React from "react";
import Modal from "react-modal"; // Add this import
import { toast } from "react-toastify"; // Import toast
import Swal from "sweetalert2"; // Import SweetAlert2

export default function AddMemberModal({
  isModalOpen,
  setIsModalOpen,
  searchQuery,
  setSearchQuery,
  suggestedUsers,
  handleSearchChange,
  handleUserSelect,
  selectedUsers,
  handleRemoveSelectedUser,
  handleAddSelectedUsers,
}) {
  const handleUserSelectWithCheck = (user) => {
    if (selectedUsers.length >= 4) {
      Swal.fire({
        icon: "warning",
        title: "Limit Reached",
        text: "You cannot add more than 4 members.",
      });
      return;
    }

    if (selectedUsers.some((selected) => selected.id === user.id)) {
      Swal.fire({
        icon: "warning",
        title: "Duplicate Member",
        text: "This member is already added!",
      });
      return;
    }

    handleUserSelect(user);
  };

  const handleAddMemberClick = () => {
    if (selectedUsers.length > 4) {
      toast.error(
        "You cannot add more than 4 members. Please upgrade your membership."
      );
      return;
    }
    handleAddSelectedUsers();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel="Add Member Modal"
      className="modal-content max-w-lg w-full mx-auto p-4 bg-white rounded shadow-lg overflow-y-auto max-h-[90vh]" // Add responsive styles
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-lg font-semibold mb-4">Add Member</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for users..."
        className="w-full p-2 border rounded mb-4"
      />
      <ul className="max-h-40 overflow-y-auto border rounded">
        {(Array.isArray(suggestedUsers) ? suggestedUsers : []).map((user) => (
          <li
            key={user.id || user.email}
            className="p-2 border-b cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            onClick={() => handleUserSelectWithCheck(user)} // Use the new handler
          >
            <img
              src={user.photoURL || "/assets/default-avatar.png"} // Use a locally hosted default avatar
              alt={user.name || user.displayName}
              className="w-8 h-8 rounded-full object-cover border"
            />
            <div>
              <h6 className="text-lg">{user.name || user.displayName}</h6>
              <p className="text-xs text-gray-500">({user.email})</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-md font-semibold mt-4">Selected Users</h3>
        <h3>({selectedUsers.length})</h3>
      </div>
      <ul className="max-h-40 overflow-y-auto border rounded">
        {selectedUsers.map((user) => (
          <li
            key={user.id || user.email}
            className="p-2 border-b flex justify-between items-center"
          >
            <span>
              <h6 className="text-lg">{user.name || user.displayName}</h6>
              <p className="text-xs">({user.email})</p>
            </span>
            <button
              onClick={() => handleRemoveSelectedUser(user.id)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
        <button
          onClick={handleAddMemberClick} // Use the new handler
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </Modal>
  );
}
