import React from "react";

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Starter",
      description: "For Individuals and Small Teams",
      price: "$10",
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
      price: "$20",
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
      price: "$100",
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

  const testimonials = [
    {
      name: "John Doe",
      feedback:
        "Brainiacs has completely transformed the way our team collaborates. The tools are intuitive and make our workflow seamless.",
      role: "Project Manager",
    },
    {
      name: "Jane Smith",
      feedback:
        "The real-time communication features are a game-changer. We can now stay connected and productive no matter where we are.",
      role: "Team Lead",
    },
    {
      name: "Michael Brown",
      feedback:
        "The task management tools have helped us stay organized and meet our deadlines consistently. Highly recommend Brainiacs!",
      role: "Developer",
    },
  ];

  const whyChooseUs = [
    {
      title: "User-Friendly Interface",
      description:
        "Our platform is designed with simplicity in mind, making it easy for teams to get started and stay productive.",
    },
    {
      title: "Secure & Reliable",
      description:
        "Your data is safe with us. We prioritize security and ensure reliable performance for all users.",
    },
    {
      title: "Customizable Solutions",
      description:
        "Tailor Brainiacs to fit your team's unique needs with flexible features and integrations.",
    },
  ];

  return (
    <div className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gray-50">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">
          Choose the Plan That Fits Your Needs
        </h1>
        <p className="mt-4 text-gray-600">
          Flexible pricing plans designed for teams of all sizes.
        </p>
      </section>

      {/* Pricing Plans Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg p-6 ${
                plan.isBestDeal ? "bg-primary text-white" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                {plan.title}
                {plan.isBestDeal && (
                  <span className="ml-2 px-2 py-1 text-xs font-semibold bg-secondary text-white rounded">
                    Best Deal
                  </span>
                )}
              </h3>
              <p className="text-sm">{plan.description}</p>
              <div className="mt-6">
                <h4 className="text-2xl font-bold">
                  {plan.price}
                  <span className="text-sm font-medium">/month</span>
                </h4>
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-green-500 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-6 w-full py-2 rounded-lg font-semibold ${
                  plan.isBestDeal
                    ? "bg-white text-primary"
                    : "bg-primary text-white"
                }`}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mt-16 container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Why Choose Brainiacs?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {whyChooseUs.map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-16 container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-primary text-white rounded-lg shadow-lg"
            >
              <p className="italic">"{testimonial.feedback}"</p>
              <h4 className="mt-4 font-semibold">{testimonial.name}</h4>
              <p className="text-sm">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Ready to Get Started?
        </h2>
        <p className="mt-4 text-gray-600">
          Choose a plan and start your journey with Brainiacs today.
        </p>
        <button className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary">
          Get Started Now
        </button>
      </section>
    </div>
  );
};

export default Pricing;
