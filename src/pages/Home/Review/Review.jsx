
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
// import { Pagination, Navigation } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { IoMdQuote } from 'react-icons/io';

const Review = () => {
    const [reviewData, setReviewData] = useState([]);

    // fetching review data from public folder
    useEffect(() => {
        fetch("/review.json")
            .then(res => res.json())
            .then(data => setReviewData(data))
    }, [])


    return (
        <div className='py-20 mt-10'>
            <Swiper
                // pagination={{
                //     type: 'fraction',
                // }}
                navigation={true}
                // modules={[Pagination, Navigation]}
                modules={[Navigation]}
                className="mySwiper"
            >

                {
                    reviewData.map((review, index) => <SwiperSlide key={index}>
                        <div className='flex flex-col items-center'>

                            <IoMdQuote className='text-7xl text-primary' />

                            <p className='my-5 px-20 text-xs md:text-lg'>"{review.reviewText}"</p>

                            <div className='flex items-center gap-5'>
                                <div className='h-16 w-16 rounded-full overflow-hidden'>
                                    <img className='w-full object-top' src={review.photo} alt="" />
                                </div>
                                <div className='text-left'>
                                    <h2 className='text-2xl font-semibold text-primary'>{review.reviewerName}</h2>
                                    <h4 className='text-base'>{review.designation}</h4>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }




            </Swiper>
        </div>
    );
};

export default Review;