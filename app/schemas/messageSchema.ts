

import {z} from "zod";

export const messageSchema = z.object({
    content: z.string()
               .min(1)
               .max(300,{message:"content can't exceed 300 characters"})
})