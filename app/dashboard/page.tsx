
"use client"

import axios from "axios";
import { messageSchema } from "@/app/schemas/messageSchema";
import { Message } from "@/app/model/user";
import { useForm } from "react-hook-form"
import * as z from "zod";
import { useCallback, useState } from "react";
import {useSession} from "next-auth/react";
import { User } from "@/app/model/user";
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { AcceptMessageSchema } from "@/app/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";





export default function DashBoard(){

     
    const [messages,setMessages]    =  useState<Message[]>([]);
    const [isLoading,setIsLoading]  =  useState(false);
    const [isSwitchLoading,setSwitchLoading]       =  useState(false);
  
    // const {data:session} = useSession()
    // const {username} = session?.user as User;
    
    const form = useForm<z.infer<typeof AcceptMessageSchema >>({
        resolver:zodResolver(AcceptMessageSchema)
    });
    const {register,watch,setValue} = form;

    const {toast} =  useToast();

    const acceptMessages = watch('acceptMessages');

    //handling of deletion of messages
    const handleDeleteMessage = ( messageId:string) => {
        setMessages(messages.filter( (message) =>  message._id !== messageId   
          ) )
    }



    const fetchAcceptMessage = useCallback( async () => {
         setSwitchLoading(true);
         
         try {

        const response = await axios.get("/api/accept-messages");
        setValue('acceptMessages',response.data.isAcceptingMessage); 
        } catch (error) {
            console.log("error sending update accept",error);
            toast({
                title:"error",
                description:"failed to fetch the message state",
                variant:"destructive"
            })
        }
    },[setValue] );



    const fetchMessages = useCallback(async (refresh:boolean = false)=>{
        setIsLoading(true);
        setSwitchLoading(true);
        try {

        const response = await axios.get("/api/get-messages");
        setMessages(response.data.messages || []);
        } catch (error) {
        console.log(error);
        }finally{
        setIsLoading(false);
        setSwitchLoading(false);
        }
        },[setIsLoading,setMessages] )

    const handleSwitch = async() => {
        try {
            const response = await axios.post("/api/accept-messages",{
                acceptMessages : !acceptMessages
            });

            setValue("acceptMessages",!acceptMessages);
            toast({
                title:response.data.message,
                variant:"default"
            })

         } catch (error) {
            console.log("can't change the state ",error);
        }
    }
    //dummmy;    
    const username = "aditya";
    const baseUrl = `${window.location.protocol}://${window.location.host}`;
    const profileUrl = `${baseUrl}/send-messages/${username}`;

    const handleCopy = () =>{
        
    }

    // if( !session || !session.user ){
    //     return <div>plase login</div>
    // }


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
                    onCheckedChange={handleSwitch}
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