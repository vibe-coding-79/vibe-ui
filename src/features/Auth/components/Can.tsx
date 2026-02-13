import React from 'react';
import { usePermission } from '../context/PermissionContext';

interface CanProps {
    perform: string;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export const Can: React.FC<CanProps> = ({ perform, children, fallback = null }) => {
    const { hasPermission } = usePermission();
    return hasPermission(perform) ? <>{children}</> : <>{fallback}</>;
};
