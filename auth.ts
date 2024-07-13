import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { getUserById } from "./data/user"

export const {
    handlers: { GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            console.log("En linkAccount", user)
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }){
            console.log("En signIn:", account?.provider)
            console.log({ user, account, profile, email, credentials }) 
            if (account?.provider !== "credentials") return true
            const existingUser = await getUserById(user.id)
            
            if (!existingUser?.emailVerified) return false

            // const existingUser = await getUserById(user.id)
            // if (!existingUser || !existingUser.emailVerified){
            //     return false
            // }
            return true
        },
        async jwt({ token, user, profile }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            token.role = existingUser.role

            return token
        },
        async session({token, session}){
            console.log("token")
            console.log(token)
            if (token.sub && session.user){
                session.user.id = token.sub
            }
            if (token.role && session.user){
                session.user.role = token.role
            }
            return session
        }

    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt'},
    ...authConfig
})