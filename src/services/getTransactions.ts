import { IApiResponse } from "../types/IApiResponse";
import { IGetTarget } from "../types/IGetTarget";
import api from "../utils/api";

interface GetTransactionsProps {
    userId: string;
    transactionId?: string;
    targetId?: string;
    sessionToken: string;
}

export const getTransactions = async ({ userId, transactionId, targetId, sessionToken }: GetTransactionsProps): Promise<IApiResponse> => {
    try {
        const params = { user_id: userId };


        const config = {
            headers: { Authorization: `Bearer ${sessionToken}` },
            params: transactionId ? { ...params, transaction_id: transactionId } : (targetId ? { ...params, target_id: targetId } : params)
        };
        const response = await api.get('/transaction', config);

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