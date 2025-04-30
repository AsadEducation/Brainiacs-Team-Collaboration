import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

const Review = () => {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    fetch("/review.json")
      .then((res) => res.json())
      .then((data) => setReviewData(data));
  }, []);

  return (
    <div className="py-20 mt-10">
      <h2 className="text-center text-3xl md:text-5xl font-bold text-secondary mb-5">
        What Our Users Say
      </h2>
      <p className="text-center mb-14 text-lg">Don't take our word for it - hear their stories</p>
      <Marquee pauseOnHover={true} speed={50} gradient={false}>
        {reviewData.map((review, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#2e5077] to-[#5a79a1] hover:from-[#2e5077] hover:to-[#5a79a1] text-white shadow-lg rounded-xl px-4 md:px-8 py-6 mx-2 md:mx-4  max-w-[300px] md:max-w-[500px] h-[320px] md:h-[300px] border border-primary/20  hover:shadow-2xl transition-all duration-500 ease-in-out transform"
          >
            <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 leading-relaxed">
              "{review.reviewText}"
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src={review.photo}
                alt={review.reviewerName}
                className="w-12 sm:w-16 h-12 sm:h-16 rounded-full border-4 border-white shadow-xl object-cover"
              />
              <div className="text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-semibold drop-shadow-lg">
                  {review.reviewerName}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300">
                  {review.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Review;
