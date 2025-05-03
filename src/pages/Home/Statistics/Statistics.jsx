import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FaChartLine, FaRocket, FaComments, FaGlobeAsia } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

const statsData = [
  {
    id: 1,
    icon: <FaChartLine className="text-4xl text-cyan-400" />,
    value: 75,
    suffix: "%",
    text: "Faster project completion and better team coordination",
  },
  {
    id: 2,
    icon: <FaRocket className="text-4xl text-indigo-400" />,
    value: 67,
    suffix: "%",
    text: "More productivity through Brainiacs vs email",
  },
  {
    id: 3,
    icon: <FaComments className="text-4xl text-pink-400" />,
    value: 85,
    suffix: "%",
    text: "Teams experience better communication",
  },
  {
    id: 4,
    icon: <FaGlobeAsia className="text-4xl text-yellow-300" />,
    value: 3,
    suffix: "M+",
    text: "Teams worldwide rely on Brainiacs",
  },
];

const Statistics = () => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20 w-full">
      <div className="max-w-7xl mx-auto text-center space-y-4 mb-20 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold">
          <span className="text-secondary"> Why Teams Trust Brainiacs</span>
        </h2>
        <p className="text-base sm:text-lg max-w-md sm:max-w-xl mx-auto">
          Empower your team with faster workflows, better communication, and
          global collaboration.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {statsData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.05}
              className="w-full h-full"
            >
              <div
                ref={ref}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 rounded-2xl shadow-xl text-center space-y-4 hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full"
              >
                <div className="flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold ">
                  {inView && <CountUp end={item.value} duration={2} />}
                  {item.suffix}
                </h3>
                <p className="text-xs sm:text-sm">{item.text}</p>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
