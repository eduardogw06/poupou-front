import { IApiResponse } from "../types/IApiResponse";
import { IEditUserPayload } from "../types/IEditUserPayload";
import api from "../utils/api";

export const editUserPhoto = async (payload: any, sessionToken: string): Promise<IApiResponse> => {
    try {
        const config = {
            headers: { 'Authorization': `Bearer ${sessionToken}`, 'Content-Type': 'multipart/form-data' }
        };
        const response = await api.post('/users/update-photo', payload, config);
        if (response.status === 204) {
            return new Promise((resolve: (value: IApiResponse) => void): any =>
                resolve({ success: true }));
        }
        // // console.log(response);
        // if (response.status === 500) throw new Error(response.statusText);

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

