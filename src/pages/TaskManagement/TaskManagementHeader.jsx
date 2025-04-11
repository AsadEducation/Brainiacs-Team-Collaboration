import React from "react";
import { FaUserPlus } from "react-icons/fa";

export default function TaskManagementHeader({ board, members, setIsModalOpen }) {
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
                        onClick={() => setIsModalOpen(true)}
                        className="p-2 bg-blue-500 rounded hover:bg-blue-600 flex items-center"
                    >
                        <FaUserPlus className="text-lg" />
                    </button>
                </div>
            </div>
        </header>
    );
}