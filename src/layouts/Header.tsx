import React from 'react';
import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#1a2634] border-b border-[#e7edf3] dark:border-slate-700">
            <div className="px-4 md:px-10 lg:px-40 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-8">
                    <Link className="flex items-center gap-4 text-[#0d141b] dark:text-white" to="/">
                        <div className="size-8 text-primary">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">Blog Brand</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 lg:gap-9">
                        <Link className="text-sm font-medium leading-normal hover:text-primary transition-colors text-slate-900 dark:text-slate-100" to="/">Home</Link>
                        <Link className="text-sm font-medium leading-normal hover:text-primary transition-colors text-slate-500 dark:text-slate-400" to="/category/tech">Tech</Link>
                        <Link className="text-sm font-medium leading-normal hover:text-primary transition-colors text-slate-500 dark:text-slate-400" to="/category/lifestyle">Lifestyle</Link>
                        <Link className="text-sm font-medium leading-normal hover:text-primary transition-colors text-slate-500 dark:text-slate-400" to="/category/business">Business</Link>
                    </nav>
                </div>
                <div className="flex flex-1 justify-end items-center gap-4 md:gap-8">
                    <label className="hidden sm:flex flex-col min-w-40 h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-[#e7edf3] dark:bg-slate-700">
                            <div className="text-[#4c739a] dark:text-slate-400 flex items-center justify-center pl-3 pr-1">
                                <MdSearch size={20} />
                            </div>
                            <input
                                className="w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-transparent text-sm text-[#0d141b] dark:text-white focus:outline-0 border-none h-full placeholder:text-[#4c739a] dark:placeholder:text-slate-400 px-2"
                                placeholder="Search articles"
                            />
                        </div>
                    </label>
                    <div className="flex items-center gap-2">
                        <button className="sm:hidden p-2 text-slate-700 dark:text-white">
                            <MdSearch size={24} />
                        </button>
                        <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-blue-600 transition-colors text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
                            <span className="truncate">Subscribe</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
