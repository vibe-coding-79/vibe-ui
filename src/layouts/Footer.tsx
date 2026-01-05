import React from 'react';
import { Link } from 'react-router-dom';
import { MdPublic, MdAlternateEmail, MdRssFeed } from 'react-icons/md';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-[#1a2634] border-t border-slate-200 dark:border-slate-700 mt-12 py-12">
            <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4 text-[#0d141b] dark:text-white">
                            <div className="size-6 text-primary">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-base font-bold">Blog Brand</h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            Insights and stories for the curious mind. Covering tech, design, culture, and business.
                        </p>
                        <div className="flex gap-4">
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><MdPublic size={20} /></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><MdAlternateEmail size={20} /></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><MdRssFeed size={20} /></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Company</h4>
                        <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Partners</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Categories</h4>
                        <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Technology</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Design</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Lifestyle</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Business</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Support</h4>
                        <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                            <li><Link className="hover:text-primary transition-colors" to="/admin/login">Admin Login</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400">© 2024 Blog Brand Inc. All rights reserved.</p>
                    <p className="text-xs text-slate-400">Designed with modern UI principles.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
