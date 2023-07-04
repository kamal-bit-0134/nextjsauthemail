'use client' 
import Link from "next/link"
import React from "react"
import {useEffect} from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import { Toaster, toast } from 'react-hot-toast';

const SignUp = () => {

  const router = useRouter();

  const [user,setUser] = React.useState({
    email:"",
    password:"",
    username:"",
  })

  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onSignup = async (event:any)=> {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup",user);
      console.log("Signup success",response);
      await toast.success('Registered Successfully!');
      router.push("/login")
    } catch (error:any) {
      console.log("SignUp failed",error.message)
      await toast.error(error?.response?.data?.error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(user.email.length >0 && user.password.length> 0 && user.username.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
  <h1 className="text-white text-2xl">{loading?"Processing":"SignUp"}</h1>
  <hr className="border-white w-1/4 my-4" />
  <form className="flex flex-col items-center">
    <label htmlFor="username" className="text-white">Username</label>
    <input
      type="text"
      id="username"
      value={user.username}
      onChange={(e) => setUser({ ...user, username: e.target.value })}
      placeholder="Username"
      className="border border-white rounded px-2 py-1 w-64 text-black"
    />

    <label htmlFor="email" className="text-white">Email</label>
    <input
      type="email"
      id="email"
      value={user.email}
      onChange={(e) => setUser({ ...user, email: e.target.value })}
      placeholder="Email"
      className="border border-white rounded px-2 py-1 w-64 text-black"
    />

    <label htmlFor="password" className="text-white">Password</label>
    <input
      type="password"
      id="password"
      value={user.password}
      onChange={(e) => setUser({ ...user, password: e.target.value })}
      placeholder="Password"
      className="border border-white rounded px-2 py-1 w-64 text-black"
    />

    <button onClick={(event)=>onSignup(event)} disabled={buttonDisabled} className={`rounded px-4 py-2 mt-4 ${buttonDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-white text-black'}`}
>SignUp</button>
    <Link href="/login" className="text-white mt-2">Already registered? LogIn here</Link>
  </form>
  <Toaster/>
</div>

  )
}

export default SignUp