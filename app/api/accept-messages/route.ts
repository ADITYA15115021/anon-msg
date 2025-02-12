
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/app/lib/dbconnect";
import { User } from "@/app/model/user";
import { User } from "next-auth";

export async function POST(req:Response) {
    
    await dbConnect();
    const session = await getServerSession(authOptions); 
    const user:User = session?.user as User;
    if(!session || !session.user){
        return Response.json(
            {
              success:false,
              message:"not authenticates! "
            },
        {
            status:401
        })
    }

    const userId = user._id;
    const {accesptMessages} = await req.json();
    try {

        await User.findByIdAndUpdate(
            
        )
        
    } catch (error) {
        console.log(error);
        return Response.json(
            {
              success:false,
              message:"failed to update user status! "
            },
        {
            status:401
        })
    }
}