import api from '@/lib/axios';


export interface ApiRole {
    id: number | string;
    slug: string;
    name: string;
}

export interface ApiUser {
    id: number | string;
    email: string;
    first_name: string;
    last_name: string;
    roles: ApiRole[];
    permissions: string[];
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

export const logout = async (): Promise<void> => {
    return api.post('/api/v1/logout');
};

export const getProfile = async (): Promise<ApiUser> => {
    const response = await api.get<{ data: ApiUser }>('/api/v1/profile');
    return response.data;
};
