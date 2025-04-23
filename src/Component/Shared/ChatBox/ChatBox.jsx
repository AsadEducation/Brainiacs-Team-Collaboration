import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BiChat, BiSend } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import logo from "../../../assets/brainiacs.png";
import { GoogleGenAI } from "@google/genai";

const geminiApiKey = import.meta.env.VITE_gemini_api_key;
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hey! How can I help?", sender: "bot" }]);
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
     setMessages((prev)=>[...prev, { text: input, sender: "user" }]);

    // sending command to gemini 
    handleGemini(input)

    setInput("");
  };
  console.log(messages,"message")
  const handleGemini = async (input) => {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: input,
    });
    setMessages((prev)=>[...prev, { text: response.text, sender: "bot" }])
  }

  return (
    <motion.div className="fixed bottom-5 right-5 flex flex-col items-end z-50">
      <button className={`bg-secondary p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform ${isOpen && "hidden"}`} onClick={() => setIsOpen(!isOpen)}>
        <BiChat className="text-3xl text-white" />
      </button>

      {isOpen && (
        <motion.div  className="w-full max-w-sm bg-white shadow-xl rounded-xl mt-2 p-4 flex flex-col">
          {/* Chat Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Team Logo" className="w-8 h-8 rounded-full object-cover" />
              <h2 className="text-base font-bold truncate">Brainiacs Ai Bot</h2>
            </div>
            <div className="relative">


              {/* this is the chat box close button */}
              <button className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => setIsOpen(false)}>
                <CgClose className="text-xl " />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="h-64  w-xs overflow-y-auto my-2 p-2 border rounded bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`p-2 my-1 text-sm font-light rounded-lg max-w-[80%] ${msg.sender === "user"
                  ? "bg-blue-500 text-white ml-auto self-end text-right rounded-br-md"
                  : "bg-gray-200 text-black self-start text-left rounded-bl-md"
                  }`}
                initial={{ x: msg.sender === "user" ? 50 : -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>

          {/* Input Field */}
          <div className="flex gap-2 items-center">
            <input autoFocus
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />
            <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600" onClick={sendMessage}>
              <BiSend className="text-xl" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChatBox;
