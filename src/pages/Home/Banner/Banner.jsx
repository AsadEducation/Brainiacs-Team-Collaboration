import React, { useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";
import image1 from "../../../assets/image-1.jpg";
import image2 from "../../../assets/image-2.jpg";
import image3 from "../../../assets/image-3.jpg";

const Banner = () => {
  const timerRef = useRef(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    drag: false,
    slides: { perView: 1 },
    created: (slider) => {
      startAutoPlay(slider);
    },
    slideChanged: (slider) => {
      resetAutoPlay(slider);
    },
  });

  const startAutoPlay = (slider) => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      slider.next();
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetAutoPlay = (slider) => {
    stopAutoPlay();
    startAutoPlay(slider);
  };

  useEffect(() => {
    return () => stopAutoPlay(); 
  }, []);

  return (
    <section className="relative -top-24 bg-primary text-white py-[173px] lg:py-[107px] ">
      {/* <div className="px-4 md:px-8"> */}
        <div className=" container mx-auto  grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Banner Content */}
          <motion.div
            className="text-center md:text-left space-y-4 md:space-y-6"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold">
              Brainiacs
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold leading-snug">
              Smart & Fast Teamwork!
            </h2>
            <p className="text-sm md:text-base">
              Chat, manage tasks & share files seamlessly.
            </p>
            <button className="inline-block bg-secondary text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-60 transition cursor-pointer">
              Get Started
            </button>
          </motion.div>

          {/* Slider */}
          <motion.div
            ref={sliderRef}
            className="keen-slider max-w-lg mx-auto"
            onMouseEnter={stopAutoPlay}
            onMouseLeave={() => startAutoPlay(instanceRef.current)}
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {[image1, image2, image3].map((img, index) => (
              <div key={index} className="keen-slider__slide">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-72 md:h-96 object-cover rounded-lg"
                />
              </div>
            ))}
          </motion.div>
        </div>
      {/* </div> */}
    </section>
  );
};

export default Banner;
