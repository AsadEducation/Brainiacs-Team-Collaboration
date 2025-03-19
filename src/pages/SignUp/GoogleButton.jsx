import React from 'react';
import useAuth from '../../Hooks/useAuth';
import google from "../../assets/icons/google.svg";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const GoogleButton = () => {
    const navigate=useNavigate()
    const {signUpGoogleUser}=useAuth()
    const handleGoogle=()=>{
        signUpGoogleUser()
        .then(res=>{
            console.log("success",res)
            Swal.fire("Successfully Logged in")
            navigate("/")
        })
        .catch(err=>console.log("error",err))
        // TODO: add post api for saving user info
      }
    return (
        <button onClick={handleGoogle} className="p-2 border border-gray-300 rounded-full cursor-pointer hover:bg-secondary">
            <img className="w-7 md:w-10" src={google} alt="" />
        </button>
    );
};

export default GoogleButton;