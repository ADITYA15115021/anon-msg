"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { string } from "zod";


export default function SendMessages() {
  const params = useParams(); // Unwrap params

  const form = useForm();
  const {register,watch,handleSubmit,formState,getValues} = form;
  const {errors,isSubmitting} = formState; 

  async function sendMessage(){
    try {
      const response = await axios.post("/api/send-messages",{
        username: params.name,
        content:getValues("content")
      });

      if( !response){
          console.log("can't send ")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      
      <div className="min-h-screen flex flex-col">

        <header className="h-24 border border-b-gray-300 shadow">
            <h2 className="text-center pt-8 text-xl font-semibold">SEND ANONYMOUS MESSAGES  </h2>
        </header>

        <main className="flex-1 ">

          
          <div className="flex flex justify-center">
            <div className="flex flex-col gap-1 w-2/3 ">

              <p className="p-4">SEND ANONYMOUS MESSAGES TO {params.name}</p>
              <form onSubmit={handleSubmit(onSubmit)}
                    className="h-32 flex flex-col justify-between">

                  <Input className="h-1/2">
                  </Input>
                  
                  <div className="flex flex-row justify-center">
                    <Button type="submit">
                      SEND
                    </Button>
                  </div>
                </form>
             
             </div>
          </div>


          <div className="mt-12 flex justify-center">

            <div className="flex flex-col gap-1 w-2/3 ">

              <div>
              <button className="w-52 text-white bg-black rounded">SUGGEST MESSAGES</button>
              </div>

              <div className="mt-4 mb-4 ">
                Click to select a message !
              </div>

              <div className="border rounded-lg  shadow border-gray-200 h-44">
                <div className="m-1 flex justify-center font-semibold">MESSAGES</div>
                  <div className="mt-4 flex flex-col gap-2">
                    {
                      messages.map( (message,index) => (
                        <SuggestMessageCard key={index} content = {message}></SuggestMessageCard>
                      ) )
                    }
                  </div>
              </div>

            </div>
          </div>

          <div className=" mt-8 flex justify-center" >

            <div className="border rounded-lg border-gray-300 shadow 
                            flex flex-col items-center w-2/3">
                  <div className="m-2 px-12 h-8">WANT YOUR OWN MESSAGE BOARD </div>
                  <button className="border border-black rounded-lg px-2 w-fit m-4 text-white bg-black">CLICK TO CREATE ACCOUNT </button>
            </div>

          </div>

        </main>

        <footer className="mt-4 border border-t flex h-16 justify-center items-center
                          bg-black">
            <p className=" text-white">ALL COPYRIGHTS RESERVED</p>
        </footer>

      </div>
       
    </>
 
  )
}


function SuggestMessageCard({content} ){

  return (
    <>
      <button className="mx-2 border rounded-lg  px-8 h-8 flex items-center">
        {content}
      </button>    
    </>
  )
}

const messages= [ "what's your favourite movie ?", 
                  "what do you do in the mean time ",
                  "how would you like to spend time in a day"
                ]
