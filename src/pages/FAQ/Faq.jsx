import React, { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const faqData = [
    {
      question: " What is Brainiacs?",
      answer:
        "Brainiacs is a team collaboration platform that helps teams communicate, manage tasks, share files, and stay updated in real time.",
    },
    {
      question: " Who can use Brainiacs ?",
      answer:
        "It is designed for businesses, remote teams, startups, freelancers, and anyone looking to enhance team collaboration.",
    },

    {
      question: "How do I sign up for Brainiacs?",
      answer:
        "You can sign up using your email or Google account on our website.",
    },
    {
      question: "Can I invite my team members to join?",
      answer:
        "Yes! You can invite team members via email and assign them roles.",
    },
    {
      question: "Does Brainiacs support real-time messaging?",
      answer:
        "Yes, you can chat instantly with team members through one-on-one and group conversations.",
    },

    {
      question: " Can I schedule messages or announcements?",
      answer: "Yes, you can schedule messages to be sent at a later time.",
    },
  ];

  const column1 = faqData.slice(0, Math.ceil(faqData.length / 2));
  const column2 = faqData.slice(Math.ceil(faqData.length / 2));

  return (
    <div className=" p-8 mb-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-secondary  mb-12 mt-10">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {/* Column 1 */}

          <div className=" space-y-4">
            {column1.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-8  rounded-lg shadow-md transition-all duration-300"
              >
                {/* FAQ Question */}

                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleAnswer(index)}
                >
                  <span
                    className={`text-xl mr-4 ${
                      openIndex === index ? "text-[#4DA1A9]" : "text-gray-700"
                    }`}
                  >
                    {openIndex === index ? "−" : "+"}
                  </span>

                  <h3 className="text-lg md:text-base lg:text-lg font-medium">
                    {faq.question}
                  </h3>
                </div>

                {/* FAQ Answer */}

                <div
                  className={`faq-answer mt-4 overflow-hidden transition-all duration-300 ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}

          <div className=" space-y-4">
            {column2.map((faq, index) => {
              const adjustedIndex = index + column1.length;
              return (
                <div
                  key={adjustedIndex}
                  className="bg-white p-8 md:p-[22px] lg:p-8  rounded-lg shadow-md transition-all duration-300"
                >
                  {/* FAQ Question */}

                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleAnswer(adjustedIndex)}
                  >
                    <span
                      className={`text-xl mr-4  ${
                        openIndex === adjustedIndex
                          ? "text-[#4DA1A9]"
                          : "text-black"
                      }`}
                    >
                      {openIndex === adjustedIndex ? "−" : "+"}
                    </span>
                    <h3 className="text-lg md:text-base lg:text-lg font-medium ">
                      {faq.question}
                    </h3>
                  </div>

                  {/* FAQ Answer */}

                  <div
                    className={`faq-answer mt-4 overflow-hidden transition-all duration-300 ${
                      openIndex === adjustedIndex
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
