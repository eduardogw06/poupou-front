import { sign } from "jsonwebtoken";
import NextAuth from "next-auth";
import { Session } from "next-auth/core/types";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { checkUserExists } from "../../../services/checkUserExists";
import { getMenus } from "../../../services/getMenus";
import { login } from "../../../services/login";
import { userRegister } from "../../../services/userRegister";
import { IApiResponse } from "../../../types/IApiResponse";
import { IGetMenus } from "../../../types/IGetMenus";
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
                        jwt: loginData.data.token,
                        is_admin: loginData.data.user.is_admin
                    }
                } catch (error) {
                    return Promise.reject(new Error(process.env.NEXT_PUBLIC_API_DEFAULT_ERROR));
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

        async signIn({ user, account, profile, credentials }): Promise<boolean> {
            if (account.provider === 'google') {
                const result = await checkUserExists(user.email);

                if (result.success) {
                    const { user_id, user_exists } = result.data;
                    if (!user_exists) {
                        const registerPayload = {
                            name: profile.name,
                            email: profile.email,
                            password: '',
                            confirmPassword: '',
                            googleId: profile.sub
                        };
                        const result = await userRegister(registerPayload);

                        if (result.success) {
                            user.id = result.data.uuid;
                            return true;
                        }
                    }

                    user.id = user_id;
                    return true;
                }
                return false;
            }
            return true;
        },

        async session({ session, token }: ISessionProps): Promise<Session> {
            session.user.jwt = token.jwt;
            session.user.id = token.id as string;
            session.user.is_admin = token.is_admin as boolean;

            const response = await getMenus(token.jwt as string);

            if (response && response.success) {
                session.menu = response.data as IGetMenus[];
            }

            return Promise.resolve(session)
        },
        async jwt({ token, user }: IJwtProps): Promise<JWT> {
            if (user) {
                if (!user.jwt) {
                    user.jwt = sign(token, process.env.NEXTAUTH_SECRET, {
                        expiresIn: "1d",
                    });
                }

                // console.log(user);

                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.jwt = user.jwt;
                token.is_admin = user.is_admin;
            }

            return Promise.resolve(token);
        }

    },
    pages: {
        error: '/error',
        signIn: '/login',
        newUser: '/dashboard'
    }
})

