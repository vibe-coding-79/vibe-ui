import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';

const CategoryChips: React.FC = () => {
    const { data: categoriesData, isLoading, error } = useCategories();
    const { slug } = useParams<{ slug?: string }>();

    if (isLoading) {
        return (
            <div className="flex gap-3 pb-6 overflow-x-auto hide-scrollbar animate-pulse">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-9 w-24 bg-slate-200 dark:bg-slate-700 rounded-full shrink-0"></div>
                ))}
            </div>
        );
    }

    if (error) {
        return null;
    }

    const apiCategories = categoriesData?.data || [];
    const categories = [{ id: 'all', name: 'All', slug: '' }, ...apiCategories];

    return (
        <div className="flex gap-3 pb-6 overflow-x-auto hide-scrollbar">
            {categories.map((category) => {
                const isActive = (category.slug === '' && !slug) || slug === category.slug;
                return (
                    <Link
                        key={category.id}
                        to={category.slug === '' ? '/' : `/category/${category.slug}`}
                        className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-transform hover:scale-105 active:scale-95 ${isActive
                            ? 'bg-[#0d141b] dark:bg-white text-white dark:text-[#0d141b]'
                            : 'bg-white dark:bg-slate-700 border border-[#e7edf3] dark:border-slate-600 text-[#0d141b] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors'
                            }`}
                    >
                        <p className="text-sm font-medium leading-normal">{category.name}</p>
                    </Link>
                );
            })}
        </div>
    );
};

export default CategoryChips;
