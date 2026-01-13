import React from 'react';
import type { Role } from '../types';

interface RoleTableProps {
    roles: Role[];
}

const RoleTable: React.FC<RoleTableProps> = ({ roles }) => {
    return (
        <section className="px-8 py-4 mb-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest w-[25%]">Role Identity</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest w-[30%]">Access Scope</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest w-[25%]">Key Capabilities</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest w-[10%] text-center">Users</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest w-[10%] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {roles.map((role) => (
                            <tr key={role.id} className="role-table-row hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            {role.name}
                                            {role.type === 'System' && (
                                                <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-100 dark:bg-slate-700 text-slate-500 uppercase font-black">System</span>
                                            )}
                                        </span>
                                        <span className="text-xs text-slate-500 mt-0.5 tracking-tight">{role.slug}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{role.description}</p>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-wrap gap-1.5">
                                        {role.permissions.map((perm, index) => (
                                            <span key={index} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded">
                                                {perm}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{role.userCount}</span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="action-buttons flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-primary/10 text-slate-400 hover:text-primary rounded-lg">
                                            <span className="material-symbols-outlined !text-[18px]">edit</span>
                                        </button>
                                        <button className={`p-2 rounded-lg ${role.type === 'System' ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-red-50 text-slate-400 hover:text-red-500'}`}>
                                            <span className="material-symbols-outlined !text-[18px]">{role.type === 'System' ? 'lock' : 'delete'}</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium tracking-tight">Showing <span className="text-slate-900 dark:text-white font-bold">{roles.length}</span> of <span className="text-slate-900 dark:text-white font-bold">8</span> roles</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
                        <button className="px-4 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoleTable;
