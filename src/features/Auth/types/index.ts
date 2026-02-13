export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user'; // Deprecated: use roles/permissions instead
    roles: string[]; // Role slugs
    permissions: string[];
    avatar?: string;
    title?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
