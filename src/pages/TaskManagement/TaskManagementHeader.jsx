import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { SiMessenger } from "react-icons/si"; // Import SiMessenger
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function TaskManagementHeader({ board, members, setIsModalOpen }) {
    const navigate = useNavigate(); // Initialize navigate

    return (
        <header className="shadow-md px-4 py-3"
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
                        <ul className="flex flex-wrap gap-1">
                            {members.length === 0 ? (
                                <li className="px-3 py-1 bg-gray-100 rounded shadow text-gray-700">0</li>
                            ) : (
                                members.map((member) => (
                                    <li
                                        key={member.userId}
                                        className="px-3 py-1 bg-gray-100 rounded shadow text-gray-700"
                                    >
                                        {member.name}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    <button
                        onClick={() => navigate(`/dashboard/messenger/${board?._id}`)} // Navigate to messenger
                        className="p-2 bg-primary cursor-pointer text-white rounded  flex items-center"
                    >
                        <SiMessenger className="text-lg" />
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="p-2 bg-primary cursor-pointer text-white rounded  flex items-center"
                    >
                        <FaUserPlus className="text-lg" />
                    </button>
                    
                </div>
            </div>
        </header>
    );
}