import axios from "axios";
import { signupType } from "../types/auth.types";
import prisma from "../config/prisma.config";
import bcrypt from "bcryptjs";


export async function signUp({name, email, password}: signupType){
    const existingUser = await prisma.user.findFirst({
        where:{
            email
        }
    })
    if(existingUser){
        alert("email taken")
        return
    }
    const hashPassword = await bcrypt.hash(password,2)

    const user = await prisma.user.create({
        data:{
            name, email, password: hashPassword
        }
    })

    return user
}