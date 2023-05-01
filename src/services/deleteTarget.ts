import { IApiResponse } from "../types/IApiResponse";
import api from "../utils/api";

interface IDeleteTargetPayload {
    target_id: string;
}

export const deleteTarget = async (payload: IDeleteTargetPayload, sessionToken: string): Promise<IApiResponse> => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${sessionToken}` },
            params: payload
        };

        const response = await api.delete('/target', config);
        if (response.status === 204) {
            return new Promise((resolve: (value: IApiResponse) => void): any =>
                resolve({ success: true }));
        }

    } catch (error) {
        console.log(error);
        const { message } = error.response?.data
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

