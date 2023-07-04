import { NextResponse,NextRequest } from "next/server";


export const GET = async(request:NextRequest)=>{
    try {
        const {cookies} = request;
        const response  = NextResponse.json({
            message:'Logout successful',
            success:true
        }) 
        await response.cookies.set("token","",{
            httpOnly:true,expires: new Date(0)
        })
        console.log(cookies)
        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
} 
