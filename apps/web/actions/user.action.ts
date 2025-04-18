"use server"

import { cookies } from "next/headers";
import { prismaClient } from "../config/prisma.config";
import { AddEducationType, AddSkillsType, UserProfileType } from "../lib/validators/user.profile.validator";
import { MESSAGES } from "../utils/messages";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/validate.config";

export async function updateUser(data: UserProfileType){
    try{
    const existingUser = await prismaClient.user.findFirst({
        where:{
            email: data.email
        }
    })
    if(!existingUser) return MESSAGES.USER.NOT_FOUND

    await prismaClient.user.update({
        where:{
            id: existingUser.id
        },
        data:{
            email: data.email,
            name: data.name
        }
    })
    return {
        success: 'Your profile has updated successfully'
    }
    }catch(error){
        return {
            error
        }
    }
}

async function InitUserId(){
    console.log("init")
    const token = (await cookies()).get('token') 
    const user = jwt.verify(token?.value!, JWT_SECRET)
    // @ts-ignore
    return user.userId
}

export async function updateAvatar(avatarFile: string){
    const userId = await InitUserId()
    await prismaClient.user.update({
        where:{
            id: userId
        },
        data:{
            avatar: avatarFile
        }
    })
}

export async function addSkills(data: AddSkillsType){
    const userId = await InitUserId()
    await prismaClient.user.update({
        where:{
            id: userId
        },
        data:{
            skills: data.skills
        }
    })
}

export async function addEducation(data: AddEducationType){
    const userId = await InitUserId()
    await prismaClient.education.create({
        data:{
            instituteName: data.institue,
            year: data.year,
            degree: data.degree,
            userId
        }
    })
}

export async function addResume(resume: string){
    const userId = await InitUserId()
    await prismaClient.user.update({
        where:{
            id: userId
        },
        data:{
            resume,
            resumeUpdateDate: new Date()
        }
    })
}
