import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import 'animate.css';
import { useEffect, useState } from 'react';

const Statistics = () => {

    const boxStyle = "flex flex-col items-center bg-accent/20 border-2 rounded-lg  border-[#003C43] p-10 space-y-3 "

    const [isVisible, setIsVisible] = useState(false);  // State to track visibility

    useEffect(() => {
        // Create an Intersection Observer to watch for when the element is visible on screen
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {  // If the element is visible on the screen
                    setIsVisible(true);        // Trigger the animation
                }
            });
        });

        return () => observer.disconnect();  
    }, []);
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    })
    return (
        <div className={`bg-gradient-to-br from-secondary/20 via-white to-secondary/20 pb-10 bg-cover bg-right text-white px-5 py-10`}>
            <div className="py-10 flex flex-col md:flex-row gap-5 md:gap-28">
                <h1 className="text-xl md:text-3xl font-bold  text-primary ">Why Teams Trust Brainiacs for Seamless Collaboration & Productivity?</h1>
                <div className="space-y-3">
                    <h2 className="text-secondary text-sm md:text-base">Boost efficiency, enhance teamwork, and streamline projects with Brainiacs—your ultimate team collaboration solution.</h2>
                    <button className="inline-block bg-secondary text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-60 transition cursor-pointer">
                        Get Started
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-primary gap-5 ">
                <div className={boxStyle}>
                    <h3 ref={ref} className="md:text-5xl text-4xl font-medium">{inView && (<CountUp end={75}></CountUp>)}%</h3>
                    <h5 className="md:text-sm text-xs ">Businesses using Brainiacs experience faster project completion and improved team coordination</h5>
                </div>

                <div className={boxStyle}>
                    <h3 ref={ref} className="md:text-5xl text-4xl font-medium">{inView && (<CountUp end={67}></CountUp>)}%</h3>
                    <h5 className="md:text-sm text-xs ">Employees say collaborating on Brainiacs helps them be more productive than relying on emails alone.</h5>
                </div>

                <div className={boxStyle}>
                    <h3 ref={ref} className="md:text-5xl text-4xl font-medium">{inView && (<CountUp end={85}></CountUp>)}%</h3>
                    <h5 className="md:text-sm text-xs ">Teams that use Brainiacs' real-time messaging and task tracking experience better communication and reduced misalignment.</h5>
                </div>

                <div className={boxStyle}>
                    <h3 ref={ref} className="md:text-5xl text-4xl font-medium">{inView && (<CountUp end={3}></CountUp>)}M+</h3>
                    <h5 className="md:text-sm text-xs ">Teams worldwide rely on collaboration tools like Brainiacs to streamline workflows and enhance productivity.</h5>
                </div>



            </div>
        </div>
    );
};

export default Statistics;