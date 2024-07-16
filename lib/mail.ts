import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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