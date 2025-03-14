import Navbar from "../../Component/Shared/Navbar";
import Banner from "./Banner/Banner";
import Review from "./Review/Review";
import Pricing from "./pricing/Pricing";
import Statistics from "./Statistics/Statistics";

const Home = () => {
    return (
        <div>
            <Banner />
            <Statistics></Statistics>
            <Review></Review>
            
            <Pricing />
        </div>
    );
};

export default Home;