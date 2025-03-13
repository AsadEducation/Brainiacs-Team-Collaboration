import Navbar from "../../Component/Shared/Navbar";
import Statistics from "./Statistics/Statistics";


const Home = () => {
    return (
        <div>
            <Navbar/>
            <h2 className="text-3xl text-red-500">This is Home</h2>
            <Statistics></Statistics>
        </div>
    );
};

export default Home;