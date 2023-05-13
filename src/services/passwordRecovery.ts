import { IApiResponse } from "../types/IApiResponse";
import { IPasswordRecovery } from "../types/IPasswordRecovery";
import api from "../utils/api";

export const passwordRecovery = async (payload: IPasswordRecovery): Promise<IApiResponse> => {
    try {
        const response = await api.post('/users/password-recovery', payload);
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

