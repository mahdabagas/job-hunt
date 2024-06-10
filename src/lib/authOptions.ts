import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { comparePassword } from '@/lib/utils'
import prisma from '../../lib/prisma';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text'
                },
                password: {
                    label: "Password",
                    type: 'text'
                }
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!user) {
                    return null
                }

                const isMath = await comparePassword(credentials?.password!!, user.password)

                if (isMath) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/signin',
        error: '/auth/error',
        newUser: '/signup'
    },
    callbacks: {
        jwt({token, account, user}) {
            if (account) {
                token.id = user.id
            }

            return token;
        },
        async session({session, token}) {
            session.user.id = token.id

            return session
        }
    }
};