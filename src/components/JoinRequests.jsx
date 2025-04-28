import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { io } from "socket.io-client";
import { MdOutlineCancel, MdCloudDone } from "react-icons/md";

const JoinRequests = ({ joinRequests, setJoinRequests }) => {
  const { currentUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = io("https://brainiacs-server.onrender.com", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected");
    });

    socketRef.current.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });

    socketRef.current.on("connect", () => {
      if (currentUser?.email) {
        socketRef.current.emit("identify", currentUser.email);
      }
    });

    const handleJoinRequest = (data) => {
      if (data.receiverEmail === currentUser?.email) {
        setJoinRequests((prev) => {
          if (!prev.some((req) => req._id === data.joinRequest._id)) {
            return [...prev, data.joinRequest];
          }
          return prev;
        });
        toast.info(
          `New join request from ${data.joinRequest.senderName} for board: ${data.joinRequest.boardName}`
        );
      }
    };

    socketRef.current.on("join-request-sent", handleJoinRequest);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("join-request-sent", handleJoinRequest);
        socketRef.current.disconnect();
      }
    };
  }, [currentUser?.email]);

  useEffect(() => {
    const fetchJoinRequests = async () => {
      if (!currentUser?.email) return;

      try {
        const response = await axiosPublic.get("/join-requests", {
          params: { email: currentUser.email },
        });
        setJoinRequests(response.data);
      } catch (error) {
        console.error("Error fetching join requests:", error);
        toast.error("Failed to load join requests");
      }
    };

    fetchJoinRequests();
  }, [currentUser?.email, axiosPublic]);

  const handleJoinRequestResponse = async (requestId, status) => {
    const action = status === "accepted" ? "accept" : "reject";
    const confirmText =
      status === "accepted"
        ? "Yes, accept the request!"
        : "Yes, reject the request!";
    const successMessage =
      status === "accepted"
        ? "Join request accepted successfully."
        : "Join request rejected successfully.";

    Swal.fire({
      title: `Are you sure you want to ${action} this request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "accepted" ? "#28a745" : "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: confirmText,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.patch(`/join-requests/${requestId}`, { status });

          setJoinRequests((prev) => prev.filter((req) => req._id !== requestId));

          Swal.fire({
            icon: "success",
            title: "Success",
            text: successMessage,
          });
        } catch (error) {
          console.error("Error updating join request:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update join request. Please try again.",
          });
        }
      }
    });
  };

  return (
    <div className="pt-4">
      <h3 className="text-sm font-semibold mb-2">Join Requests</h3>

      <ul className="space-y-2">
        {joinRequests.map((request) => (
          <li key={request._id} className="p-2 bg-gray-100 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-[50%]">
                <img
                  src={request.senderPhotoURL}
                  alt={request.senderName}
                  className="border-white border-2 w-8 h-8 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <div>
                  <p className="text-sm font-medium">
                    {request.senderName} invited you to join: {request.boardName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(request.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2 mt-1">
                  <button
                    onClick={() =>
                      handleJoinRequestResponse(request._id, "accepted")
                    }
                    className="p-1 text-green-500  border-2 rounded-full hover:bg-green-500 hover:text-white drop-shadow-xl/25 shadow-green-500 cursor-pointer"
                  >
                    <MdCloudDone />
                  </button>
                  <button
                    onClick={() =>
                      handleJoinRequestResponse(request._id, "rejected")
                    }
                    className="p-1 text-red-500 cursor-pointer  border-2 rounded-full hover:bg-red-500 hover:text-white drop-shadow-xl/25 shadow-red-500"
                  >
                    <MdOutlineCancel className="" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
        {joinRequests.length === 0 && (
          <p className="text-xs text-gray-500">No pending join requests.</p>
        )}
      </ul>
    </div>
  );
};

export default JoinRequests;
