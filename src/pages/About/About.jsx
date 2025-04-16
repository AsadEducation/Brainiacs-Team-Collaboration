import React from 'react';
import { motion } from 'framer-motion';
import teamwork from "../../assets/teamwork.jpg";

const About = () => {
  return (
    <div className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-0 min-h-screen">
      {/* Banner Section */}
      <motion.section
        className="bg-primary text-white pt-32 sm:pt-40 md:pt-54 pb-40 sm:pb-48 md:pb-60"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">About Us</h1>
          <p className="mt-4 text-base sm:text-lg">
            Discover how Brainiacs empowers teamwork and collaboration.
          </p>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Brainiacs is a platform designed to revolutionize team
              collaboration. Our mission is to provide tools that make teamwork
              seamless, efficient, and enjoyable.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4 text-sm sm:text-base">
              From task management to real-time communication, we bring
              everything your team needs into one place, so you can focus on
              achieving your goals.
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={teamwork}
              alt="Teamwork"
              className="rounded-lg shadow-lg w-full"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">
                Innovation
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We constantly innovate to bring you the best tools for
                collaboration.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">
                Teamwork
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We believe in the power of teamwork to achieve great things.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">
                Excellence
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We strive for excellence in everything we do.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
