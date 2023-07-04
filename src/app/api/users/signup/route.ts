import connect from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";


connect()

export const POST = async (request:NextRequest)=>{
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody;
        console.log(reqBody)

        // check if the use already exists
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error:'User already exists'},{status:400})
        }

        // hash🚭 th password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword,
        })

        const savedUser = await newUser.save()
        console.log("saved user"+savedUser)

        // send Email
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message:'User created successfully',
            success:true,
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}