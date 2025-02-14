
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
                
                    const user = await User.findOne({credentials.identifier.email });
                    if(!user){
                        throw new Error("no user found with the provided email");

                    } 

                    if(!user.isVerified){
                       throw new Error("please verify your account first !");
                    } 

                    const isCorrect = await bcrypt.compare(user.password,credentials.password);
                    if(!isCorrect){
                        throw new Error("password invalid");
                    }

                    return user;


                } catch (error) {
                    console.log() 
                }
            }
        })

     ],
     session:{
        strategy:"jwt"
     },
     pages:{
        signIn:'/sign-in'
     },
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        async jwt ({token,user}) {
            if(user){
               token._id = user._id?.toString();
               token.isVerified  = user.isVerified;
               token.isAcceptingMessages  = user.isAcceptingMessages;
               token.username = user.username; 
            } 
            
            return token;
        }, 
        async session({session,token}) {
            if(token){
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            return session;

    }
}

}