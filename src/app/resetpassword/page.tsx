'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const ResetPassword = () => {
  const router = useRouter();
  // const token = window.location.search.split('=')[1]
  const [token,setToken] = useState('')
  console.log(token)

  useEffect(()=>{
  const searchParams = new URLSearchParams(window.location.search);
  const temp = searchParams.get("token");
  setToken(temp||'')

  },[])
  

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onResetPassword = async (event:any) => {
    event.preventDefault();
    try {
      setLoading(true);
      // Send password reset request to the server
      // Replace "/api/users/reset-password" with your API endpoint
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      console.log("Password reset success", response);
      await toast.success("Password reset successfully!");
      router.push("/login");
    } catch (error:any) {
      console.log("Password reset failed", error.message);
      await toast.error(error?.response?.data?.error)
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = password !== "" && password === confirmPassword;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
      <h1 className="text-white text-2xl">{loading ? "Processing" : "Reset Password"}</h1>
      <hr className="border-white w-1/4 my-4" />
      <form className="flex flex-col items-center">
        <label htmlFor="password" className="text-white">
          New Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="border border-white rounded px-2 py-1 w-64 text-black"
        />

        <label htmlFor="confirmPassword" className="text-white">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="border border-white rounded px-2 py-1 w-64 text-black"
        />

        <button
          onClick={onResetPassword}
          disabled={loading || !isFormValid}
          className={`rounded px-4 py-2 mt-4 ${
            loading || !isFormValid ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-white text-black"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        <Link href="/login" className="text-white mt-2">
          Remember your password? Log In here
        </Link>
      </form>
      <Toaster />
    </div>
  );
};

export default ResetPassword;
