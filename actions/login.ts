"use server"

import { LoginSchema } from "@/schemas"
import { signIn } from "@/auth"
import * as z from "zod"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mail"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    console.log("En login...")
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success){
        return { error: "Invalid fields", success:""}
    }

    const { email, password } = validatedFields.data
    
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password){
        return { error: "Email does not exist"}
    }

    if (!existingUser.emailVerified){
        console.log("Sin verificacion")
        const verificationToken = await generateVerificationToken(existingUser.email)

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return { success: "Confirmation email sent"}
    }

    try {
        await signIn("credentials", {
            email: email,
            password: password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        
    }catch(error){
        if (error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin":
                    return { error:"Invalid credentials!", success:"" }
                default:
                    return { error:"Something went wrong!", success:"" }
            }
        }
        throw error
    }
    return { error: "", success:"Exito"}
}
