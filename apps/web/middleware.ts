import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    //add a token validation
    
    const { pathname } = req.nextUrl

    if(pathname != '/signin' && !token){
        return NextResponse.redirect(new URL('/signin', req.url))
    }

}
