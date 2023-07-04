import connect from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";


connect();

export const POST = async (request:NextRequest)=>{
    try {
        const reqBody = await request.json();
        console.log(reqBody)
        const {email} = reqBody;
        const user = await User.findOne({email});
        console.log(user)
        if(!user){
            return NextResponse.json({error:'User does not exists'},{status:404})
        }
        await sendEmail({email,emailType:'RESET',userId:user._id})
        return NextResponse.json({
            message:'Reset password link sent successfully',
            success:true,
        })

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}