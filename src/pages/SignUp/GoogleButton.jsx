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
                console.log("Google Login Success:", user);

                // Prepare user data for the database
                const newUser = {
                    name: user.displayName || "Unknown",
                    email: user.email,
                    role: "user"
                };

                // Save user data to the database
                fetch("https://new-server-brainaics.onrender.com/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                })
                    .then(response => {
                        if (response.status === 400) {
                            console.log("User already exists in the database.");
                            Swal.fire("Successfully Logged in").then(() => {
                                navigate("/dashboard"); // Redirect to dashboard page after alert
                            });
                            return;
                        }
                        if (!response.ok) {
                            throw new Error("Failed to save user to the database");
                        }
                        return response.json();
                    })
                    .then(result => {
                        if (result) {
                            console.log("Google User Added to DB:", result);
                            Swal.fire("Successfully Logged in").then(() => {
                                navigate("/dashboard"); // Redirect to dashboard page after alert
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