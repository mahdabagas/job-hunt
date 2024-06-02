import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Sessopm {
        user: { id: string } & DefaultSession['user']
    }
}