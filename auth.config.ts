import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials){
                console.log("En Authorize")
                console.log(credentials)
                const validatedFields = LoginSchema.safeParse(credentials)
                if (validatedFields.success){
                    const { email, password } = validatedFields.data
                    const user = await getUserByEmail(email)
                    
                    if (!user || !user.password) return null
                    console.log("Usuario encontrado")
                    console.log(user)
                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    )
                    console.log("Contrasena valida", passwordMatch)
                    if (passwordMatch) return user
                }
                console.log("No authorize")
                return null
            }
        })
    ]
} satisfies NextAuthConfig