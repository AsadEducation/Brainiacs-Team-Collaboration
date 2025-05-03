// axiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
baseURL: `${import.meta.env.VITE_API_URL}`,
  // baseURL:
  //   window.location.hostname === "http://localhost:5000"
  //     ? `${import.meta.env.VITE_API_URL}`
  //     : "https://brainiacs-server.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
