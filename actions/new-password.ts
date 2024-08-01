"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByEmail, getPasswordResetTokenByToken } from "@/data/password-reset-token";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>, 
    token?: string | null
) => {
    if (!token){
        return { error: "Missing token!"};
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Invalid fields" };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    
}