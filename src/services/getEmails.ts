import { IApiResponse } from "../types/IApiResponse";
import { IGetMenus } from "../types/IGetMenus";
import api from "../utils/api";

export const getEmails = async (sessionToken: string, emailId?: string): Promise<IApiResponse> => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${sessionToken}` },
            params: emailId ? { email_id: emailId } : {}
        };
        const response = await api.get('/system/email', config);

        if (Object.keys(response.data).length) {
            return new Promise((resolve: (value: IApiResponse) => void): any =>
                resolve({ success: true, data: response.data as IGetMenus[] }));
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
