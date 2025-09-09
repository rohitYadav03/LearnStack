import {email, z} from "zod"


export const signupSchema = z.object({
    username : z.string().nonempty("Enter the username").min(3, "Minimum of 3").max(10, "maximum 0f 10"),
    email : z.string().email("Invalid Email"),
    password : z.string().min(6, "Password must be at least 6 characters")
})

export const signInSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6)
});

export type signupInput = z.infer<typeof signupSchema>;
export type singinInput = z.infer<typeof signInSchema>;
