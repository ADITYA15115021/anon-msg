
"use client"

import axios from "axios";
import { useForm } from "react-hook-form"
import * as z from "zod";
import { useState } from "react";
import {useSession} from "next-auth/react";
import { User } from "@/app/model/user";
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { register } from "module";
import { AcceptMessageSchema } from "@/app/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";




export default function DashBoard(){

    const {data:session} = useSession()
    const {username} = session?.user as User;
    
    const form = useForm<z.infer< >>({
        resolver:zodResolver(AcceptMessageSchema)
    });
    const {register,watch,setValue} = form;

    const acceptMessages = watch('acceptMessages');
     
    
    const [messages,setMessages] = useState([]);
    const [loading,setLoading]   = useState();

    const {toast} = toast();

   

   


    const handleDelete = async () => {
        setMessages( messages.filter( (message) => {

        }  ) )
    }

    const fetchAcceptingState = async () => {
        try {
            
        } catch (error) {
            console.log("error fetching state",error);
        }
    }

    const fetchAcceptMessages 

    const baseUrl = `${window.location.protocol}://${window.location.host}`;
    const profileUrl = `${baseUrl}/u/${username}`;

    const handleCopy = () =>{
        
    }

    if( !session || !session.user ){
        return <div>plase login</div>
    }


    return(
        <>
          <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white
                        rounded w-full max-w-6xl">
                <h1 className="text-4xl font-bold mb-4 ">DASHBOARD</h1>            

                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">COPY YOUR ADDRESS LINK</h2>
                    {' '}
                    <div className="flex items-center">
                        <input
                          type="text"
                          value={profileUrl}
                          disabled
                          className="input input-bordered w-full p-2 mr-2"
                          >
                        </input>
                        <Button onClick={handleCopy}>COPY</Button>
                    </div>
                </div>  

                <div className="mb-4">
                    <Switch
                    {...register('acceptMessages')}
                    checked={acceptMessages}
                    onCheckedChange={handleSwitchChange}
                    disabled={isSwitchLoading}
                    >

                    </Switch>

                    <span className="ml-2">
                      ACCEPT MESSAGES : {acceptMessages ? "ON" : "OFF"}
                    </span>
                </div>
                <Separator/>
                
                <Button variant="outline"
                        className="mt-4" 
                        onClick={(e)=>{
                            e.preventDefault();
                            fetchMessages(true);
                        }}
                >


                </Button>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {messages.length > 0 ? (
                      messages.map((message,index) => (
                        <MessageCard
                            key={message._id}
                            message={message}
                            onMessageDelete={handleDeleteMessage}
                        ></MessageCard>
                      ) )
                    ): (
                        <p>no message to display</p>
                    )}

                </div>
                


          </div>
         
        </>
    )
}


function MessageCard({}){
    return (
        <>

        </>
    )
}