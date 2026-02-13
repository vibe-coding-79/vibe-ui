import { useMutation } from '@tanstack/react-query';
import { logout as logoutApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const { logout: contextLogout } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: () => logoutApi(),
        onSuccess: () => {
            contextLogout();
            navigate('/', { replace: true });
        },
        onError: (error) => {
            console.error('Logout failed:', error);
            // Verify if we should logout anyway on error?
            // Usually yes, if token is invalid, we should clear state remotely.
            // But let's stick to calling contextLogout only on success or if we force it.
            // For now, let's also clear local state just in case, or just log.
            // A robust auth system usually clears local state even if server fails.
            contextLogout();
            navigate('/', { replace: true });
        }
    });
};
