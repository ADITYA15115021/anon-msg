
import { NextRequest,NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export function middleware(request:NextRequest){
    
}

export const config = {
    matcher:[
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard',
        '/verify'
    ]
}