import { IApiResponse } from "../types/IApiResponse";
import { ICategoryPayload } from "../types/ICategoryPayload";
import api from "../utils/api";

export const editCategory = async (payload: ICategoryPayload, sessionToken: string): Promise<IApiResponse> => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${sessionToken}` }
        };

        const response = await api.put('/category', payload, config);
        if (response.status === 201) {
            return new Promise((resolve: (value: IApiResponse) => void): any =>
                resolve({ success: true }));
        }

    } catch (error) {
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

