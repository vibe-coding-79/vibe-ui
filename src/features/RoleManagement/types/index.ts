export interface Role {
    id: string;
    name: string;
    description: string;
    type: 'System' | 'Custom';
    slug: string;
    permissions: string[]; // e.g., ["ALL_PERMISSIONS"] or ["POST_PUBLISH", "CAT_MANAGE"]
    userCount: number;
}

export interface RoleStats {
    totalRoles: number;
    activePermissions: number;
    assignedUsers: number;
}

export interface Permission {
    id: string;
    label: string;
    description: string;
    checked?: boolean;
}

export interface PermissionGroup {
    id: string;
    label: string;
    icon: string;
    permissions: Permission[];
}
