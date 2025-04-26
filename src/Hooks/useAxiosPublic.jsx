import axios from "axios";

const axiosPublic = axios.create({

    baseURL: window.location.hostname === 'localhost'
        ? `${import.meta.env.VITE_API_URL}`
        : 'https://brainiacs-server.vercel.app',

})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;