import { dbConnect } from "@/app/lib/dbconnect";
import { User } from "@/app/model/user";
import { NextRequest } from "next/server";
import  bcrypt  from "bcrypt";
import { sendVerificationEmail } from "@/app/helper/sendVerificationEmail";


export async function  POST(req:NextRequest) {
    
    await dbConnect();
    
    try{
        const {username,email,password} = await req.json();
        //detemining if a user exist with the same email id , and is verified

        const existingUser = await User.findOne({
            username, isVerified :true })

        const verifyCode = Math.floor(100000+Math.random()*900000).toString();

        if(existingUser){

            if(existingUser.isVerified){
                return Response.json(
                    {success:false,
                    message:"user already exist with the provided email !"},
                    {status:400}
                )

            }else{
              //the user exist in db, but has not been verified
              //then,we are updating the password and sending the otp  
              const hashedPassword = await bcrypt.hash(password,10);
              existingUser.password = hashedPassword;
              existingUser.verifyCode = verifyCode; 
              existingUser.codeExpiry =  new Date(Date.now() + 3600000 );
              await existingUser.save();
            }

        }else{
            //if the user doesnt exist, make a db entry for the user
            const hashedPassword = await bcrypt.hash(password,10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours()+1);

            const newUser = new User({
                    username    :  username,
                    email       :  email,
                    passwrod    :  hashedPassword,
                    isVerified  :  false,
                    verifyCode,
                    codeExpiry  :  expiryDate,
                    isAccepting :  true,
                    messages     :  [] 
            })

            await newUser.save();  

        }

        //sending email;
        
        const emailResponse = await sendVerificationEmail(email,username,verifyCode);
        
        if(!emailResponse.success){
            return Response.json({
              success:false,
              message : emailResponse.message      
            },{status:400}) }

        return Response.json(
            { success:true, message:"user registered successfully! verify your email"},
            {status:200}

        )   

    }catch (error) {
        console.log("error registering user! ",error);
    }


}