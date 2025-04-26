import React from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    <section className="px-6 h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory scrollbar-hide">
      {featuresData.map((feature) => (
        <motion.div
          key={feature.id}
          className="snap-start grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-[300px] md:h-[400px] w-full"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
          <div className="text-white space-y-4 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
            <p className="text-gray-300 text-base md:text-lg">
              {feature.description}
            </p>
            <button className="mt-4 text-blue-400 hover:text-blue-300 transition">
              Learn more →
            </button>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
