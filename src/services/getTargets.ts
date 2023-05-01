import { IApiResponse } from "../types/IApiResponse";
import { IGetTarget } from "../types/IGetTarget";
import api from "../utils/api";

interface GetTargetsProps {
    userId: string;
    sessionToken: string;
    targetId?: string;
}

export const getTargets = async ({ userId, sessionToken, targetId }: GetTargetsProps): Promise<IApiResponse> => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${sessionToken}` },
            params: targetId ? { user_id: userId, target_id: targetId } : { user_id: userId }
        };
        const response = await api.get('/target', config);

        if (Object.keys(response.data).length) {
            return new Promise((resolve: (value: IApiResponse) => void): any =>
                resolve({ success: true, data: response.data as IGetTarget[] }));
        }

    } catch (error) {
        const { message } = error.response.data
        if (message) {
            return new Promise((resolve: (value: IApiResponse) => void): void =>
                resolve({ success: false, message: message }))
        }

        return new Promise(
            (resolve: (value: IApiResponse) => void): void =>
                resolve({ success: false, message: process.env.NEXT_PUBLIC_API_DEFAULT_ERROR })
        );
    }
}