import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "../../../services/login";
import { ILoginPayload } from "../../../types/ILoginPayload";
import { IApiResponse } from "../../../types/IApiResponse";

interface ILoginCredentials {
    email: string;
    password: string;
    redirect: boolean;
    csrfToken: string;
    callbackUrl: string;
    json: boolean;
}

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
                        id: '1',
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
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
        },

        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },

        async session({ session, token }) {
            session.user.jwt = token.jwt;

            return Promise.resolve(session)
        },
        async jwt({ token, user, account }) {
            return Promise.resolve(token);
        }

    },
    secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    pages: {
        error: '/entrar', // Changing the error redirect page to our custom login page
        signIn: '/login',
        newUser: '/dashboard'
    }
})

