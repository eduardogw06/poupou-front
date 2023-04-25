import { verify } from "jsonwebtoken";

export const isValidToken = (token: string): boolean => {
    if (token) {
        try {
            verify(
                token.replace(/["]/g, ''),
                process.env.NEXT_PUBLIC_SECRET_TOKEN,
            );

            return true;
        } catch {
            return false;
        }
    }
    return false;
}