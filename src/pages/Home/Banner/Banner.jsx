import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../../assets/image-1.jpg";
import image2 from "../../../assets/image-2.jpg";
import image3 from "../../../assets/image-3.jpg";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  const images = [image1, image2, image3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    fade: true,
    cssEase: "ease-in-out",
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  return (
    <section className="relative h-[30vh] md:h-screen overflow-hidden">
      <Slider {...settings} className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div key={index} className="h-full w-full">
            <motion.img
              src={img}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          </div>
        ))}
      </Slider>
      <div className="absolute top-8 md:top-10 right-0 left-0 z-10 h-full flex items-center justify-center px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="backdrop-blur-[calc(xs/2)] bg-black/5 rounded-2xl p-4 md:p-8 w-sm md:w-6xl text-center text-white shadow-lg"
        >
          <TypeAnimation
            sequence={[
              "Elevate Your Team’s Power",
              4000,
              "Collaborate Smarter, Faster",
              4000,
              "Achieve More Together",
              4000,
              "",
              2000,
            ]}
            wrapper="h1"
            className="text-lg md:text-4xl font-bold drop-shadow-xs whitespace-nowrap"
            repeat={Infinity}
          />
          <p className="text-xs md:text-xl mt-2 md:mt-4 text-gray-200">
            Brainiacs makes teamwork smarter, faster, and beautifully organized.
          </p>
          <Link
            to="/signup"
            className="mt-6 inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-secondary hover:bg-secondary/80 transition shadow-lg shadow-secondary/40 font-semibold text-white text-base sm:text-lg"
          >
            Get Started Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
