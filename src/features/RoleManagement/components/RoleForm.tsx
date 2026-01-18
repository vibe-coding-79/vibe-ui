import React, { useState } from 'react';
import type { PermissionGroup } from '../types';

interface RoleFormProps {
    onCancel: () => void;
    onSave: (data: any) => void;
}

const MOCK_PERMISSION_GROUPS: PermissionGroup[] = [
    {
        id: 'posts',
        label: 'Posts Management',
        icon: 'article',
        permissions: [
            { id: 'view_posts', label: 'View Posts', description: 'Read-only access to articles' },
            { id: 'create_posts', label: 'Create Posts', description: 'Draft new blog entries' },
            { id: 'edit_posts', label: 'Edit Any', description: 'Modify content by others' },
            { id: 'publish_posts', label: 'Publish Posts', description: 'Make content public' },
        ]
    },
    {
        id: 'users',
        label: 'Users & Profiles',
        icon: 'person_search',
        permissions: [
            { id: 'view_users', label: 'View Directory', description: 'List and search users' },
            { id: 'manage_roles', label: 'Manage Roles', description: 'Assign roles to users' },
            { id: 'suspend_users', label: 'Suspend Users', description: 'Block account access' },
        ]
    },
    {
        id: 'comments',
        label: 'Comment Moderation',
        icon: 'forum',
        permissions: [
            { id: 'approve_comments', label: 'Approve', description: 'Validate pending comments' },
            { id: 'delete_comments', label: 'Delete', description: 'Remove inappropriate content' },
            { id: 'ban_users', label: 'Ban Users', description: 'Restrict commenting ability' },
        ]
    }
];

const RoleForm: React.FC<RoleFormProps> = ({ onCancel, onSave }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [permissions, setPermissions] = useState<string[]>([]);

    const togglePermission = (id: string) => {
        setPermissions(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        const allPermissionIds = MOCK_PERMISSION_GROUPS.flatMap(g => g.permissions.map(p => p.id));
        setPermissions(allPermissionIds);
    };

    const handleDeselectAll = () => {
        setPermissions([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, description, permissions });
    };

    return (
        <form className="px-8 py-4 space-y-8 pb-20" onSubmit={handleSubmit}>
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">info</span>
                        Role Information
                    </h3>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Role Name</label>
                        <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                            placeholder="e.g. Marketing Manager"
                            type="text"
                        />
                        <p className="text-[11px] text-slate-400">The public display name for this role.</p>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Description</label>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                            placeholder="e.g. Can manage blog posts and view analytics"
                            type="text"
                        />
                        <p className="text-[11px] text-slate-400">Brief summary of the role's purpose.</p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">Select Permissions</h3>
                        <p className="text-sm text-slate-500">Toggle specific capabilities for this role grouped by resource.</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleSelectAll} className="text-xs font-bold text-primary hover:underline" type="button">Select All</button>
                        <span className="text-slate-300">|</span>
                        <button onClick={handleDeselectAll} className="text-xs font-bold text-slate-400 hover:text-slate-600" type="button">Deselect All</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {MOCK_PERMISSION_GROUPS.map(group => (
                        <div key={group.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary !text-[20px]">{group.icon}</span>
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">{group.label}</h4>
                            </div>
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {group.permissions.map(permission => (
                                    <label key={permission.id} className={`flex items-start gap-3 p-4 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all ${permissions.includes(permission.id) ? 'bg-slate-50 border-primary/30' : ''}`}>
                                        <input
                                            type="checkbox"
                                            checked={permissions.includes(permission.id)}
                                            onChange={() => togglePermission(permission.id)}
                                            className="mt-1 rounded border-slate-300 text-primary focus:ring-primary"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{permission.label}</span>
                                            <span className="text-[11px] text-slate-500">{permission.description}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="flex items-center justify-end gap-3 pt-8 border-t border-slate-200 dark:border-slate-800">
                <button
                    onClick={onCancel}
                    className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                    type="button"
                >
                    Discard Changes
                </button>
                <button
                    className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
                    type="submit"
                >
                    Create Role & Assign Permissions
                </button>
            </div>
        </form>
    );
};

export default RoleForm;
