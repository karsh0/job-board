import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "./config/validate.config";
import { MESSAGES } from "./utils/messages";

export function middleware(req: NextRequest) {
    console.log('middleware')
    const token = req.cookies.get("token")?.value;

    if(!token){
        return MESSAGES.VALIDATION_FAILED
    }

    //add a token validation
    console.log(token)
    
    const { pathname } = req.nextUrl

    if(pathname != '/signin'){
        return NextResponse.redirect(new URL('/signin', req.url))
    }

}
