import { db } from "@/lib/db"

export const getVerificationByToken = async (
    token: string
) => {
    try{
        console.log("Varification by token:",token)
        const verificationToken = await db.verificationToken.findUnique({
            where: { token: token }
        })
        console.log("fin verificacion:",verificationToken)
        return verificationToken
    }catch {
        return null
    }
}

export const getVerificationByEmail = async (
    email: string
) => {
    try{
        const verificationToken = await db.verificationToken.findFirst({
            where: { email }
        })
        console.log("Verification with:",verificationToken)
        return verificationToken
    }catch {
        return null
    }
}