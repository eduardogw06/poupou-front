import NextAuth from "next-auth";
import { Session } from "next-auth/core/types";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { login } from "../../../services/login";
import { IApiResponse } from "../../../types/IApiResponse";
import { ILoginPayload } from "../../../types/ILoginPayload";
import { IJwtProps, ILoginCredentials, IRedirectProps, ISessionProps } from "../../../types/INextAuthApi";


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,

        }),
        CredentialsProvider({
            name: "NextAuthCredentials",
            credentials: {},
            async authorize(credentials: ILoginCredentials): Promise<any> {
                const { email, password } = credentials;

                try {
                    const loginData = await login({ email, password } as ILoginPayload) as IApiResponse;

                    if (!loginData.success) return Promise.reject(new Error(loginData.message));

                    return {
                        id: loginData.data.user.id,
                        name: loginData.data.user.name,
                        email: loginData.data.user.email,
                        jwt: loginData.data.token
                    }
                } catch (error) {
                    return Promise.reject(new Error(process.env.NEXT_PUBLIC_API_DEFAULT_ERROR));;
                }
            }
        })

    ],
    session: {
        strategy: 'jwt',
        maxAge: 1 * 24 * 60 * 60,
    },
    callbacks: {
        async redirect({ url, baseUrl }: IRedirectProps): Promise<string> {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
        },

        async signIn(): Promise<boolean> {
            return true;
        },

        async session({ session, token }: ISessionProps): Promise<Session> {
            session.user.jwt = token.jwt;
            session.user.id = token.id as string;

            return Promise.resolve(session)
        },
        async jwt({ token, user }: IJwtProps): Promise<JWT> {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.jwt = user.jwt
            }

            return Promise.resolve(token);
        }

    },
    secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    pages: {
        error: '/entrar',
        signIn: '/login',
        newUser: '/dashboard'
    }
})

