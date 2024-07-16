import { getVerificationByEmail } from "@/data/verification-token"
import { v4 as uuid4 } from "uuid"
import { db } from "./db"

export const generateVerificationToken = async (email: string) => {
    console.log("Generado token")
    const token = uuid4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationByEmail(email)

    if (existingToken){
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken
}