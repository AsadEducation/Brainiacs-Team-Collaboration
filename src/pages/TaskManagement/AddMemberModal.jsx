import React from "react";
import Modal from "react-modal"; // Add this import

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
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Add Member Modal"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <h2 className="text-lg font-semibold mb-4">Add Member</h2>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for users..."
                className="w-full p-2 border rounded mb-4"
            />
            <ul>
                {suggestedUsers.map((user) => (
                    <li
                        key={user.id || user.email}
                        className="p-2 border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => handleUserSelect(user)}
                    >
                        <h6 className="text-lg">{user.name}</h6>
                        <p className="text-xs">({user.email})</p>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
                <h3 className="text-md font-semibold mt-4">Selected Users</h3>
                <h3>({selectedUsers.length})</h3>
            </div>
            <ul>
                {selectedUsers.map((user) => (
                    <li
                        key={user.id || user.email}
                        className="p-2 border-b flex justify-between items-center"
                    >
                        <span>
                            <h6 className="text-lg">{user.name}</h6>
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
                    onClick={handleAddSelectedUsers}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add
                </button>
            </div>
        </Modal>
    );
}