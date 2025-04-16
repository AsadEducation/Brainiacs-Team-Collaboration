import React from "react";
import { motion } from "framer-motion";
import serviceImage1 from "../../assets/Task Management.jpg";
import serviceImage2 from "../../assets/realTime.jpg";
import serviceImage3 from "../../assets/Team-Collaboration.jpg";

const Services = () => {
  const services = [
    {
      title: "Task Management",
      description:
        "Organize, prioritize, and track your team's tasks effortlessly. Our intuitive task management tools ensure your team stays on top of deadlines and delivers results.",
      image: serviceImage1,
    },
    {
      title: "Real-Time Communication",
      description:
        "Collaborate seamlessly with real-time messaging, video calls, and file sharing. Stay connected with your team no matter where you are.",
      image: serviceImage2,
    },
    {
      title: "Team Collaboration",
      description:
        "Bring your team together with shared boards, project timelines, and collaborative tools. Achieve your goals faster with streamlined teamwork.",
      image: serviceImage3,
    },
  ];

  return (
    <motion.div
      className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-0 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header Section */}
      <motion.section
        className="bg-primary text-white pt-32 sm:pt-40 md:pt-54 pb-40 sm:pb-48 md:pb-60"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Our Services
          </h1>
          <p className="mt-4 text-base sm:text-lg">
            Explore the tools and features that make Brainiacs the ultimate
            platform for teamwork and collaboration.
          </p>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="container mx-auto py-8 sm:py-12 px-4 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="bg-white py-12 sm:py-16 md:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="container mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Why Choose Brainiacs?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              className="p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">
                User-Friendly Interface
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our platform is designed with simplicity in mind, making it easy
                for teams to get started and stay productive.
              </p>
            </motion.div>
            <motion.div
              className="p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">
                Secure & Reliable
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Your data is safe with us. We prioritize security and ensure
                reliable performance for all users.
              </p>
            </motion.div>
            <motion.div
              className="p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">
                Customizable Solutions
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Tailor Brainiacs to fit your team's unique needs with flexible
                features and integrations.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="bg-primary text-white py-12 sm:py-16 md:py-20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="container mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Transform Your Teamwork?
          </h2>
          <p className="mb-6 text-sm sm:text-base">
            Join Brainiacs today and experience the future of collaboration.
          </p>
          <a
            href="/signup"
            className="inline-block bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition"
          >
            Get Started Now
          </a>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Services;
