
import { User } from "@/app/model/user";
import { dbConnect } from "@/app/lib/dbconnect";

export async function POST(req:Request){

    await dbConnect();
    const {username,content} = await req.json();
    
    try {

        const user = await User.findOne({username});
        if(!user){
            return Response.json({
                success:false ,
                message:"user does not exist"
            },
        {status:111})
        }

        if(!user.isAcceptingMessages){
            return Response.json({
                success:false ,
                message:"user is not acceting messages currentl!"
            })
        }

        const newMessage = { content , createdt:new Date()  };
        user.messages.push(newMessage);
        await user.save();

        return Response.json({
            success:true,
            message:"message send successfully!"
        },
        {
            status:200
        })
        
    } catch (error) {
        console.log(error)
    }



}
