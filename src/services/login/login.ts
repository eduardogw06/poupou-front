import { ILoginPayload } from '../../types/ILoginPayload';
import { ILoginResponse } from '../../types/ILoginResponse';
import api from '../../utils/api';

export const login = async (payload: ILoginPayload): Promise<ILoginResponse> => {
    try {
        const response = await api.post('/login', payload);

        if (Object.keys(response).length) {

            const { token } = response.data;
            localStorage.setItem('sessionToken', JSON.stringify(token));

            return new Promise((resolve: (value: ILoginResponse) => void): any =>
                resolve({ success: true }));
        }

    } catch (error) {
        const { message } = error.response.data
        if (message) {
            return new Promise((resolve: (value: ILoginResponse) => void): void =>
                resolve({ success: false, message: message }))
        }

        return new Promise(
            (resolve: (value: ILoginResponse) => void): void =>
                resolve({ success: false, message: process.env.NEXT_PUBLIC_API_DEFAULT_ERROR })
        );
    }
}