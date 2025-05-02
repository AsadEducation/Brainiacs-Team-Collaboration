import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { HiCamera } from "react-icons/hi2";
import { FiSave } from "react-icons/fi";
import Swal from "sweetalert2"; // Import SweetAlert2
import { LoaderPinwheel } from "lucide-react";
import { uploadFile } from "../../utils/Upload"; // Import uploadFile function

const AccountSettings = () => {
  const { currentUser } = useContext(AuthContext); // Access current user from AuthContext
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || ""); // Populate name
      setEmail(currentUser.email || ""); // Populate email
      setPreviewImage(currentUser.photoURL); // Populate profile picture
    }
  }, [currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      let uploadedImageUrl = previewImage;

      // Upload image if a new file is selected
      if (selectedFile) {
        const uploadResponse = await uploadFile(
          selectedFile,
          `${currentUser.email}-profile`
        );
        uploadedImageUrl = uploadResponse.url; // Get the uploaded image URL
      }

      const updatedData = {
        displayName: name,
        photoURL: uploadedImageUrl,
        ...(password && { password }), // Include password only if it's provided
      };
      console.log(updatedData);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${currentUser.email}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`, // Include token if required
          },
        }
      );

      if (response.status === 200) {
        Swal.fire(
          "Success",
          "Account settings updated successfully!",
          "success"
        );
      } else {
        Swal.fire("Error", "Failed to update account settings.", "error");
      }
    } catch (error) {
      console.error("Error updating account settings:", error);
      Swal.fire(
        "Error",
        "An error occurred while updating account settings.",
        "error"
      );
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Account Settings
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border shadow">
          <img
            src={previewImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="Profile Preview"
            className="w-full h-full object-cover"
          />
          <label
            htmlFor="fileInput"
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <HiCamera className="text-white text-2xl" />
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            value={email}
            disabled
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            New Password
          </label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <LoaderPinwheel className="animate-spin text-xl" /> // Show spinner
          ) : (
            <FiSave />
          )}
          <span>{isLoading ? "Updating..." : "Update Settings"}</span>
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
