"use client"

import { useRouter } from "next/navigation"

interface LogginButtonProps {
    children: React.ReactNode,
    mode?: "modal" | "redirect",
    asChild?: boolean
}

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild
}: LogginButtonProps) => {

    const router = useRouter()

    const onClick = () => {
        router.push("auth/login")
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}