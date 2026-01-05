import React from 'react';
import { useAuth } from '@/features/Auth/context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full">
                <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-800">
                    <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
                        <span className="material-symbols-outlined text-3xl">space_dashboard</span>
                        <span>BlogAdmin</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Overview</div>
                    <a
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary dark:text-primary transition-colors"
                        href="#"
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </a>
                    <div className="px-3 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Content</div>
                    <a
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                        href="#"
                    >
                        <span className="material-symbols-outlined group-hover:text-primary">article</span>
                        <span className="text-sm font-medium group-hover:text-primary">Posts</span>
                    </a>
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

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Top Navigation */}
                <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-10">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <span className="font-bold text-lg text-slate-900 dark:text-white">BlogAdmin</span>
                    </div>
                    {/* Global Search */}
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
                    {/* Right Actions */}
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

                {/* Main Scrollable Area */}
                <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Page Heading */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Posts</h1>
                                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and organize your blog content</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="hidden sm:flex items-center justify-center h-10 px-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-[20px] mr-2">download</span>
                                    Export
                                </button>
                                <button className="flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/30">
                                    <span className="material-symbols-outlined text-[20px] mr-2">add</span>
                                    Add New Post
                                </button>
                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard title="Total Posts" value="1,248" trend="+12%" icon="library_books" color="blue" />
                            <StatCard title="Published" value="1,180" progress={92} icon="check_circle" color="emerald" />
                            <StatCard title="Drafts" value="42" subtitle="Needs review" icon="edit_note" color="amber" />
                            <StatCard title="Total Views" value="48.2k" trend="+24%" icon="visibility" color="purple" />
                        </div>

                        {/* Filters and Search Bar */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="relative w-full md:w-96">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">
                                        search
                                    </span>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all dark:text-white outline-none"
                                        placeholder="Search by title, author, or tag..."
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <SelectFilter options={['All Categories', 'Technology', 'Design', 'Lifestyle']} />
                                    <SelectFilter options={['Status: All', 'Published', 'Draft', 'Archived']} />
                                    <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">filter_alt_off</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <th className="p-4 w-10">
                                                <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                            </th>
                                            <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Post
                                            </th>
                                            <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Author
                                            </th>
                                            <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        <PostRow
                                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAC7pzgNrxDWnQWevmtfPWcAIgPjr2iC5yh19W1Sm_ueiuL_0Nlv-V7Bw0-rvWYUu-mze4D0LmzIZw8C9bVs70TMDzOp4GtriTRKOh-fXBnbeChcD5UxxYfF-b1_yuLEk7HwDoeD_l57unF4qCJypzDZZhddDwy_109OpUnS1U2DFEtDhWADRQkOc9grw477atIHR1z0MmwEfJ8FFbH3rj8lrBuJIO6Um9mtZE3XGl39xFjOGyZckCnWRBqXHpaerOR5I7kIaF4lQ"
                                            title="10 Tips for Modern Web Design in 2024"
                                            excerpt="Exploring the latest trends including glassmorphism, huge type..."
                                            author="Sarah J."
                                            authorImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBBbM0Hv1o1xJJjicE4s-vl3wNW5Wvz2m8S0V5dFF0nNe9pX2zUKvokfgVD_-MhSyBasGB8ETASDjzfyGPrxkBHjYTZDYWMQxF6Yq0nJ_sxbeJ9tBpGFed5c2IBna6vtA5oykwx9IXmr-eepL4srsjB3dO0Hu_PToXW8MuKl0y-dVn8yDlMPXibjH8wY_7JTUJJCUyQgvPV_TBFfpccn3_1crzhAa36phVm7Y_1e79mfBxVRHJNLW4oOrX2ElEH32eRJKp9wCxepg"
                                            category="Design"
                                            date="Oct 24, 2023"
                                            status="Published"
                                        />
                                        <PostRow
                                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDSn3Xs0pF6kvc-C_XT6mwTNk8x18IG5TWmkBGWhzkiwnDK__UEcoXFAl50I0a9T6UqdYl6Jux-a9BLVlRdsu2DGQeP2kxSonIBMd4ldwxkio9HpL3cVmeZnxl2-ZCgzVO-5bKPwXZvTceMc3acv9pbBO1uMPlum_KD8v8UxxSv6if8h4cEKDBqEX1V7xvIlOVNS8-CsKYI3N1E0C1qYYWfqeSiEM2RACqit40U1Db_rHvy0104Z3uGDXgAzVeURb69rgIHb5cUXw"
                                            title="Understanding React Server Components"
                                            excerpt="A deep dive into RSC and how it changes the landscape of frontend dev..."
                                            author="Mike R."
                                            authorImage="https://lh3.googleusercontent.com/aida-public/AB6AXuB98GDernvbhm8uU9CGUaDen8hi0czTPldibyi4JO9ixZppEfLBELkTLw3M8dFutoC5wSoNG8kIsngyNAp2L2NiLiUGulO3hs0zo_6KqNtIbbpwQRjALAkuoRuPxTA0CzZkCuodN_KpIT3SoS46sovjq9fqAztVyTRl7A_ub2ZwGs-0cYz7ROh3JEbc6q5LX98gPay_pzxc6EduySYozqt8HQmimqjjTkbMWjh7Cj00SDSdpVpeoC2nDQRlZXmBSeKDnbOkJkbi3A"
                                            category="Development"
                                            date="Oct 22, 2023"
                                            status="Draft"
                                        />
                                        <PostRow
                                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBCz0ykBCuWYiPtrMXqulHZuc0uTY6L-70sKjt_ym3nkev8PZHzyl8pnZ1bqrBkEJvmqzXH4rYo-cDyX0UcMo0zX6ZSZjRdRRyqpVuFTRQQ-1ecRasAMFsokcxqMYoYucdD04pWX9FoT8IzKLJeXv_IpI-oehWRAXN8_zON7d3LLg2lrYe1TVpQmNZq4-dlnJ8ZyYMTB_evRM0hamzRy2hZVAFKGHzZkpuMUZHkSVSyzf4GyUOzAoj6R9u6GtrqkGSKnR796LdiKA"
                                            title="Building a Strong Remote Culture"
                                            excerpt="Tips and tricks for keeping your remote team engaged and productive..."
                                            author="Elena K."
                                            authorImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBXfMF_TgKREPT9WFBcN6TCKFAzlwa4s5rLLBF6tXzBgOJ5B_B_A8d9gaiTQmmU1D5YlfcO7J__Du8VRw6Wy793DIuy_5Dpc-wQ_odeSLcPh4VrutpwhxyWroz5wtlYe8uhDz5KrH6ONmHFIibZD1XrmoVFx3G2EnjwFuQY6VoO6PEsbu9D_Km5hddq4e7aAM4VWumz9vdK4k4Ph6N8IeNYUrzvdUi0Vkabo8Ctj6fKjfKzKjQSTlKPy9frnzXlaJ3APh7udaaF-A"
                                            category="Lifestyle"
                                            date="Oct 20, 2023"
                                            status="Published"
                                        />
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                    Showing <span className="font-medium text-slate-900 dark:text-white">1</span> to{' '}
                                    <span className="font-medium text-slate-900 dark:text-white">3</span> of{' '}
                                    <span className="font-medium text-slate-900 dark:text-white">1,248</span> results
                                </span>
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-md hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 disabled:opacity-50">
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 text-sm font-medium text-primary bg-white border border-primary rounded-md dark:bg-slate-800 dark:text-primary">
                                        1
                                    </button>
                                    <button className="px-3 py-1 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-md hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <RecentComments />
                            <QuickDraft />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// Sub-components for better organization
const StatCard: React.FC<{
    title: string;
    value: string;
    trend?: string;
    progress?: number;
    subtitle?: string;
    icon: string;
    color: string;
}> = ({ title, value, trend, progress, subtitle, icon, color }) => {
    const colorClasses: Record<string, string> = {
        blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
        emerald: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
        amber: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
        purple: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
                </div>
                <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-xs">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center">
                        <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>
                        {trend}
                    </span>
                    <span className="text-slate-400 ml-2">from last month</span>
                </div>
            )}
            {progress !== undefined && (
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-auto mt-4">
                    <div
                        className={`h-1.5 rounded-full ${color === 'emerald' ? 'bg-emerald-500' : 'bg-primary'}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}
            {subtitle && <div className="mt-4 flex items-center text-xs text-slate-500 dark:text-slate-400">{subtitle}</div>}
        </div>
    );
};

const SelectFilter: React.FC<{ options: string[] }> = ({ options }) => (
    <div className="relative">
        <select className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 pl-3 pr-10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer outline-none">
            {options.map((opt) => (
                <option key={opt}>{opt}</option>
            ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 material-symbols-outlined text-[18px]">
            expand_more
        </span>
    </div>
);

const PostRow: React.FC<{
    image: string;
    title: string;
    excerpt: string;
    author: string;
    authorImage: string;
    category: string;
    date: string;
    status: string;
}> = ({ image, title, excerpt, author, authorImage, category, date, status }) => (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
        <td className="p-4 align-top pt-5">
            <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
        </td>
        <td className="p-4">
            <div className="flex gap-4">
                <div className="w-16 h-12 rounded bg-slate-200 dark:bg-slate-700 shrink-0 overflow-hidden relative">
                    <img className="w-full h-full object-cover" src={image} alt={title} />
                </div>
                <div>
                    <a className="font-medium text-slate-900 dark:text-white hover:text-primary text-sm line-clamp-1" href="#">
                        {title}
                    </a>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 line-clamp-1">{excerpt}</p>
                </div>
            </div>
        </td>
        <td className="p-4 align-top pt-5">
            <div className="flex items-center gap-2">
                <img className="w-6 h-6 rounded-full object-cover" src={authorImage} alt={author} />
                <span className="text-sm text-slate-700 dark:text-slate-200">{author}</span>
            </div>
        </td>
        <td className="p-4 align-top pt-5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                {category}
            </span>
        </td>
        <td className="p-4 align-top pt-5 text-sm text-slate-600 dark:text-slate-400">{date}</td>
        <td className="p-4 align-top pt-5">
            <div className="flex items-center gap-1.5">
                <span
                    className={`w-2 h-2 rounded-full ${status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                ></span>
                <span
                    className={`text-sm font-medium ${status === 'Published' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}
                >
                    {status}
                </span>
            </div>
        </td>
        <td className="p-4 align-top pt-5 text-right">
            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-slate-500 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
            </div>
        </td>
    </tr>
);

const RecentComments = () => (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recent Comments</h3>
        <div className="space-y-4">
            <CommentItem
                author="James Doe"
                initial="J"
                post="10 Tips for Modern..."
                time="2h ago"
                content="Great article! I really loved the section about typography scaling..."
                color="purple"
            />
            <div className="border-t border-slate-100 dark:border-slate-800"></div>
            <CommentItem
                author="Anna Smith"
                initial="A"
                post="Building Strong..."
                time="5h ago"
                content="This was very insightful. Thanks for sharing!"
                color="emerald"
            />
        </div>
    </div>
);

const CommentItem: React.FC<{
    author: string;
    initial: string;
    post: string;
    time: string;
    content: string;
    color: string;
}> = ({ author, initial, post, time, content, color }) => (
    <div className="flex gap-3">
        <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${color === 'purple' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300' : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300'}`}
        >
            {initial}
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {author} <span className="text-slate-400 font-normal ml-1">on {post}</span>
                </p>
                <span className="text-xs text-slate-400">{time}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{content}</p>
            <div className="flex gap-2 mt-2">
                <button className="text-xs font-medium text-primary hover:underline">Approve</button>
                <button className="text-xs font-medium text-red-600 hover:underline">Delete</button>
            </div>
        </div>
    </div>
);

const QuickDraft = () => (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Draft</h3>
        <form>
            <div className="space-y-3">
                <input
                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary dark:text-white outline-none"
                    placeholder="Post Title"
                    type="text"
                />
                <textarea
                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary dark:text-white resize-none outline-none"
                    placeholder="What's on your mind?"
                    rows={3}
                ></textarea>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg dark:text-slate-400 dark:hover:bg-slate-700"
                        type="button"
                    >
                        Clear
                    </button>
                    <button
                        className="px-3 py-1.5 text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 rounded-lg dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                        type="button"
                    >
                        Save Draft
                    </button>
                </div>
            </div>
        </form>
    </div>
);

export default AdminDashboardPage;
