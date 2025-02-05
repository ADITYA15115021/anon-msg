import mongoose from "mongoose";

type ConnectionObject  = {
    isConnected? : number
} 

const connection : ConnectionObject = {};


export async function dbConnect() : Promise<void>{
    
    if(connection.isConnected){
        console.log("db already connected!");
        return;
    }

    try{

        const db = await mongoose.connect(process.env.DATABASE_URL || "");
        connection.isConnected = db.connections[0].readyState;
        console.log("db connection successfull!")

    }catch(error){
     console.log("error in connecting",error)
    }

    
}