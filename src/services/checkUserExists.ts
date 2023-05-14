import { IApiResponse } from "../types/IApiResponse";
import { IUserInfo } from "../types/IUserInfo";
import api from "../utils/api";

export const checkUserExists = async (email: string) => {
    try {
        const config = {
            params: { email }
        };
        const response = await api.get('/users/check-email', config);

        if (Object.keys(response.data).length) {
            return new Promise((resolve: (value: IApiResponse) => void): any =>
                resolve({ success: true, data: response.data as IUserInfo }));
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
