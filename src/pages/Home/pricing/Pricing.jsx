import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Pricing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  const [isYearly, setIsYearly] = useState(true);

  const pricingPlans = [
    {
      title: "Starter",
      description: "For Individuals and Small Teams",
      monthly: "$10",
      yearly: "$100",
      features: [
        "50 Page Unlock",
        "10 GB Storage",
        "6 Team Members",
        "Unlimited Book Mark",
        "Unlimited basic feature",
      ],
      isBestDeal: false,
    },
    {
      title: "Professional",
      description: "For Individuals and Largest Teams",
      monthly: "$20",
      yearly: "$200",
      features: [
        "100 Page Unlock",
        "20 GB Storage",
        "8 Team Members",
        "Unlimited Book Mark",
        "Unlimited basic feature",
      ],
      isBestDeal: true,
    },
    {
      title: "Business",
      description: "For Multiples and Largest Teams",
      monthly: "$100",
      yearly: "$1000",
      features: [
        "300 Page Unlock",
        "100 GB Storage",
        "100 Team Members",
        "Unlimited Book Mark",
        "Unlimited basic feature",
      ],
      isBestDeal: false,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-secondary">
            Value That Scales With You
          </h2>
          <p className="mt-4  text-md ">
            Change your plan according to your needs
          </p>
        </div>

        <div className="flex justify-center mb-10 space-x-3 items-center">
          <span
            className="text-sm  font-medium cursor-pointer"
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`w-12 h-6 rounded-full p-1 flex items-center transition duration-300 cursor-pointer ${
              isYearly ? "bg-primary" : "bg-black"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white shadow-md transform transition duration-300 ${
                isYearly ? "translate-x-6" : ""
              }`}
            ></span>
          </button>
          <span
            className="text-sm font-medium cursor-pointer"
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence>
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index + (isYearly ? "Y" : "M")}
                variants={cardVariants}
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`relative rounded-2xl p-8 shadow-xl transition-all duration-300 
                  ${
                    plan.isBestDeal
                      ? "border-2 border-[#4da1a9]"
                      : "border border-slate-200"
                  } 
                  ${
                    isYearly
                      ? "bg-gradient-to-br from-[#f5f7fa] via-[#c3cfe2] to-[#e2ebf0] backdrop-blur-md"
                      : "backdrop-blur-xl bg-white/40"
                  }
                `}
              >
                {plan.isBestDeal && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2e5077] to-[#5a79a1] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {plan.title}
                </h3>
                <p className="text-slate-800 text-sm mb-6">
                  {plan.description}
                </p>
                <div className="text-3xl font-extrabold text-slate-900 mb-6">
                  {isYearly ? plan.yearly : plan.monthly}
                  <span className="text-sm font-medium text-slate-800">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2">
                  Includes:
                </h4>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-slate-800 text-sm font-medium"
                      data-tooltip-id="feature-tooltip"
                      data-tooltip-content={`More info about "${feature}"`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        className="mr-2 fill-green-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`relative group w-full px-5 py-2.5 text-sm font-semibold text-white
                    ${
                      isYearly
                        ? "bg-gradient-to-r from-[#2e5077] to-[#5a79a1]"
                        : "bg-gradient-to-r from-[#4da1a9] to-[#7fc6cc]"
                    } rounded-md shadow-md overflow-hidden`}
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-sm"></span>
                  Buy Now
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Tooltip
          id="feature-tooltip"
          place="right"
          effect="solid"
          arrowColor="#fff"
          className="tooltip"
          style={{
            backgroundColor: "#333",
            color: "#fff",
            fontSize: "12px",
          }}
        />
      </div>
    </section>
  );
};

export default Pricing;
