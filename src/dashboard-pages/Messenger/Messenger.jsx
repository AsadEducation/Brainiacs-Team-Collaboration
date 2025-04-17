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
import axios from "axios"; // Import axios
import MessengerHeader from "./MessengerHeader";
import BoardList from "./BoardList";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import SearchMessage from "./SearchMessage"; // Import SearchMessage
import PollCreationModal from "./PollCreationModal"; // Import the new modal

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
  const messageRefs = useRef({}); // Store refs for each message
  const [showPollModal, setShowPollModal] = useState(false); // State for poll modal

  useEffect(() => {
    if (currentUser) {
      console.log("Logged-in user data:", currentUser); // Log the logged-in user's data
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchBoards = async () => {
      if (!currentUser?._id) return; // Ensure currentUser is available

      try {
        const response = await axios.get("https://new-server-brainaics.onrender.com/boards"); // Updated base URL
        const userBoards = response.data.filter((board) =>
          board.members?.some((member) => member.userId === currentUser._id)
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
      } catch (error) {
        console.error("Error fetching boards:", error);
        alert("Failed to fetch boards. Please try again later."); // User-friendly error message
      }
    };

    fetchBoards();
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
    // Fetch messages, members, and polls for the selected board
    const fetchBoardData = async () => {
      if (!selectedBoard) return;

      try {
        const response = await fetch(
          `https://new-server-brainaics.onrender.com/boards/${selectedBoard._id}` // Updated base URL
        );
        if (response.ok) {
          const boardData = await response.json();
          setMessages(boardData.messages || []); // Set messages from the board
          setMembers(boardData.members || []); // Set members from the board
          setPolls((boardData.polls || []).filter((poll) => poll.isActive)); // Filter active polls

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
  }, [selectedBoard]); // Fetch data when selectedBoard changes

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
        `https://new-server-brainaics.onrender.com/boards/${selectedBoard._id}/messages`, // Updated base URL
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
        `https://new-server-brainaics.onrender.com/boards/${selectedBoard._id}/messages/${messageId}`, // Updated base URL
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
        `https://new-server-brainaics.onrender.com/boards/${selectedBoard._id}/messages/${messageId}`, // Updated base URL
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
        `https://new-server-brainaics.onrender.com/boards/${selectedBoard._id}/messages/${messageId}/seen`,
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
        `https://new-server-brainaics.onrender.com/boards/${selectedBoard._id}/messages/${messageId}/pin`,
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
        `https://new-server-brainaics.onrender.com/boards/${selectedBoard._id}/messages/${messageId}/unpin`,
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
    if (!messageId || !currentUser || !selectedBoard) {
      console.error("Invalid messageId or missing user/board context");
      return;
    }

    try {
      const response = await fetch(
        `https://new-server-brainaics.onrender.com/boards/${selectedBoard._id}/messages/${messageId}/react`, // Updated base URL
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
        console.error("Failed to update reaction");
      }
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  const createPoll = () => {
    setShowPollModal(true); // Open the poll creation modal
  };

  const handleCreatePoll = async (pollData) => {
    try {
      const response = await fetch(
        `https://new-server-brainaics.onrender.com/boards/${selectedBoard._id}/polls`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pollData),
        }
      );

      if (response.ok) {
        const newPoll = await response.json();
        setPolls((prev) => [...prev, newPoll]);
        setShowPollModal(false); // Close the modal
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to create poll");
      }
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  const votePoll = async (pollId, optionIndex) => {
    try {
      const response = await fetch(
        `https://new-server-brainaics.onrender.com/boards/${selectedBoard._id}/polls/${pollId}/vote`,
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

  const removePoll = async (pollId) => {
    try {
      const response = await fetch(
        `https://new-server-brainaics.onrender.com/boards/${selectedBoard._id}/polls/${pollId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setPolls((prev) => prev.filter((poll) => poll._id !== pollId)); // Remove poll from state
      } else {
        console.error("Failed to remove poll");
      }
    } catch (error) {
      console.error("Error removing poll:", error);
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

    const otherMembers = members.filter(
      (member) =>
        seenBy.includes(member.userId) && member.userId !== currentUser._id
    );
    const otherNames = otherMembers.map((member) => member.name).join(", ");
    const seenByYou = seenBy.includes(currentUser._id) ? "You" : "";

    return [seenByYou, otherNames].filter(Boolean).join(", ");
  };

  const onScrollToMessage = (messageId) => {
    const messageElement = messageRefs.current[messageId];
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth" });
    }
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
        className="chat-interface w-full md:w-3/4 p-4 sm:p-6 flex flex-col bg-white shadow-lg rounded-lg"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        exit={{ x: -200 }}
        transition={{ duration: 0.5 }}
      >
        {selectedBoard ? (
          <>
            {/* Header */}
            <MessengerHeader
              selectedBoard={selectedBoard}
              showOptions={showOptions}
              setShowOptions={setShowOptions}
              createPoll={createPoll}
              messages={messages} // Pass messages
              onScrollToMessage={onScrollToMessage} // Pass onScrollToMessage
            />
            {/* Chat Window */}
            <ChatWindow
              boardId={selectedBoard._id} // Pass boardId as a prop
              pinnedMessages={pinnedMessages}
              setPinnedMessages={setPinnedMessages} // Pass setPinnedMessages as a prop
              currentPinnedIndex={currentPinnedIndex}
              handlePreviousPinned={handlePreviousPinned}
              handleNextPinned={handleNextPinned}
              messages={messages}
              currentUser={currentUser}
              lastMessageRef={lastMessageRef}
              clickedMessageId={clickedMessageId}
              setClickedMessageId={setClickedMessageId}
              showMessageOptions={showMessageOptions}
              setShowMessageOptions={setShowMessageOptions}
              pinMessage={pinMessage}
              editMessage={editMessage} // Pass editMessage as a prop
              deleteMessage={deleteMessage}
              reactToMessage={reactToMessage}
              showReactionDropdown={showReactionDropdown}
              setShowReactionDropdown={setShowReactionDropdown}
              getSenderName={getSenderName}
              formatDate={formatDate}
              formatTime={formatTime}
              getSeenByNames={getSeenByNames}
              handleScroll={handleScroll}
              setMessages={setMessages} // Pass setMessages as a prop
              messageRefs={messageRefs} // Pass messageRefs to ChatWindow
              polls={polls} // Pass polls as a prop
              votePoll={votePoll} // Pass votePoll as a prop
              removePoll={removePoll} // Pass removePoll as a prop
            />
            {/* Message Input */}
            <MessageInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
              showAttachDropdown={showAttachDropdown}
              setShowAttachDropdown={setShowAttachDropdown}
              attachDropdownRef={attachDropdownRef}
            />
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
        className="board-list w-full md:w-1/4 bg-white p-4 sm:p-6 overflow-y-auto shadow-lg rounded-lg"
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        exit={{ x: 200 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your Boards
        </motion.h2>
        <BoardList
          boards={boards}
          selectedBoard={selectedBoard}
          handleBoardSelect={handleBoardSelect}
          getUnseenMessageCount={getUnseenMessageCount}
          messages={messages}
        />
      </motion.div>
      <PollCreationModal
        isOpen={showPollModal}
        onClose={() => setShowPollModal(false)}
        onCreate={handleCreatePoll}
      />
    </motion.div>
  );
};

export default Messenger;
