import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            /** Oauth access token */
            jwt?: accessToken;
            id?: string;
        } & DefaultSession["user"];
    }

    interface User {
        jwt?: accessToken;
        id?: string;
    } DefaultUser
}