import { JWT } from "next-auth/jwt";
import { Account, Profile, Session, User } from "next-auth/core/types";
import { AdapterUser } from "next-auth/adapters";


export interface ILoginCredentials {
    email: string;
    password: string;
    redirect: boolean;
    csrfToken: string;
    callbackUrl: string;
    json: boolean;
}

export interface IRedirectProps {
    url: string;
    baseUrl: string;
}

export interface ISessionProps {
    session: Session;
    user: User | AdapterUser;
    token: JWT;
}

export interface IJwtProps {
    token: JWT;
    user?: User | AdapterUser;
    account?: Account | null;
    profile?: Profile;
    isNewUser?: boolean;
}