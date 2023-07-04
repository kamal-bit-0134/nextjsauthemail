'use client'
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onResetPassword = async (event:any) => {
    event.preventDefault();
    try {
      setLoading(true);
      // Send password reset request to the server
      // Replace "/api/users/passwordreset" with your API endpoint
      const response = await axios.post("/api/users/passwordreset", { email });
      console.log("Password reset success", response);
      await toast.success("Password reset link sent!");
    } catch (error:any) {
      console.log("Password reset failed", error.message);
      await toast.error(error?.response?.data?.error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
      <h1 className="text-white text-2xl">{loading ? "Processing" : "Forgot Password"}</h1>
      <hr className="border-white w-1/4 my-4" />
      <form className="flex flex-col items-center">
        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-white rounded px-2 py-1 w-64 text-black"
        />

        <button
          onClick={onResetPassword}
          disabled={loading}
          className={`rounded px-4 py-2 mt-4 ${
            loading ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-white text-black"
          }`}
        >
          {loading ? "Sending reset link..." : "Reset Password"}
        </button>
        <Link href="/login" className="text-white mt-2">
          Remember your password? Log In here
        </Link>
      </form>
      <Toaster />
    </div>
  );
};

export default ForgotPassword;
