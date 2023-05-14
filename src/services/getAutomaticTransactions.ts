import { IApiResponse } from "../types/IApiResponse";
import { IGetTarget } from "../types/IGetTarget";
import api from "../utils/api";

export const getAutomaticTransactions = async (sessionToken: string): Promise<IApiResponse> => {
    try {

        const config = {
            headers: { Authorization: `Bearer ${sessionToken}` },
        };
        const response = await api.get('/automatic-investment', config);

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