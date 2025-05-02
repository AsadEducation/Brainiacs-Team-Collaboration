import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCirclePlus, FaSquarePollVertical } from "react-icons/fa6";
import { AiOutlineSend, AiOutlineClose } from "react-icons/ai"; // Import close icon
import { uploadFile } from "../../utils/Upload"; // Import the upload function

const MessageInput = ({
  newMessage,
  setNewMessage,
  sendMessage,
  showAttachDropdown,
  setShowAttachDropdown,
  attachDropdownRef,
  setSelectedFile, // Removed default no-op function
  createPoll, // Add createPoll as a prop
}) => {
  const [fileName, setFileName] = useState(""); // State to store selected file name
  const [selectedFile, setLocalSelectedFile] = useState(null); // Local state for selected file
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        attachDropdownRef.current &&
        !attachDropdownRef.current.contains(event.target)
      ) {
        setShowAttachDropdown(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Set the file name
      setLocalSelectedFile(file); // Set the local selected file
      setSelectedFile(file); // Pass the selected file to the parent
      setShowAttachDropdown(false); // Close the dropdown
    }
  };

  // Function to handle file removal
  const handleFileRemove = () => {
    setFileName(""); // Clear the file name
    setLocalSelectedFile(null); // Reset the local selected file
    setSelectedFile(null); // Reset the parent selected file
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedFile) {
      console.warn("Cannot send an empty message without an attachment.");
      return; // ব্লক করবে শুধুমাত্র যখন টেক্সটও নাই, ফাইলও নাই
    }

    setIsLoading(true); // Set loading to true
    let attachmentUrl = null;

    if (selectedFile) {
      try {
        const uploadResponse = await uploadFile(
          selectedFile,
          selectedFile.name
        ); // Upload file to ImageKit
        attachmentUrl = uploadResponse.url; // Get the uploaded file's URL
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsLoading(false); // Reset loading state on error
        return; // Stop if the file upload fails
      }
    }

    try {
      await sendMessage({
        text: newMessage.trim() || null, // Pass null if no text
        attachment: attachmentUrl, // Pass the attachment URL to the sendMessage function
      });

      // Clear file and message input after sending
      setFileName(""); // Clear the file name
      setLocalSelectedFile(null); // Reset the local selected file
      setSelectedFile(null); // Reset the parent selected file
      setNewMessage(""); // Clear the message input
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <motion.div
      className="mt-4 sm:mt-6 flex sm:flex-row items-center relative shadow-md p-4 rounded-lg bg-gray-100 gap-6 md:gap-0"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {fileName && (
        <div className="absolute -top-10 left-15.5 w-[643px] flex items-center justify-between  mb-4 py-4 px-2 bg-primary rounded-lg z-20">
          <p className="text-sm text-white truncate">{fileName}</p>
          <button
            className="ml-2 text-white hover:text-red-500 transition duration-200 cursor-pointer"
            onClick={handleFileRemove}
          >
            <AiOutlineClose className="text-lg" />
          </button>
        </div>
      )}
      <div className="relative mr-0 sm:mr-4" ref={attachDropdownRef}>
        {/* Create Poll Button */}
        <button
          className="text-primary hover:text-accent transition duration-200 mr-4"
          onClick={createPoll}
        >
          <FaSquarePollVertical className="text-2xl sm:text-3xl" />
        </button>
        <button
          className="text-primary hover:text-accent transition duration-200"
          onClick={() => setShowAttachDropdown(!showAttachDropdown)}
        >
          <FaCirclePlus className="text-2xl sm:text-3xl" />
        </button>
        {showAttachDropdown && (
          <motion.div
            className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-inner shadow-gray-500/80 w-40 sm:w-48 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <label className="cursor-pointer">
                  Attach File
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
      <input
        type="text"
        className="flex-1 border-none shadow-inner shadow-gray-500/80 rounded-lg p-2 sm:p-3"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent newline
            handleSendMessage();
          }
        }}
      />
      {(newMessage.trim() || selectedFile) && (
        <motion.button
          className={`ml-0 sm:ml-4 mt-4 sm:mt-0 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary transition duration-200 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          whileHover={!isLoading ? { scale: 1.1 } : {}}
          whileTap={!isLoading ? { scale: 0.9 } : {}}
          onClick={handleSendMessage}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <motion.span
              className="inline-block text-xl sm:text-2xl"
              animate={{
                x: [0, 50, 100, 200],
              }}
              transition={{
                duration: 1, // Duration of the animation
                ease: "easeInOut", // Smooth transition
              }}
            >
              <AiOutlineSend className="inline-block text-lg sm:text-xl" />
            </motion.span>
          ) : (
            <AiOutlineSend className="inline-block text-xl sm:text-2xl" />
          )}
        </motion.button>
      )}
    </motion.div>
  );
};

export default MessageInput;
