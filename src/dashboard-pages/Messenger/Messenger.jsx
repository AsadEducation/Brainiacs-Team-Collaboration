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
  FaArrowLeft, // Import icons
  FaArrowRight, // Import icons
} from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { AiOutlineSend } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth"; // Import useAuth
import { MdEmojiEmotions } from "react-icons/md";

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
  const [isUserScrolling, setIsUserScrolling] = useState(false); // Track if the user is scrolling
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [currentPinnedIndex, setCurrentPinnedIndex] = useState(0);
  const [showReactionDropdown, setShowReactionDropdown] = useState(null); // Track which message's reaction dropdown is visible
  const [polls, setPolls] = useState([]); // State to store polls
  const [selectedPollOption, setSelectedPollOption] = useState(null); // Track selected poll option

  useEffect(() => {
    if (currentUser) {
      console.log("Logged-in user data:", currentUser); // Log the logged-in user's data
    }
  }, [currentUser]);

  useEffect(() => {
    // Fetch the list of boards the user is a member of
    fetch("http://localhost:5000/boards")
      .then((res) => res.json())
      .then((data) => {
        const userBoards = data.filter((board) =>
          board.members.some((member) => member.userId === currentUser?._id)
        ); // Filter boards where the user is a member
        setBoards(userBoards);
        if (userBoards.length > 0) {
          const defaultBoard =
            userBoards.find((board) => board._id === boardId) || userBoards[0];
          setSelectedBoard(defaultBoard);
          if (!boardId) {
            navigate(`/dashboard/messenger/${defaultBoard._id}`);
          }
        }
      })
      .catch((err) => console.error("Error fetching boards:", err));
  }, [boardId, currentUser, navigate]);

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
      if (
        attachDropdownRef.current &&
        !attachDropdownRef.current.contains(event.target)
      ) {
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

  const getUnseenMessageCount = (messages) => {
    return messages.filter((msg) => !msg.seenBy?.includes(currentUser._id))
      .length;
  };

  useEffect(() => {
    // Scroll to the last message only if the user is not scrolling up
    if (!isUserScrolling && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

  const markMessageAsSeen = async (messageId) => {
    if (!currentUser || !selectedBoard) return;

    try {
      const response = await fetch(
        `http://localhost:5000/boards/${selectedBoard._id}/messages/${messageId}/seen`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ seenBy: currentUser._id }), // Pass the correct user ID
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
        console.error("Failed to mark message as seen");
      }
    } catch (error) {
      console.error("Error marking message as seen:", error);
    }
  };

  const pinMessage = async (messageId, duration) => {
    if (!currentUser || !selectedBoard) return;

    try {
      const response = await fetch(
        `http://localhost:5000/boards/${selectedBoard._id}/messages/${messageId}/pin`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pinnedBy: currentUser._id,
            pinDuration: duration, // Duration in days
          }),
        }
      );

      if (response.ok) {
        const updatedMessage = await response.json();
        setPinnedMessages((prev) => [...prev, updatedMessage]);
      } else {
        console.error("Failed to pin message");
      }
    } catch (error) {
      console.error("Error pinning message:", error);
    }
  };

  const unpinMessage = async (messageId) => {
    if (!currentUser || !selectedBoard) return;

    try {
      const response = await fetch(
        `http://localhost:5000/boards/${selectedBoard._id}/messages/${messageId}/unpin`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setPinnedMessages((prev) =>
          prev.filter((msg) => msg.messageId !== messageId)
        );
      } else {
        console.error("Failed to unpin message");
      }
    } catch (error) {
      console.error("Error unpinning message:", error);
    }
  };

  const reactToMessage = async (messageId, reaction) => {
    if (!currentUser || !selectedBoard) return;

    try {
      const response = await fetch(
        `http://localhost:5000/boards/${selectedBoard._id}/messages/${messageId}/react`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser._id, reaction }),
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
        console.error("Failed to react to message");
      }
    } catch (error) {
      console.error("Error reacting to message:", error);
    }
  };

  const createPoll = async () => {
    const question = prompt("Enter your poll question:");
    if (!question) return;

    const options = prompt("Enter options separated by commas (e.g., Option1,Option2):");
    if (!options) return;

    const pollData = {
      question,
      options: options.split(",").map((option) => ({ text: option.trim(), votes: [] })),
      createdBy: currentUser._id,
    };

    try {
      const response = await fetch(`http://localhost:5000/boards/${selectedBoard._id}/polls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pollData),
      });

      if (response.ok) {
        const newPoll = await response.json();
        setPolls((prev) => [...prev, newPoll]);
      } else {
        console.error("Failed to create poll");
      }
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  const votePoll = async (pollId, optionIndex) => {
    try {
      const response = await fetch(
        `http://localhost:5000/boards/${selectedBoard._id}/polls/${pollId}/vote`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUser._id, optionIndex }),
        }
      );

      if (response.ok) {
        const updatedPoll = await response.json();
        setPolls((prev) =>
          prev.map((poll) => (poll._id === pollId ? updatedPoll : poll))
        );
      } else {
        console.error("Failed to vote on poll");
      }
    } catch (error) {
      console.error("Error voting on poll:", error);
    }
  };

  useEffect(() => {
    // Filter out expired pinned messages
    const now = new Date();
    setPinnedMessages((prev) =>
      prev.filter((msg) => new Date(msg.pinExpiry) > now)
    );
  }, [messages]);

  const handlePreviousPinned = () => {
    setCurrentPinnedIndex((prev) =>
      prev === 0 ? pinnedMessages.length - 1 : prev - 1
    );
  };

  const handleNextPinned = () => {
    setCurrentPinnedIndex((prev) =>
      prev === pinnedMessages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    // Mark messages as seen when the user views the chat
    if (messages.length > 0) {
      messages.forEach((msg) => {
        if (!msg.seenBy?.includes(currentUser._id)) {
          markMessageAsSeen(msg.messageId);
        }
      });
    }
  }, [messages, currentUser]);

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight < scrollHeight - 10) {
      setIsUserScrolling(true); // User is scrolling up
    } else {
      setIsUserScrolling(false); // User is at the bottom
    }
  };

  const getSeenByNames = (seenBy) => {
    if (!seenBy || seenBy.length === 0) return "No one";

    const otherMembers = members.filter((member) =>
      seenBy.includes(member.userId)
    );
    const otherNames = otherMembers.map((member) => member.name).join(", ");
    const seenByYou = seenBy.includes(currentUser._id) ? "You" : "";

    return [seenByYou, otherNames].filter(Boolean).join(", ");
  };

  return (
    <motion.div
      className="messenger-container flex flex-col md:flex-row h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Chat interface */}
      <motion.div
        className="chat-interface w-full md:w-3/4 p-6 flex flex-col bg-white shadow-lg rounded-lg"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        exit={{ x: -200 }}
        transition={{ duration: 0.5 }}
      >
        {selectedBoard ? (
          <>
            {/* Header */}
            <motion.div
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-xl font-bold text-primary mb-2 md:mb-0"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {selectedBoard.name}
              </motion.h2>
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <button className="text-primary hover:text-accent transition duration-200">
                  <FaPhoneAlt className="text-2xl" />
                </button>
                <button className="text-primary hover:text-accent transition duration-200">
                  <FaVideo className="text-2xl" />
                </button>
                <div className="relative" ref={optionsRef}>
                  <button
                    className="text-primary hover:text-accent transition duration-200"
                    onClick={() => setShowOptions(!showOptions)}
                  >
                    <FaEllipsisV className="text-2xl" />
                  </button>
                  {showOptions && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="py-2">
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-200"
                          onClick={createPoll}
                        >
                          Create Poll
                        </li>
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
            </motion.div>

            {/* Chat Window */}
            <motion.div
              className="chat-window flex-1 rounded-lg overflow-y-scroll bg-gray-100 shadow-inner p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onScroll={handleScroll} // Attach the scroll handler
            >
              {pinnedMessages.length > 0 && (
                <motion.div
                  className="sticky -top-3 bg-yellow-100 p-4 rounded-lg shadow z-10"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center">
                    <button
                      className="text-primary hover:text-accent transition duration-200"
                      onClick={handlePreviousPinned}
                    >
                      <FaArrowLeft className="text-xl" /> {/* Previous icon */}
                    </button>
                    <div className="text-center">
                      <p className="font-bold text-gray-800">
                        {pinnedMessages[currentPinnedIndex]?.text}
                      </p>
                      <p className="text-sm text-gray-600">
                        Pinned by:{" "}
                        {getSenderName(
                          pinnedMessages[currentPinnedIndex]?.pinnedBy
                        )}
                      </p>
                    </div>
                    <button
                      className="text-primary hover:text-accent transition duration-200"
                      onClick={handleNextPinned}
                    >
                      <FaArrowRight className="text-xl" /> {/* Next icon */}
                    </button>
                  </div>
                </motion.div>
              )}
              {messages.length > 0 ? (
                messages.map((msg, index) => {
                  const isSender = msg.senderId === currentUser._id; // Check if the message is from the current user
                  const previousMessage = messages[index - 1];
                  const shouldShowDate =
                    !previousMessage ||
                    new Date(msg.timestamp).toDateString() !==
                      new Date(previousMessage.timestamp).toDateString(); // Show date if it's a new day

                  return (
                    <div
                      key={msg.messageId}
                      ref={
                        index === messages.length - 1 ? lastMessageRef : null
                      } // Attach ref to the last message
                      onClick={() =>
                        setClickedMessageId(
                          clickedMessageId === msg.messageId
                            ? null
                            : msg.messageId
                        )
                      }
                    >
                      {/* Show date if it's a new day */}
                      {shouldShowDate && (
                        <p className="text-center text-gray-500 text-xs mb-4">
                          {formatDate(msg.timestamp)}
                        </p>
                      )}
                      <div
                        className={`mb-6 flex ${
                          isSender ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {isSender && !msg.deletedBy && (
                            <div className="relative">
                              <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent triggering the parent click event
                                  setShowMessageOptions(
                                    showMessageOptions === msg.messageId
                                      ? null
                                      : msg.messageId
                                  );
                                }}
                              >
                                <FaEllipsisV />
                              </button>
                              {showMessageOptions === msg.messageId && (
                                <div className="absolute right-12 -top-10 w-40 bg-white border rounded-lg shadow-lg z-10">
                                  <ul className="py-2">
                                    <li
                                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                      onClick={() => {
                                        const duration = parseInt(
                                          prompt(
                                            "Enter pin duration (1, 3, 7, or 15 days):",
                                            "1"
                                          ),
                                          10
                                        );
                                        if ([1, 3, 7, 15].includes(duration)) {
                                          pinMessage(msg.messageId, duration);
                                        } else {
                                          alert("Invalid duration");
                                        }
                                        setShowMessageOptions(null);
                                      }}
                                    >
                                      Pin
                                    </li>
                                    <li
                                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                      onClick={() => {
                                        const newText = prompt(
                                          "Edit your message:",
                                          msg.text
                                        );
                                        if (newText) {
                                          editMessage(msg.messageId, newText);
                                        }
                                        setShowMessageOptions(null);
                                      }}
                                    >
                                      Edit
                                    </li>
                                    <li
                                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
                          {/* Message bubble */}
                          <div
                            className={`relative max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md p-4 rounded-2xl shadow-lg ${
                              isSender
                                ? "bg-primary text-white rounded-br-none"
                                : "bg-gray-200 text-gray-800 rounded-bl-none"
                            }`}
                          >
                            <p
                              className={`text-xs font-semibold mb-2 ${
                                isSender ? "text-right" : "text-left"
                              }`}
                            >
                              {getSenderName(msg.senderId)}
                            </p>
                            {msg.deletedBy ? (
                              <p className="text-sm italic text-gray-500">
                                Message deleted by {msg.deletedBy} at{" "}
                                {formatTime(msg.deletedAt)}
                              </p>
                            ) : (
                              <>
                                <p className="text-base leading-relaxed">
                                  {msg.text}
                                </p>
                                {msg.reactions &&
                                  Object.keys(msg.reactions).length > 0 && (
                                    <div className="w-8 text-lg mt-2 p-1 rounded-lg">
                                      {Object.entries(msg.reactions).map(
                                        ([emoji, users]) =>
                                          users.includes(currentUser._id)
                                            ? emoji
                                            : null
                                      )}
                                    </div>
                                  )}
                              </>
                            )}
                          </div>
                          {!isSender && !msg.deletedBy && (
                            <div className="relative">
                              <button
                                className="text-gray-500 hover:text-gray-700 text-lg"
                                onClick={() =>
                                  setShowReactionDropdown(
                                    showReactionDropdown === msg.messageId
                                      ? null
                                      : msg.messageId
                                  )
                                }
                              >
                                <MdEmojiEmotions />
                              </button>
                              {showReactionDropdown === msg.messageId && (
                                <div className="absolute -top-18 bg-white rounded-lg shadow-lg z-10 p-2">
                                  <div className="flex gap-2">
                                    {["👍", "❤️", "😂", "😮", "😢", "😡"].map(
                                      (emoji) => (
                                        <div
                                          key={emoji}
                                          className="cursor-pointer hover:bg-gray-100 p-2 rounded text-2xl" // Increased size with text-2xl
                                          onClick={() => {
                                            reactToMessage(
                                              msg.messageId,
                                              emoji
                                            );
                                            setShowReactionDropdown(null);
                                          }}
                                        >
                                          {emoji}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {clickedMessageId === msg.messageId && ( // Show time and seen-by names only if the message is clicked
                        <>
                          <p
                            className={`text-xs text-gray-400 mt-2 ${
                              isSender ? "text-right" : "text-left"
                            }`}
                          >
                            {formatTime(msg.timestamp)}
                          </p>
                          {msg.seenBy?.length > 0 && (
                            <p
                              className={`text-xs text-gray-400 mt-1 ${
                                isSender ? "text-right" : "text-left"
                              }`}
                            >
                              Seen by: {getSeenByNames(msg.seenBy)}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center">No messages yet.</p>
              )}
              {polls.map((poll) => (
                <div key={poll._id} className="poll-container bg-gray-100 p-4 rounded-lg shadow mb-4">
                  <h3 className="font-bold text-lg">{poll.question}</h3>
                  <ul className="mt-2">
                    {poll.options.map((option, index) => (
                      <li key={index} className="flex justify-between items-center mb-2">
                        <span>{option.text}</span>
                        <button
                          className="bg-primary text-white px-3 py-1 rounded"
                          onClick={() => votePoll(poll._id, index)}
                          disabled={option.votes.includes(currentUser._id)}
                        >
                          {option.votes.includes(currentUser._id) ? "Voted" : "Vote"}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2">
                    <h4 className="font-semibold">Results:</h4>
                    {poll.options.map((option, index) => (
                      <p key={index}>
                        {option.text}: {option.votes.length} votes
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Message Input */}
            <motion.div
              className="mt-6 flex flex-col sm:flex-row items-center relative shadow-md p-4 rounded-lg bg-gray-100"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="relative mr-4 mb-4 sm:mb-0"
                ref={attachDropdownRef}
              >
                <button
                  className="text-primary hover:text-accent transition duration-200"
                  onClick={() => setShowAttachDropdown(!showAttachDropdown)}
                >
                  <FaCirclePlus className="text-3xl" />
                </button>
                {showAttachDropdown && (
                  <motion.div
                    className="absolute bottom-full mb-2 left-0 bg-white  rounded-lg shadow-inner shadow-gray-500/80 w-48 z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
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
                  </motion.div>
                )}
              </div>
              <input
                type="text"
                className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <motion.button
                className="ml-4 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary transition duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={sendMessage}
              >
                <AiOutlineSend className="inline-block text-2xl" />
              </motion.button>
            </motion.div>
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
        className="board-list w-full md:w-1/4 bg-white p-6 overflow-y-auto shadow-lg rounded-lg"
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        exit={{ x: 200 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-xl font-bold mb-6 text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your Boards
        </motion.h2>
        <ul className="space-y-4">
          {boards.map((board) => {
            const unseenCount =
              board._id === selectedBoard?._id
                ? getUnseenMessageCount(messages)
                : 0;

            return (
              <motion.li
                key={board._id}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedBoard?._id === board._id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-800"
                } shadow hover:shadow-lg transition duration-200`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBoardSelect(board)}
              >
                {board.name}
                {unseenCount > 0 && (
                  <span className="ml-2 text-sm text-red-500">
                    {unseenCount} unseen
                  </span>
                )}
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Messenger;
