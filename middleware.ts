// import { NextResponse } from 'next/server';

// import {
//     DEFAULT_LOGIN_REDIRECT,
//     apiAuthPrefix,
//     authRoutes,
//     publicRoutes
// } from "@/routes";


// export default function middleware(req: any) {
//     const { nextUrl } = req;
//     const isLoggedIn = !!req.auth;

//     const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//     const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//     const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//     if (isApiAuthRoute) {
//         return NextResponse.next();
//     }

//     if (isAuthRoute) {
//         if (isLoggedIn) {
//             return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//         }
//         return NextResponse.next();
//     }

//     if (!isLoggedIn && !isPublicRoute) {
//         return NextResponse.redirect(new URL("/auth/login", nextUrl));
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
// };



import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    console.log("Middleware")
    // console.log(req)
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute){
        return null
    }

    if (isAuthRoute){
        if (isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null
    }

    if (!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/login", nextUrl))
    } 

    return null
})

export const config = {
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}