import React, { useState } from 'react';
import { useAuth } from '@/features/Auth/context/AuthContext';
import { Link } from 'react-router-dom';

interface AdminLayoutProps {
    children: React.ReactNode;
    noPadding?: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, noPadding = false }) => {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden">
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:flex ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-800">
                    <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
                        <span className="material-symbols-outlined text-3xl">space_dashboard</span>
                        <span>BlogAdmin</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Overview</div>
                    <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary dark:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <div className="px-3 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Content</div>
                    <Link
                        to="/admin/posts"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                    >
                        <span className="material-symbols-outlined group-hover:text-primary">article</span>
                        <span className="text-sm font-medium group-hover:text-primary">Posts</span>
                    </Link>
                    <a
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                        href="#"
                    >
                        <span className="material-symbols-outlined group-hover:text-primary">category</span>
                        <span className="text-sm font-medium group-hover:text-primary">Categories</span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                        href="#"
                    >
                        <span className="material-symbols-outlined group-hover:text-primary">image</span>
                        <span className="text-sm font-medium group-hover:text-primary">Media</span>
                    </a>
                    <div className="px-3 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Management</div>
                    <a
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                        href="#"
                    >
                        <span className="material-symbols-outlined group-hover:text-primary">group</span>
                        <span className="text-sm font-medium group-hover:text-primary">Users</span>
                    </a>
                    <Link
                        to="/admin/roles"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                    >
                        <span className="material-symbols-outlined group-hover:text-primary">verified_user</span>
                        <span className="text-sm font-medium group-hover:text-primary">Roles</span>
                    </Link>
                    <a
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                        href="#"
                    >
                        <span className="material-symbols-outlined group-hover:text-primary">comment</span>
                        <span className="text-sm font-medium group-hover:text-primary">Comments</span>
                        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                    </a>
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <a
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                        href="#"
                    >
                        <span className="material-symbols-outlined group-hover:text-primary">settings</span>
                        <span className="text-sm font-medium group-hover:text-primary">Settings</span>
                    </a>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-1"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span className="text-sm font-medium">Log Out</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-10">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button
                            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <span className="font-bold text-lg text-slate-900 dark:text-white">BlogAdmin</span>
                    </div>
                    <div className="hidden md:flex flex-1 max-w-xl mx-4">
                        <div className="relative w-full group">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors material-symbols-outlined">
                                search
                            </span>
                            <input
                                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-400 dark:text-white outline-none"
                                placeholder="Search posts, users, comments..."
                                type="text"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <kbd className="hidden sm:inline-block px-2 py-0.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-xs text-slate-400 font-sans">
                                    ⌘ K
                                </kbd>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                        <button className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                        <button className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name || 'Jane Admin'}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{user?.title || 'Editor in Chief'}</p>
                            </div>
                            <img
                                className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                                src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAMovp_8kO7HK54BhhbkySN1_-bAQTaDVuzzMvjGM8U83ndS_0RQF4QWwKKR6RfySWmxQGXFqsYVePfmleXNS4Gn29R_Rcdn2cY8Pu_6UfP-Ia23BSYw5H-gEA8LQG2WH11wkSk-ju9DSinwMIptI9lpNPnKmV_Ts34T60IMxtrMRwCmjyg9lrxPTZWgdnKcZNQYjv8vcaXsVOhpyWEjTa6pi11KY7ZZzXQTL_o5MTsWcXaI_aTikWBlbpH-ZG3wYeDW7TWx_fqUA"}
                                alt="User avatar"
                            />
                        </button>
                    </div>
                </header>

                <main className={`flex-1 overflow-y-auto bg-background-light dark:bg-background-dark ${noPadding ? '' : 'p-4 md:p-8'}`}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
