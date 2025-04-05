"use server"

import { signupType, signinType } from "../types/auth.types";
import { prismaClient } from "../config/prisma.config";
import bcrypt from "bcryptjs";
import { MESSAGES } from "../utils/messages";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
export async function signUp({name, email, password}: signupType){
    const existingUser = await prismaClient.user.findFirst({
        where:{
            email
        }
    })
    if(existingUser){
        return MESSAGES.USER.EXISTS
    }
    const hashPassword = await bcrypt.hash(password,2)

    const user = await prismaClient.user.create({
        data:{
            name, email, password: hashPassword
        }
    })

    return {
        message: MESSAGES.SUCCESS,
        user
    }
}

export async function signIn({email, password}: signinType){
    const user = await prismaClient.user.findFirst({
        where: {
            email
        }
    })
    if(!user || !user.password){
        return MESSAGES.USER.NOT_FOUND
    }
    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
        return MESSAGES.USER.INVALID_PASSWORD
    }
    const JWT_SECRET= "supersecretstring123"
    const token = jwt.sign({userId : user.id},JWT_SECRET ?? "")
    
    const cookieStore = await cookies(); 
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
    const cookie = cookieStore.get("token")
    return {
        token,
        user,
        cookie
    }
}

