"use client";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState("Nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to logout");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.data._id);
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to fetch user details");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-300">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 text-center text-2xl font-semibold shadow-md">
        Profile Page
      </header>

      {/* Profile Card */}
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
          <FaUserCircle className="text-gray-400 text-6xl mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-black">User ID:</h2>
          <p className="text-gray-700 text-sm mb-4">
            {data === "Nothing" ? "No User Data" : <Link href={`/profile/${data}`} className="text-blue-500 hover:underline">{data}</Link>}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Logout
            </button>
            <button
              onClick={getUserDetails}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Get User Details
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-3 text-sm">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default Profile;
