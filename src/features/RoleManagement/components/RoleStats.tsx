import React from 'react';

interface RoleStatsProps {
    totalRoles: number;
    activePermissions: number;
    assignedUsers: number;
}

const RoleStats: React.FC<RoleStatsProps> = ({ totalRoles, activePermissions, assignedUsers }) => {
    return (
        <section className="px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 p-3 rounded-lg">
                        <span className="material-symbols-outlined">badge</span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Roles</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{totalRoles}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 p-3 rounded-lg">
                        <span className="material-symbols-outlined">rule</span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Permissions</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{activePermissions}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 p-3 rounded-lg">
                        <span className="material-symbols-outlined">groups</span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Users</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{assignedUsers}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoleStats;
