import { useMutation } from '@tanstack/react-query';
import { authenticate } from '../api/auth';
import type { LoginPayload, AuthResponse } from '../api/auth';
import type { User } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const useLogin = () => {
    const { setAuthUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/admin/dashboard';

    return useMutation({
        mutationFn: (payload: LoginPayload) => authenticate(payload),
        onSuccess: (response: AuthResponse) => {
            const { access_token, user: apiUser } = response.data;

            // Map ApiUser to User
            const user: User = {
                id: String(apiUser.id),
                name: `${apiUser.first_name} ${apiUser.last_name}`,
                email: apiUser.email,
                role: 'admin',
                avatar: undefined,
                title: undefined
            };

            // Store token
            localStorage.setItem('auth_token', access_token);

            // Update global state and local storage
            setAuthUser(user);

            // Redirect
            navigate(from, { replace: true });
        },
    });
};
