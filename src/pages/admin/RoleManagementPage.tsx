import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Link } from 'react-router-dom';
import RoleStats from '@/features/RoleManagement/components/RoleStats';
import RoleFilter from '@/features/RoleManagement/components/RoleFilter';
import RoleTable from '@/features/RoleManagement/components/RoleTable';
import type { Role } from '@/features/RoleManagement/types';

// Mock Data
const MOCK_ROLES: Role[] = [
    {
        id: '1',
        name: 'Super Admin',
        description: 'Complete administrative control over all system modules, settings, and user hierarchies.',
        type: 'System',
        slug: 'full_access_node',
        permissions: ['ALL_PERMISSIONS'],
        userCount: 3,
    },
    {
        id: '2',
        name: 'Chief Editor',
        description: 'Manage all blog content, categories, and tags. Oversee contributor submissions.',
        type: 'Custom',
        slug: 'content_lead',
        permissions: ['POST_PUBLISH', 'CAT_MANAGE', '+4 more'],
        userCount: 12,
    },
    {
        id: '3',
        name: 'Staff Author',
        description: 'Create and edit personal articles. Access to media library and analytics.',
        type: 'Custom',
        slug: 'internal_writer',
        permissions: ['POST_CREATE', 'MEDIA_UPLOAD'],
        userCount: 45,
    },
    {
        id: '4',
        name: 'Guest Contributor',
        description: 'Submit draft content for review. No direct publishing rights allowed.',
        type: 'Custom',
        slug: 'external_node',
        permissions: ['DRAFT_ONLY'],
        userCount: 96,
    },
];

const RoleManagementPage: React.FC = () => {
    return (
        <AdminLayout noPadding>
            <div className="flex flex-col min-h-full">
                <header className="p-8 pb-4">
                    <div className="flex flex-wrap justify-between items-end gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">Role Management</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">Configure granular access controls and define system-wide operational capabilities for blog contributors and staff.</p>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/admin/roles/create" className="flex items-center gap-2 px-5 py-2.5 bg-[#136986] text-white text-sm font-bold rounded-lg shadow-sm hover:brightness-110 transition-all">
                                <span className="material-symbols-outlined !text-[18px]">add</span>
                                <span>Create Role</span>
                            </Link>
                        </div>
                    </div>
                </header>

                <RoleStats
                    totalRoles={8}
                    activePermissions={42}
                    assignedUsers={156}
                />

                <RoleFilter />

                <RoleTable roles={MOCK_ROLES} />
            </div>

            {/* Notification Toast (Static for now as per design) */}
            <div className="fixed bottom-6 right-6 flex items-center gap-4 bg-[#0e171b] text-white px-5 py-3 rounded-xl shadow-2xl">
                <div className="bg-emerald-500 p-1 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined !text-[16px] text-white">check</span>
                </div>
                <div className="flex flex-col">
                    <p className="text-xs font-bold">Permissions Synced</p>
                    <p className="text-[10px] text-slate-400">Database updated successfully</p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default RoleManagementPage;
