import React from 'react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Technology', 'Design', 'Culture', 'Business'];

const CategoryChips: React.FC = () => {
    return (
        <div className="flex gap-3 pb-6 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
                <Link
                    key={category}
                    to={category === 'All' ? '/' : `/category/${category.toLowerCase()}`}
                    className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-transform hover:scale-105 active:scale-95 ${category === 'All'
                        ? 'bg-[#0d141b] dark:bg-white text-white dark:text-[#0d141b]'
                        : 'bg-white dark:bg-slate-700 border border-[#e7edf3] dark:border-slate-600 text-[#0d141b] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors'
                        }`}
                >
                    <p className="text-sm font-medium leading-normal">{category}</p>
                </Link>
            ))}
        </div>
    );
};

export default CategoryChips;
