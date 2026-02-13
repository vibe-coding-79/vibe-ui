import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';

interface PermissionContextType {
    permissions: string[];
    hasPermission: (permission: string) => boolean;
    hasRole: (roleSlugs: string[]) => boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    // Derive permissions from the user object. 
    // Prioritize direct 'permissions' array from API, otherwise map from 'roles'.
    const permissions = useMemo(() => {
        if (!user) return [];
        // Assuming API provides 'permissions' directly.
        return user.permissions || [];
    }, [user]);

    // Function to check if the user has a specific permission
    const hasPermission = (permission: string) => permissions.includes(permission);

    // Function to check if the user has at least one of the required roles (by slug)
    const hasRole = (roleSlugs: string[]) => {
        if (!user || !user.roles) return false;
        // user.roles is just string[], so we check if any matches
        return user.roles.some(role => roleSlugs.includes(role));
    };

    return (
        <PermissionContext.Provider value={{ permissions, hasPermission, hasRole }}>
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermission = () => {
    const context = useContext(PermissionContext);
    if (context === undefined) {
        throw new Error('usePermission must be used within a PermissionProvider');
    }
    return context;
};
