import { verify } from "jsonwebtoken";

export const isValidToken = (token: string): boolean => {
    if (token) {
        try {
            verify(
                token.replace(/["]/g, ''),
                process.env.NEXTAUTH_SECRET,
            );
            return true;
        } catch {
            return false;
        }
    }
    return false;
}