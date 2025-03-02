import { NextRequest, NextResponse } from "next/server";
import { signupType } from "../../types/authTypes";
import { prismaClient } from "@repo/db/client"

export async function POST(req: NextRequest) {
    try {
        const data =  signupType.parse(await req.json());
        await prismaClient.user.create({
            data:{
                    name: data.name,
                    email: data.email,
                    password: data.password
            }
        })
        return NextResponse.json({message:"user created"});
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
