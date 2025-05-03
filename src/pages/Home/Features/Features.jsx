import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import realTimeAnimation from "../../../assets/realtime.json"; // Update with the correct path
import fileShareAnimation from "../../../assets/fileshare.json"; // Update with the correct path
import chatVideoAnimation from "../../../assets/chat&video.json"; // Update with the correct path
import taskManagementAnimation from "../../../assets/taskmanagement.json"; // Update with the correct path
import "./Features.css";
const featuresData = [
  {
    id: 1,
    title: "Real-Time Collaboration",
    description:
      "Work together seamlessly with live document editing, task management, and instant updates for your team.",
    image: "/feature-images/real-time.avif",
  },
  {
    id: 2,
    title: "Secure File Sharing",
    description:
      "Share and store files securely with cloud-based access control, ensuring privacy and data protection.",
    image: "/feature-images/secure-file.avif",
  },
  {
    id: 3,
    title: "Integrated Chat & Video Calls",
    description:
      "Stay connected with built-in messaging, voice, and video calls for smooth team communication.",
    image: "/feature-images/video-call.jpg",
  },
  {
    id: 4,
    title: "Task & Project Management",
    description:
      "Organize your workflow with to-do lists, kanban boards, and progress tracking for better productivity.",
    image: "/feature-images/project-management.jpg",
  },
];
const fadeVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};
export default function Features() {
  return (
    <section className="px-6 py-8 space-y-6">
      {featuresData.map((feature, index) => (
        <motion.div
          key={feature.id}
          className={`flex items-center justify-between p-6 rounded-lg shadow-lg h-screen flex-col sm:${
            index % 2 === 0 ? "flex-row" : "flex-row-reverse"
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full max-w-xs sm:max-w-sm lg:max-w-md items-center justify-center"
          >
            <div>
              {feature.id === 1 ? (
                <Lottie
                  animationData={realTimeAnimation}
                  className="w-full h-auto"
                />
              ) : feature.id === 2 ? (
                <Lottie
                  animationData={fileShareAnimation}
                  className="w-full h-auto"
                />
              ) : feature.id === 3 ? (
                <Lottie
                  animationData={chatVideoAnimation}
                  className="w-full h-auto"
                />
              ) : feature.id === 4 ? (
                <Lottie
                  animationData={taskManagementAnimation}
                  className="w-full h-auto"
                />
              ) : (
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              )}
            </div>
          </motion.div>
          <div className="flex-1 ml-6">
            <h3 className="text-3xl sm:text-4xl font-bold">{feature.title}</h3>
            <p className="text-lg sm:text-xl mt-4">{feature.description}</p>
            <button className="mt-6 text-blue-800 hover:text-blue-300 transition text-lg sm:text-xl">
              Learn more →
            </button>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
