import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import MessengerHeader from "./MessengerHeader";
import BoardList from "./BoardList";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import PollCreationModal from "./PollCreationModal";
import { IoClipboardSharp, IoCloseCircleSharp } from "react-icons/io5";

const Messenger = () => {
  const { currentUser } = useAuth();
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const optionsRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [clickedMessageId, setClickedMessageId] = useState(null);
  const [members, setMembers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showAttachDropdown, setShowAttachDropdown] = useState(false);
  const attachDropdownRef = useRef(null);
  const lastMessageRef = useRef(null);
  const [showMessageOptions, setShowMessageOptions] = useState(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [currentPinnedIndex, setCurrentPinnedIndex] = useState(0);
  const [showReactionDropdown, setShowReactionDropdown] = useState(null);
  const [polls, setPolls] = useState([]);
  const [selectedPollOption, setSelectedPollOption] = useState(null);
  const messageRefs = useRef({});
  const [showPollModal, setShowPollModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showBoardList, setShowBoardList] = useState(false); // State to toggle board list
  const [showBoardDropdown, setShowBoardDropdown] = useState(false); // State for dropdown visibility

  const toggleBoardList = () => {
    setShowBoardList((prev) => !prev);
  };

  const toggleBoardDropdown = () => {
    setShowBoardDropdown((prev) => !prev);
  };

  useEffect(() => {
    if (currentUser) {
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchBoards = async () => {
      if (!currentUser?._id) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/boards`
        );
        const userBoards = response.data.filter((board) =>
          board.members?.some((member) => member.userId === currentUser._id)
        );
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
        alert("Failed to fetch boards. Please try again later.");
      }
    };

    fetchBoards();
  }, [boardId, currentUser, navigate]);

  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
    setShowBoardDropdown(false); // Close dropdown on board selection
    navigate(`/dashboard/messenger/${board._id}`);
  };

  useEffect(() => {
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowBoardDropdown(false); // Close dropdown if clicked outside
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
          `${import.meta.env.VITE_API_URL}/boards/${selectedBoard._id}`
        );
        if (response.ok) {
          const boardData = await response.json();
          setMessages(boardData.messages || []);
          setMembers(boardData.members || []);
          setPolls((boardData.polls || []).filter((poll) => poll.isActive));

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

  const sendMessage = async (messageData) => {
    if (!messageData.text?.trim() && !messageData.attachment) {
      console.warn("Cannot send an empty message without an attachment.");
      return;
    }

    const senderRole =
      selectedBoard.members.find((member) => member.userId === currentUser._id)
        ?.role || "member";

    const fullMessageData = {
      senderId: currentUser._id,
      senderName: currentUser.displayName || currentUser.name,
      role: senderRole,
      text: messageData.text?.trim() || null,
      attachments: messageData.attachment ? [messageData.attachment] : [],
    };

    console.log("Sending message:", fullMessageData);
    console.log(
      "Sender Image URL:",
      currentUser.photoURL || "/default-avatar.png"
    );

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/boards/${selectedBoard._id}/messages`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fullMessageData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setMessages((prevMessages) => [...prevMessages, result.message]);
        setNewMessage("");
      } else {
        const errorData = await response.json();
        console.error("Failed to send message:", errorData);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const editMessage = async (messageId, newText) => {
    if (!newText.trim() || !currentUser || !selectedBoard) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/boards/${
          selectedBoard._id
        }/messages/${messageId}`,
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
        `${import.meta.env.VITE_API_URL}/boards/${
          selectedBoard._id
        }/messages/${messageId}`,
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

    // Log the currentUser._id for debugging
    console.log("Marking message as seen by user:", currentUser._id);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/boards/${
          selectedBoard._id
        }/messages/${messageId}/seen`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ seenBy: currentUser._id }), // Ensure seenBy is sent as a string
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
        const errorData = await response.json();
        console.error("Failed to mark message as seen:", errorData);
      }
    } catch (error) {
      console.error("Error marking message as seen:", error);
    }
  };

  const pinMessage = async (messageId, duration) => {
    if (!currentUser || !selectedBoard) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/boards/${
          selectedBoard._id
        }/messages/${messageId}/pin`,
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
        `${import.meta.env.VITE_API_URL}/boards/${
          selectedBoard._id
        }/messages/${messageId}/unpin`,
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
        `${import.meta.env.VITE_API_URL}/boards/${
          selectedBoard._id
        }/messages/${messageId}/react`, // Updated base URL
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
        `${import.meta.env.VITE_API_URL}/boards/${selectedBoard._id}/polls`,
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
    if (!currentUser?._id) {
      alert("You must be logged in to vote!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/boards/${
          selectedBoard._id
        }/polls/${pollId}/vote`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUser._id,
            optionIndex,
          }),
        }
      );

      if (response.ok) {
        const updatedPoll = await response.json();
        setPolls((prev) =>
          prev.map((poll) => (poll._id === pollId ? updatedPoll : poll))
        );
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to vote");
      }
    } catch (error) {
      console.error("Error voting on poll:", error);
      alert("Failed to vote. Please try again.");
    }
  };

  const removePoll = async (pollId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/boards/${
          selectedBoard._id
        }/polls/${pollId}`,
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

  const getSeenByDetails = (seenBy) => {
    if (!seenBy || seenBy.length === 0) return [];

    return seenBy.map((userId) => {
      const member = members.find((member) => member.userId === userId);
      return {
        name: member ? member.name : "Unknown User",
        photoURL: member
          ? member.photoURL || "/default-avatar.png"
          : "/default-avatar.png",
      };
    });
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
        className="chat-interface w-full p-4 sm:p-6 flex flex-col bg-white shadow-lg rounded-lg"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        exit={{ x: -200 }}
        transition={{ duration: 0.5 }}
      >
        {selectedBoard ? (
          <>
            <MessengerHeader
              selectedBoard={selectedBoard}
              showOptions={showOptions}
              setShowOptions={setShowOptions}
              createPoll={createPoll}
              messages={messages}
              onScrollToMessage={onScrollToMessage}
              toggleBoardDropdown={toggleBoardDropdown} // Pass toggleBoardDropdown
              showBoardDropdown={showBoardDropdown} // Pass showBoardDropdown
            />
            <ChatWindow
              boardId={selectedBoard._id}
              pinnedMessages={pinnedMessages}
              setPinnedMessages={setPinnedMessages}
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
              editMessage={editMessage}
              deleteMessage={deleteMessage}
              reactToMessage={reactToMessage}
              showReactionDropdown={showReactionDropdown}
              setShowReactionDropdown={setShowReactionDropdown}
              getSenderName={getSenderName}
              formatDate={formatDate}
              formatTime={formatTime}
              getSeenByDetails={getSeenByDetails}
              handleScroll={handleScroll}
              setMessages={setMessages}
              messageRefs={messageRefs}
              polls={polls}
              votePoll={votePoll}
              removePoll={removePoll}
              setPolls={setPolls}
              members={members} // Pass members as a prop
            />
            <MessageInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
              showAttachDropdown={showAttachDropdown}
              setShowAttachDropdown={setShowAttachDropdown}
              attachDropdownRef={attachDropdownRef}
              setSelectedFile={setSelectedFile}
              createPoll={createPoll} // Pass createPoll to MessageInput
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

      {/* Board list dropdown */}
      <div className="relative">
        <motion.div
          ref={dropdownRef}
          className={`fixed top-16 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-11/12 sm:w-96 z-40 ${
            showBoardDropdown ? "block" : "hidden"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: showBoardDropdown ? 1 : 0,
            y: showBoardDropdown ? 0 : -20,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            className="text-lg font-bold mb-4 text-primary"
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
      </div>

      <PollCreationModal
        isOpen={showPollModal}
        onClose={() => setShowPollModal(false)}
        onCreate={handleCreatePoll}
        currentUser={currentUser}
      />
    </motion.div>
  );
};
export default Messenger;
