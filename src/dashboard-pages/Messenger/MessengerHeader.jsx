import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaVideo, FaEllipsisV, FaSearch } from "react-icons/fa";

const MessengerHeader = ({
  selectedBoard,
  showOptions,
  setShowOptions,
  messages,
  onScrollToMessage,
  toggleBoardDropdown, // Add toggleBoardDropdown as a prop
  showBoardDropdown, // Add showBoardDropdown as a prop
}) => {
  const optionsRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const results = messages.filter((msg) =>
      msg.text?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setShowModal(true);
  };

  return (
    <motion.div
      className="flex sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 p-4 border-b border-gray-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center gap-2"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-0">
          {selectedBoard.name}
        </h2>
        <button
          className="text-primary hover:text-secondary p-2"
          onClick={toggleBoardDropdown}
        >
          {showBoardDropdown ? "▲" : "▼"}
        </button>
      </motion.div>
      <motion.div
        className="flex items-center gap-2 sm:gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {showSearch ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <button
              onClick={handleSearch}
              className="text-primary hover:text-accent transition duration-200"
            >
              Search
            </button>
            <button
              onClick={() => setShowSearch(false)}
              className="text-primary hover:text-accent transition duration-200"
            >
              ✖
            </button>
          </div>
        ) : (
          <button
            className="text-primary hover:text-accent transition duration-200"
            onClick={() => setShowSearch(true)}
          >
            <FaSearch className="text-xl sm:text-2xl" />
          </button>
        )}
        <button className="text-primary hover:text-accent transition duration-200">
          <FaPhoneAlt className="text-xl sm:text-2xl" />
        </button>
        <button className="text-primary hover:text-accent transition duration-200">
          <FaVideo className="text-xl sm:text-2xl" />
        </button>
        <div className="relative" ref={optionsRef}>
          <button
            className="text-primary hover:text-accent transition duration-200"
            onClick={() => setShowOptions(!showOptions)}
          >
            <FaEllipsisV className="text-xl sm:text-2xl" />
          </button>
          {showOptions && (
            <motion.div
              className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg z-30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-200">
                  Set Nickname
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-200">
                  Add Members
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-200">
                  Leave Group
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-200">
                  Delete Group
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Modal for search results */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 max-w-lg">
            <h3 className="text-lg font-bold mb-4">Search Results</h3>
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((msg) => (
                  <li
                    key={msg.messageId}
                    className="p-2 border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      onScrollToMessage(msg.messageId);
                      setShowModal(false);
                    }}
                  >
                    {msg.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No messages found.</p>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-accent"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MessengerHeader;
