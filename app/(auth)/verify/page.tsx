
"use client"

import { verifySchema } from "@/app/schemas/verifySchema";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { useForm,SubmitHandler } from "react-hook-form"
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";


export default  function VerifyAccount(){
    //const router = useRouter();
    const params = useParams<{username : string}>();
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema)
    });
    
    const {formState:{isSubmitting} } = useForm();
    const {toast} = useToast();
    
    const onSubmit = async (data : z.infer<typeof verifySchema>) => {
        
        try {
            const response = await axios.post("",{
                 username:params.username,
                 code : data.code
            })

            toast({
                title:"success",
                description:response.data.message
            })

            //router.replace('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>

<div className="flex justify-center items-center
                         min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white
                            rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        VERIFY CODE
                    </h2>
                    <p className="mb-4">
                       ENTER THE CODE SEND TO YOUR EMAIL 
                    </p>
                </div>

                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6">
                             <FormField
                        control={form.control}  
                        name = "code"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>VERIFICATION-CODE</FormLabel>
                                <FormControl>
                                    <Input placeholder="123XXX"
                                    {...field}
                                    onChange={(e)=>{
                                        field.onChange(e)    
                                    }}>
                                    </Input>
                                </FormControl>
                            </FormItem>
                        ) }>
                        </FormField>

                        <Button type="submit" className="" disabled={isSubmitting}>
                            { isSubmitting ? "submitting " : "SUBMIT"}
                        </Button>
                    </form>

                </Form>



            </div>
</div>                
        
        </>
    )
}