import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { IGetMenus } from "./IGetMenus";

declare module "next-auth" {
    interface Session {
        menu: IGetMenus[],
        user: {
            /** Oauth access token */
            jwt?: accessToken;
            id?: string;
            is_admin?: boolean;
        } & DefaultSession["user"];
    }

    interface User {
        jwt?: accessToken;
        id?: string;
        is_admin?: boolean;
    } DefaultUser
}