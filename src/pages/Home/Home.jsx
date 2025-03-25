import Banner from "./Banner/Banner";
import Review from "./Review/Review";
import Pricing from "./pricing/Pricing";
import Statistics from "./Statistics/Statistics";
import Features from "./Features/Features";
import Faq from "../FAQ/Faq";



const Home = () => {
    return (
        <div >
            <Banner />
            <Features />
            <Statistics></Statistics>
            <Review></Review>
            <Pricing />
         <Faq></Faq>
        </div>
    );
};

export default Home;