import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../../assets/image-1.jpg";
import image2 from "../../../assets/image-2.jpg";
import image3 from "../../../assets/image-3.jpg";
import { Link } from "react-router";

const Banner = () => {
  const images = [image1, image2, image3];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "",
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className="relative bg-primary text-white py-16 md:py-24 lg:py-32 xl:py-40">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-16 lg:pt-0 px-6">
        <motion.div
          className="text-center md:text-left space-y-4 md:space-y-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold">Brainiacs</h1>
          <h2 className="text-2xl md:text-4xl font-semibold leading-snug">
            Smart & Fast Teamwork!
          </h2>
          <p className="text-sm md:text-base">
            Chat, manage tasks & share files seamlessly.
          </p>
          <Link to="/signup" className="inline-block bg-secondary text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-60 transition cursor-pointer">
            Get Started
          </Link>
        </motion.div>

        {/* Slider */}
        <motion.div
          className="w-full mx-auto"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Slider {...settings}>
            {images.map((img, index) => (
              <div key={index} className="slide">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
