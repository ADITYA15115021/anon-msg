"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm,SubmitHandler } from "react-hook-form"
import * as z from "zod";
import Link from "next/Lint";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import { signUpSchema } from "@/app/schemas/signUpSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export default function SignUp(){

    const form = useForm<z.infer<typeof signUpSchema>>({
            resolver:zodResolver(signUpSchema),
            defaultValues:{
                username: "",
                email:"",
                password:""
            }
    });

    const {formState:{isSubmitting} } = useForm();
    
    const { toast } = useToast();
    const router = useRouter();
    

    const onSubmit = async (data:z.infer<typeof signUpSchema>) => {
        
        try {
            isSubmitting(true);
            console.log("inside submit");
            const response  = await axios.post("/api/sign-up",data);
            if( !response.status !== 200){
                toast({
                    title:"failed to signup",
                    description:"something went wrong"
                })
            }

            toast({
                title:"success"
            })
            isSubmitting(false);
            router.replace(`/verify-code/`);

        } catch (error) {
            console.log("error while making request",error)
        }
    }
    
    return (
        <>
         
         <div className="flex justify-center items-center
                         min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white
                            rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        JOIN NOW
                    </h2>
                    <p className="mb-4">
                       sign up to start your journey 
                    </p>
                </div>
                <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6">
                        <FormField
                        control={form.control}  
                        name = "username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username"
                                    {...field}
                                    onChange={(e)=>{
                                        field.onChange(e)    
                                    }}>
                                    </Input>
                                </FormControl>
                            </FormItem>
                        ) }>
                        </FormField>

                        <FormField
                        control={form.control}  
                        name = "email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input placeholder="@gmail.com"
                                    {...field}
                                    onChange={(e)=>{
                                        field.onChange(e)    
                                    }}>
                                    </Input>
                                </FormControl>
                            </FormItem>
                        ) }>
                        </FormField>

                        <FormField
                        control={form.control}  
                        name = "password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input placeholder=""
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