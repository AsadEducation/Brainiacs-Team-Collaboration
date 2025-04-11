import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEllipsisV,
  FaFileUpload,
  FaImage,
  FaPhoneAlt,
  FaPoll,
  FaVideo,
} from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { AiOutlineSend } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth"; // Import useAuth

const Messenger = () => {
  const { currentUser } = useAuth(); // Access currentUser from AuthContext
  const { boardId } = useParams();
  const navigate = useNavigate(); 
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const optionsRef = useRef(null); // Add this line
  const [messages, setMessages] = useState([]);
  const [clickedMessageId, setClickedMessageId] = useState(null);
  const [members, setMembers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showAttachDropdown, setShowAttachDropdown] = useState(false); // State for dropdown visibility
  const attachDropdownRef = useRef(null); // Ref for dropdown
  const lastMessageRef = useRef(null); // Ref for the last message
  const [showMessageOptions, setShowMessageOptions] = useState(null); // State to track which message's options are visible

  useEffect(() => {
    if (currentUser) {
      console.log("Logged-in user data:", currentUser); // Log the logged-in user's data
    }
  }, [currentUser]);

  useEffect(() => {
    // Fetch the list of boards the user is a member of
    fetch("http://localhost:5000/boards") // Updated API endpoint
      .then((res) => res.json())
      .then((data) => {
        setBoards(data);
        if (data.length > 0) {
          const defaultBoard =
            data.find((board) => board._id === boardId) || data[0];
          setSelectedBoard(defaultBoard); // Set the board based on route or default to the first board
          if (!boardId) {
            navigate(`/dashboard/messenger/${defaultBoard._id}`); // Redirect to the first board if no boardId is provided
          }
        }
      })
      .catch((err) => console.error("Error fetching boards:", err));
  }, [boardId, navigate]);

  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
    navigate(`/dashboard/messenger/${board._id}`); // Navigate to the selected board
  };

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
      if (attachDropdownRef.current && !attachDropdownRef.current.contains(event.target)) {
        setShowAttachDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Fetch messages and members for the selected board
    const fetchBoardData = async () => {
      if (!selectedBoard) return;

      try {
        const response = await fetch(
          `http://localhost:5000/boards/${selectedBoard._id}`
        );
        if (response.ok) {
          const boardData = await response.json();
          setMessages(boardData.messages || []); // Set messages from the board
          setMembers(boardData.members || []); // Set members from the board

          // Update selectedBoard to include members
          setSelectedBoard((prevBoard) => ({
            ...prevBoard,
            members: boardData.members || [],
          }));
        } else {
          console.error("Failed to fetch board data");
        }
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };

    fetchBoardData();
  }, [selectedBoard]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const shouldShowDate = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;
    const currentDate = new Date(currentMessage.timestamp).toDateString();
    const previousDate = new Date(previousMessage.timestamp).toDateString();
    return currentDate !== previousDate;
  };

  const getSenderName = (senderId) => {
    const member = members.find((member) => member.userId === senderId);
    return member ? member.name : "Unknown User";
  };

  const logSenderData = (senderId) => {
    const sender = members.find((member) => member.userId === senderId);
    if (sender) {
      console.log("Sender Data:", sender);
    } else {
      console.log("Sender not found for ID:", senderId);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !selectedBoard) return; // Prevent sending empty messages or if user/board is not available

    // Determine the sender's role
    const senderRole =
      currentUser._id === selectedBoard.createdBy ? "admin" : "member";

    const messageData = {
      senderId: currentUser._id, // Use currentUser's ID
      senderName: currentUser.name, // Use currentUser's name
      role: senderRole, // Add the sender's role
      text: newMessage.trim(),
      attachments: [], // Add attachment handling if needed
    };

    console.log("Sending message:", messageData); // Log the message data

    try {
      const response = await fetch(
        `http://localhost:5000/boards/${selectedBoard._id}/messages`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setMessages((prevMessages) => [...prevMessages, result.message]); // Append the new message
        setNewMessage(""); // Clear the input field

        // Scroll to the last message
        setTimeout(() => {
          if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const editMessage = async (messageId, newText) => {
    if (!newText.trim() || !currentUser || !selectedBoard) return;
  
    try {
      const response = await fetch(
        `http://localhost:5000/boards/${selectedBoard._id}/messages/${messageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newText.trim() }),
        }
      );
  
      if (response.ok) {
        const updatedMessage = await response.json();
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.messageId === messageId ? updatedMessage : msg
          )
        );
      } else {
        console.error("Failed to edit message");
      }
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };
  
  const deleteMessage = async (messageId) => {
    if (!currentUser || !selectedBoard) return;
  
    try {
      const response = await fetch(
        `http://localhost:5000/boards/${selectedBoard._id}/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deletedBy: currentUser.name,
            deletedAt: new Date().toISOString(),
          }),
        }
      );
  
      if (response.ok) {
        const updatedMessage = await response.json();
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.messageId === messageId ? updatedMessage : msg
          )
        );
      } else {
        console.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  

  return (
    <div className="messenger-container flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Chat interface */}
      <motion.div
        className="chat-interface w-full md:w-3/4 p-4 flex flex-col bg-white shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {selectedBoard ? (
          <>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b pb-2">
              <motion.h2
                className="text-lg font-bold text-primary mb-2 md:mb-0"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {selectedBoard.name}
              </motion.h2>
              <div className="flex items-center gap-4">
                <button className="text-primary hover:text-accent">
                  <FaPhoneAlt className="text-xl" />
                </button>
                <button className="text-primary hover:text-accent">
                  <FaVideo className="text-xl" />
                </button>
                <div className="relative" ref={optionsRef}>
                  <button
                    className="text-primary hover:text-accent"
                    onClick={() => setShowOptions(!showOptions)}
                  >
                    <FaEllipsisV className="text-xl" />
                  </button>
                  {showOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                      <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Create Poll
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Set Nickname
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Add Members
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Leave Group
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Delete Group
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chat Window */}
            <div className="chat-window flex-1 border rounded-lg overflow-y-scroll bg-gray-50 shadow-inner p-4">
              {messages.length > 0 ? (
                messages.map((msg, index) => {
                  const isSender = msg.senderId === currentUser._id; // Check if the message is from the current user
                  const previousMessage = messages[index - 1];
                  const shouldShowDate = !previousMessage || 
                    new Date(msg.timestamp).toDateString() !== new Date(previousMessage.timestamp).toDateString(); // Show date if it's a new day

                  return (
                    <div
                      key={msg.messageId}
                      ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to the last message
                    >
                      {/* Show date if it's a new day */}
                      {shouldShowDate && (
                        <p className="text-center text-gray-500 text-xs mb-2">
                          {formatDate(msg.timestamp)}
                        </p>
                      )}
                      <div
                        className={`mb-4 flex ${isSender ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className="flex flex-row-reverse items-center gap-2"
                          onClick={() =>
                            setClickedMessageId(
                              clickedMessageId === msg.messageId ? null : msg.messageId
                            )
                          } // Toggle clickedMessageId on click
                        >
                          <div
                            className={`relative max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md p-4 rounded-2xl shadow-lg cursor-pointer ${
                              isSender
                                ? "bg-primary text-white rounded-br-none text-right" // Align outgoing messages to the end
                                : "bg-gray-200 text-gray-800 rounded-bl-none text-left" // Align incoming messages to the start
                            }`}
                          >
                            <p className={`text-sm font-semibold mb-1 ${isSender ? "text-end" : "text-start"}`}>
                              {getSenderName(msg.senderId)}
                            </p>
                            {msg.deletedBy ? (
                              <p className="text-sm italic text-gray-500">
                                Message deleted by {msg.deletedBy} at {formatTime(msg.deletedAt)}
                              </p>
                            ) : (
                              <>
                                <p className="text-base leading-relaxed">{msg.text}</p>
                                {clickedMessageId === msg.messageId && ( // Show time only if the message is clicked
                                  <p className={`text-xs text-gray-400 mt-2 ${isSender ? "text-right" : "text-left"}`}>
                                    {formatTime(msg.timestamp)}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                          {isSender && !msg.deletedBy && (
                            <div className="relative">
                              <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent triggering the parent click event
                                  setShowMessageOptions(
                                    showMessageOptions === msg.messageId ? null : msg.messageId
                                  );
                                }}
                              >
                                <FaEllipsisV />
                              </button>
                              {showMessageOptions === msg.messageId && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                                  <ul className="py-2">
                                    <li
                                      className="px-4 py-2 text-black cursor-pointer"
                                      onClick={() => {
                                        const newText = prompt("Edit your message:", msg.text);
                                        if (newText !== null) editMessage(msg.messageId, newText);
                                        setShowMessageOptions(null);
                                      }}
                                    >
                                      Edit
                                    </li>
                                    <li
                                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                                      onClick={() => {
                                        deleteMessage(msg.messageId);
                                        setShowMessageOptions(null);
                                      }}
                                    >
                                      Delete
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center">No messages yet.</p>
              )}
            </div>

            {/* Message Input */}
            <div className="mt-4 flex flex-col sm:flex-row items-center relative">
              <div className="relative mr-2 mb-2 sm:mb-0" ref={attachDropdownRef}>
                <button
                  className="text-primary hover:text-accent"
                  onClick={() => setShowAttachDropdown(!showAttachDropdown)}
                >
                  <FaCirclePlus className="text-2xl" />
                </button>
                {showAttachDropdown && (
                  <div className="absolute bottom-full mb-2 left-0 bg-white border rounded-lg shadow-lg w-48 z-10">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Attach File
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Attach Image
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Create Poll
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Other Options
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <input
                type="text"
                className="flex-1 border rounded-lg p-2 mb-2 sm:mb-0 sm:mr-2"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="text-primary text-2xl px-4 py-2 rounded-lg"
                onClick={sendMessage}
              >
                <AiOutlineSend className="inline-block" /></button>
            </div>
          </>
        ) : (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Please select a board to start chatting.
          </motion.p>
        )}
      </motion.div>

      {/* Sidebar with board list */}
      <motion.div
        className="board-list w-full md:w-1/4 bg-white p-4 overflow-y-auto shadow-lg"
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-bold mb-4 text-primary">Your Boards</h2>
        <ul className="space-y-2">
          {boards.map((board) => (
            <motion.li
              key={board._id}
              className={`p-3 rounded-lg cursor-pointer ${
                selectedBoard?._id === board._id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800"
              } shadow hover:shadow-lg`}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleBoardSelect(board)}
            >
              {board.name}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Messenger;
