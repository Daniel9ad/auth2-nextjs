import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
    console.log("Enviando email")
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    const result = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
    });
    console.log("Resultado:",result)
};  


export const sendVerificationEmail = async (email: string, token: string) => {
    console.log("Enviando email")
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    const result = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
    console.log("Resultado:",result)
};  