import { useMutation } from '@tanstack/react-query';
import { authenticate, getProfile } from '../api/auth';
import type { LoginPayload } from '../api/auth';
import type { User } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const useLogin = () => {
    const { setAuthUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    return useMutation({
        mutationFn: async (payload: LoginPayload) => {
            const authResponse = await authenticate(payload);
            const { access_token } = authResponse.data;
            // Store token immediately to allow getProfile to use it via interceptor
            localStorage.setItem('auth_token', access_token);
            const profile = await getProfile();
            return { authResponse, profile };
        },
        onSuccess: (data) => {
            const { authResponse, profile } = data;
            const { access_token } = authResponse.data;

            // Use profile for roles and permissions
            const roleSlugs = profile.roles ? profile.roles.map(r => r.slug) : [];
            const permissions = profile.permissions || [];
            const isAdmin = roleSlugs.includes('admin');

            console.log("Logged in user:", profile.email, "Roles:", roleSlugs);

            // Map ApiUser (from profile) to User
            const user: User = {
                id: String(profile.id),
                name: `${profile.first_name} ${profile.last_name}`,
                email: profile.email,
                role: isAdmin ? 'admin' : 'user', // Backward compatibility
                roles: roleSlugs,
                permissions: permissions,
                avatar: undefined,
                title: undefined
            };

            // Ensure token is stored (redundant but safe)
            localStorage.setItem('auth_token', access_token);

            // Update global state and local storage
            setAuthUser(user);

            // Redirect logic
            const redirectPath = from || (isAdmin ? '/admin/dashboard' : '/');
            navigate(redirectPath, { replace: true });
        },
    });
};
