import { title } from "process";
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

export const taskCreationSchema = z.object({
    title: z.string().nonempty("Enter the title"),
    type: z.string().nonempty("Select the type"),
    link: z.string().optional(),
    why: z.string().nonempty("Enter why this task is important"),
    tags: z.array(z.string()),
    reminderDate: z
      .string()
      .nonempty("Reminder date is required")
      .transform((str) => new Date(str)),
});

export const updateTaskSchema = z.object({
    title : z.string().optional(),
    status : z.string().optional(),
    reminderDate : z.string().transform((str) => new Date(str)).optional()
})

export type updateTaskSchema = z.infer<typeof updateTaskSchema>
export type taskcreationinput = z.infer<typeof taskCreationSchema>