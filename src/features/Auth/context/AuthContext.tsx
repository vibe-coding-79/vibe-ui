import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setAuthUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    useEffect(() => {
        // Check for saved auth state in localStorage
        const savedUser = localStorage.getItem('auth_user');
        if (savedUser) {
            setState({
                user: JSON.parse(savedUser),
                isAuthenticated: true,
                isLoading: false,
            });
        } else {
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    }, []);

    const setAuthUser = (user: User) => {
        localStorage.setItem('auth_user', JSON.stringify(user));
        setState({
            user,
            isAuthenticated: true,
            isLoading: false,
        });
    };

    const login = async (_email: string, _password: string) => {
        // Deprecated: Use useLogin hook instead
        // This is kept for any legacy calls, but effectively does nothing now or mocks
        console.warn('Using deprecated login method');
    };

    const logout = () => {
        localStorage.removeItem('auth_user');
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
