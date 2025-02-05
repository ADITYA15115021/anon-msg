
import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { dbConnect } from "@/app/lib/dbconnect";

//change this
import { User} from "@/app/model/user";


export const authOptions:NextAuthOptions = {
     providers:[
        CredentialsProvider({
            id:"ded",
            credentials:{
                email    : { label  :"email" ,  type:"text"  },
                password : { label : "password", type:"password" }
            },
            async authorize(credentials,req) :Promise<any>{
                
                await dbConnect();
                try {
                
                    const user = await User.findOne({credentials.email });
                } catch (error) {
                    console.log() 
                }
            }
        })

     ],
     session:{
        strategy:"jwt"
     }
}