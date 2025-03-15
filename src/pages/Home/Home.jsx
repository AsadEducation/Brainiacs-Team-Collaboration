import Navbar from "../../Component/Shared/Navbar";
import Banner from "./Banner/Banner";
import Review from "./Review/Review";
import Pricing from "./pricing/Pricing";
import Statistics from "./Statistics/Statistics";
import Features from "./Features/Features";

const Home = () => {
    return (
        <div>
            <Banner />
            <Features />
            <Statistics></Statistics>
            <Review></Review>
            <Pricing />
        </div>
    );
};

export default Home;