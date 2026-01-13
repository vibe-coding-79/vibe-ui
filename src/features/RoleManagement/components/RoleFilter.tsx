import React from 'react';

const RoleFilter: React.FC = () => {
    return (
        <section className="px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 flex-1 min-w-[300px]">
                    <div className="relative w-full max-w-md">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-[20px]">search</span>
                        <input
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                            placeholder="Search roles by name or description..."
                            type="text"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-sm font-semibold transition-all">
                        <span className="material-symbols-outlined !text-[18px]">filter_list</span>
                        <span>Filter</span>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined">download</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RoleFilter;
