import { IApiResponse } from "../types/IApiResponse";
import { IUpdatePasswordPayload } from "../types/IUpdatePasswordPayload";
import api from "../utils/api";
import { getSessionTokenHeader } from "../utils/getSessionToken";

export const updatePassword = async (payload: IUpdatePasswordPayload): Promise<IApiResponse> => {
    try {
        const config = getSessionTokenHeader();
        const response = await api.patch('/users/update-password', payload, config);
        if (response.status === 200) {
            return new Promise((resolve: (value: IApiResponse) => void): any =>
                resolve({ success: true }));
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

