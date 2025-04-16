import axios from "axios";

const axiosPublic=axios.create({
    baseURL:"https://new-server-brainaics.onrender.com",
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;