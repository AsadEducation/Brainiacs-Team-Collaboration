import Navbar from "../../Component/Shared/Navbar";
import Banner from "./Banner/Banner";
import Statistics from "./Statistics/Statistics";


const Home = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>

            <Statistics></Statistics>
        </div>
    );
};

export default Home;