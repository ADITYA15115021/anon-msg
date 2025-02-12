
import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document {
    content:string,
    createdAt: Date
}

export interface User extends Document{
    username    :  string,
    email       :  string,
    passwrod    :  string,
    isVerified  :  boolean,
    verifyCode  :  Date,
    codeExpiry  :  Date,
    isAccepting :  boolean,
    messages     : Message[] 
}

const MessageSchema : Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }

})

const userSchema : Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        trim:true 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/.+\@.+\..+/,'use a valid email address']
    },
    passwrod:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifyCode:{
        type:Date,
        required:[true,"verification code is required"],

    },
    codeExpiry:{
        type:Date,
        required:true 
    },
    isAccepting:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]

})


export const User = models.User || model("User", userSchema);
export const Message = models.Message || model("Message", MessageSchema);