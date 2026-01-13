import api from '@/lib/axios';


export interface ApiUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

export interface AuthResponse {
    data: {
        access_token: string;
        user: ApiUser;
    }
}

export interface LoginPayload {
    email: string;
    password: string;
}

export const authenticate = async (payload: LoginPayload): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/api/v1/authenticate', payload);
};
