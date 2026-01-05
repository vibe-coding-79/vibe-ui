import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
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

    const login = async (email: string, _password: string) => {
        setState((prev) => ({ ...prev, isLoading: true }));

        // Mock login delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock successful login for any admin email
        if (email.includes('admin')) {
            const mockUser: User = {
                id: '1',
                name: 'Jane Admin',
                email: email,
                role: 'admin',
                title: 'Editor in Chief',
                avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMovp_8kO7HK54BhhbkySN1_-bAQTaDVuzzMvjGM8U83ndS_0RQF4QWwKKR6RfySWmxQGXFqsYVePfmleXNS4Gn29R_Rcdn2cY8Pu_6UfP-Ia23BSYw5H-gEA8LQG2WH11wkSk-ju9DSinwMIptI9lpNPnKmV_Ts34T60IMxtrMRwCmjyg9lrxPTZWgdnKcZNQYjv8vcaXsVOhpyWEjTa6pi11KY7ZZzXQTL_o5MTsWcXaI_aTikWBlbpH-ZG3wYeDW7TWx_fqUA',
            };
            localStorage.setItem('auth_user', JSON.stringify(mockUser));
            setState({
                user: mockUser,
                isAuthenticated: true,
                isLoading: false,
            });
        } else {
            setState((prev) => ({ ...prev, isLoading: false }));
            throw new Error('Invalid credentials');
        }
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
        <AuthContext.Provider value={{ ...state, login, logout }}>
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
