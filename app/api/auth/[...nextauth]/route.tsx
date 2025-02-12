

import NextAuth from "next-auth";
import { authOptions } from "./options";

//the name has to be handler;
const handler = NextAuth(authOptions); 
export {handler as GET,handler as POST};