import { z } from "zod";

export const usernameValidation = z
          .string()
          .min(2,"username must be atleast 2 character long")
          .max(12,"username can not be more than 12 characters ")
          .regex(/ /,"username can't contain special characters")    

export const signUpSchema = z.object({
    username  : usernameValidation,
    email: z.string().email({message:"invlaid email address"}),
    password:z.string()
    .min(6,{message:"password must be atleast 6 character long"})
    .max(12,{message:"password lenght can't exceed 12"})
})    

