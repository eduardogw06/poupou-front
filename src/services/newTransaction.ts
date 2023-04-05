import { IApiResponse } from "../types/IApiResponse";
import { INewTransactionPayload } from "../types/INewTransactionPayload";
import api from "../utils/api";

export const newTransaction = async (payload: INewTransactionPayload, sessionToken: string) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${sessionToken}` }
        };
        const response = await api.post('/transaction', payload, config);
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