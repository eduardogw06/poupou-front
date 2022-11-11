import { IApiResponse } from "../../types/IApiResponse";
import { IRegisterPayload } from "../../types/IRegisterPayload";
import api from "../../utils/api";

export const userRegister = async (payload: IRegisterPayload): Promise<IApiResponse> => {
    try {
        const response = await api.post('/users', payload);

        if (Object.keys(response).length) {

            console.log(response);

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

