'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Toaster, toast } from "react-hot-toast";

const LoginPage = () => {
    const router = useRouter()
    const [user,setUser] = React.useState({
        email:"",
        password:"",
      })
    const [buttonDisabled,setButtonDisabled] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    
      const onLogIn = async (event:any)=> {
        event.preventDefault()
        try {
          setLoading(true);
          const response = await axios.post("/api/users/login",user);
          console.log('Login Success',response.data)
          await toast.success("Login successfull");
          router.push("/profile")

          
        } catch (error:any) {
          console.log('Login failed',error.message)
          console.log(error.response)
          await toast.error(error?.response?.data?.error)
        }finally{
          setLoading(false)
        }
      }

      React.useEffect(()=>{
        if(user.email.length >0 && user.password.length> 0 ){
          setButtonDisabled(false)
        }else{
          setButtonDisabled(true)
        }
      },[user])
    



  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
        <h1 className="text-white text-2xl">{loading?"Processing":"LogIn"}</h1>
        <hr className="border-white w-1/4 my-4" />
        <form className="flex flex-col items-center">

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

            <button onClick={(e)=>onLogIn(e)} disabled={buttonDisabled} className={`rounded px-4 py-2 mt-4 ${buttonDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-white text-black'}`}>LogIn</button>
            <Link href="/signup" className="text-white mt-2">New User? SignUp here</Link>
            <Link href="/forgotpassword" className="text-rose-100 mt-2">Forgot password? reset here</Link>

        </form>
      <Toaster />
        </div>
  )

}

export default LoginPage