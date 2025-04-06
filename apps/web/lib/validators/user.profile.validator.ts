import { z } from "zod";

export const UserProfileSchema = z.object({
    name: z.string().min(1,'Name is required'),
    email: z.string().email('Email is invalid')
})

export const addSkillsSchema = z.object({
    skills: z.array(z.string()).optional()
})

export const addEducationSchema = z.object({
    institue: z.string(), 
    year: z.string(),
    degree: z.string(),
    userId: z.string()
})


export type UserProfileType = z.infer<typeof UserProfileSchema>
export type AddSkillsType = z.infer<typeof addSkillsSchema>
export type AddEducationType = z.infer<typeof addEducationSchema>