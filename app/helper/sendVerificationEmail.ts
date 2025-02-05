import VerificationEmail from "@/email/verificationEmail"
import {resend} from "@/lib/resend";
import { ApiResponse } from "../types/ApiResponse";


export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    try {

        await resend.emails.send({
            from:"",
            to:"",
            subject:"verificatiom code",
            react:VerificationEmail({username,otp:verifyCode })
        })

        return {success:true,message:"verification email send successfully!"}
        
    } catch (error) {
        console.log(error);
        return {success:false,message:"failed to send verifiaction email"}
    }
}