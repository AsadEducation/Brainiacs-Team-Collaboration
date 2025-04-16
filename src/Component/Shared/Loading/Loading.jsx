import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-primary text-white">
      <motion.div
        className="w-16 h-16 border-4 border-t-secondary border-white rounded-full animate-spin"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      ></motion.div>
    </div>
  );
};

export default Loading;