import React from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div>
      <div className="bg-indigo-900 relative overflow-hidden h-screen">
        <img
          src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9"
          className="absolute h-full w-full object-cover"
        />
        <div className="inset-0 bg-black opacity-50 absolute"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center h-full">
          <div className="w-full font-mono flex flex-col items-center relative z-10">
            <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
              You are all alone here
            </h1>
            <p className="font-extrabold text-8xl my-16 text-white animate-bounce">
              404
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mt-8 px-6 py-3 bg-white text-indigo-900 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition"
              onClick={() => (window.location.href = "/")}
            >
              Join your team
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
