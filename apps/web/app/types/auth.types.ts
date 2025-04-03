import z from "zod"

export const signupType = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})