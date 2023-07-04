"use client"
import axios from "axios";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const [data,setData] = useState(null)

  const router = useRouter()

  const onLogOut = async(event:any)=>{

    event.preventDefault();
    try {
      const res = await axios.get('/api/users/logout')
      console.log(res)
      router.push('/login')
      
      
    } catch (error:any) {
      console.log(error.message)
      await toast.error(error.message)
    }
  }

  const getUserDetail = async (e:any)=>{
    e.preventDefault();
    const res:any = await axios.get('/api/users/me')
    console.log(res.data.data._id);
    setData(res.data.data._id)

  }
  return (
    <div>
      <h1>Profile</h1>
      {!data?"":
        <Link href={`/profile/${data}`}>{data}</Link>
      }
      <form >
      <button onClick={(e)=>onLogOut(e)}  className={'rounded px-4 py-2 mt-4  bg-white text-black'}>LogOut</button>
      <br></br>
      <button onClick={(e)=>getUserDetail(e)}  className={'rounded px-4 py-2 mt-4  bg-white text-black'}>Uer Detail</button>

      </form>
      <Toaster />

    </div>
  )
}

export default Profile
