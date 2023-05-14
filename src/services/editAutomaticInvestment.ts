import { IApiResponse } from "../types/IApiResponse";
import { INewAutomaticInvestmentPayload } from "../types/INewAutomaticInvestmentPayload";
import api from "../utils/api";

export const editAutomaticInvestment = async (payload: INewAutomaticInvestmentPayload, sessionToken: string): Promise<IApiResponse> => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${sessionToken}` }
        };

        const response = await api.put('/automatic-investment', payload, config);
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

