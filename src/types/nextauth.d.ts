import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            /** Oauth access token */
            jwt?: accessToken;
        } & DefaultSession["user"];
    }

    interface User {
        jwt?: accessToken
    } DefaultUser
}