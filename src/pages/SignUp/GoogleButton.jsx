import React from 'react';
import useAuth from '../../Hooks/useAuth';
import google from "../../assets/icons/google.svg";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const GoogleButton = () => {
    const navigate = useNavigate();
    const { signUpGoogleUser } = useAuth();

    const handleGoogle = () => {
        signUpGoogleUser()
            .then(res => {
                const user = res.user;

                const newUser = {
                    _id: user.uid,
                    displayName: user.displayName || "Unknown",
                    email: user.email,
                    role: "user",
                    photoURL: user.photoURL || null,
                };
console.log("Google User:", newUser);
                fetch(`${import.meta.env.VITE_API_URL}/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result.message === "User already exists") {
                            console.log("User already exists in the database.");
                            Swal.fire("Successfully Logged in").then(() => {
                                navigate("/dashboard");
                            });
                        } else {
                            console.log("Google User Added to DB:", result);
                            Swal.fire("Successfully Logged in").then(() => {
                                navigate("/dashboard");
                            });
                        }
                    })
                    .catch(err => {
                        console.error("Error saving Google user to DB:", err);
                        Swal.fire("Failed to save user data");
                    });
            })
            .catch(err => {
                console.error("Google Login Error:", err);
                Swal.fire("Something went wrong");
            });
    };

    return (
        <button
            onClick={handleGoogle}
            className="p-2 border border-gray-300 rounded-full cursor-pointer hover:bg-secondary"
        >
            <img className="w-7 md:w-10" src={google} alt="" />
        </button>
    );
};

export default GoogleButton;