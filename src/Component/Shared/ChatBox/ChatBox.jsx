import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { BiChat, BiSend } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import logo from "../../../assets/brainiacs.png";
import { GoogleGenAI } from "@google/genai";
import chatShadow from "../../../assets/chat_shadow.png";
import chatLogo from "../../../assets/chat_logo.png";

const geminiApiKey = import.meta.env.VITE_gemini_api_key;
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

const ChatBox = () => {
  const [aiLoading, setAiLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hey! How can I help?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  // const [showMenu, setShowMenu] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);

    // sending command to gemini
    setAiLoading(true);
    handleGemini(input);

    setInput("");
  };
  const handleGemini = async (input) => {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: input,
    });
    setMessages((prev) => [...prev, { text: response.text, sender: "bot" }]);
    setAiLoading(false);
  };

  // motion animation for button starts

  const controls = useAnimation();
  const controls2 = useAnimation();

  useEffect(() => {
    // Start the infinite bounce
    controls.start({
      y: [0, -20, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    });
    controls2.start({
      scale: [1, 1.3, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    });
  }, [controls]);

  const handleMouseEnter = () => {
    controls.stop(); // Stops and freezes at current position
    controls2.stop(); // Stops and freezes at current position
  };

  const handleMouseLeave = () => {
    controls.start({
      y: [0, -20, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    });
    controls2.start({
      scale: [1, 1.3, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    });
  };

  // motion animation for button ends

  return (
    <motion.div className="fixed bottom-10 right-10 flex flex-col items-end z-50">
      {/* ai bot button  */}
      <motion.div
        animate={controls}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={`bg-gradient-to-r from-[#2e5077] to-sky-500 p-4 rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform ${
            isOpen && "hidden"
          } flex gap-2 `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-white text-xl font-medium">Ai Bot</span>
          <BiChat className="text-3xl text-white" />
        </button>
      </motion.div>
      {/* button shadow  */}
      <motion.div className={`w-32 ${isOpen && "hidden"}`} animate={controls2}>
        <img className="w-full opacity-50" src={chatShadow} alt="" />
      </motion.div>

      {isOpen && (
        <motion.div className="w-full max-w-sm bg-white shadow-xl rounded-xl mt-2  flex flex-col">
          {/* Chat Header */}
          <div className="flex justify-between items-center rounded-t-xl bg-gradient-to-r from-sky-600  to-sky-800 p-3 ">
            <div className="flex items-center gap-2">
              <img
                src={chatLogo}
                alt="Team Logo"
                className="w-7 h-7 rounded-full object-cover"
              />
              <h2 className="text-white font-bold truncate">
                Brainiacs Ai Bot
              </h2>
            </div>
            <div className="relative">
              {/* this is the chat box close button */}
              <button
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => setIsOpen(false)}
              >
                <CgClose className="text-xl " />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="h-64  w-xs overflow-y-auto mb-2 p-4 py-2 rounded bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300"
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`p-2 my-1 text-base  rounded-md max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto self-end text-right rounded-br-md"
                    : "bg-gray-200 text-gray-700 self-start text-left rounded-bl-md"
                }`}
                initial={{ x: msg.sender === "user" ? 50 : -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {msg.text}
              </motion.div>
            ))}
            {aiLoading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
          </div>

          {/* Input Field */}
          <div className="flex gap-[6px] items-center p-3 pt-0 pb-4 rounded-b-xl  ">
            <input
              autoFocus
              className="w-full rounded-full border border-gray-300 px-4 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />
            <button
              className="bg-sky-600 text-white p-[6px] rounded-full hover:bg-blue-600"
              onClick={sendMessage}
            >
              <BiSend className="text-lg" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChatBox;
