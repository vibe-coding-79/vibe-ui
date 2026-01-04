import React from 'react';
import { MdEmail, MdTrendingUp } from 'react-icons/md';

const trendingPosts = [
    { id: '01', title: 'The Hidden Costs of Cloud Computing', info: 'Tech • 4 min read' },
    { id: '02', title: 'How to Build a Design System from Scratch', info: 'Design • 8 min read' },
    { id: '03', title: 'Meditation for Busy Professionals', info: 'Lifestyle • 5 min read' },
    { id: '04', title: '5 Books Every Entrepreneur Should Read', info: 'Business • 6 min read' },
];

const tags = ['Javascript', 'UXDesign', 'AI', 'Startups', 'MentalHealth', 'RemoteWork'];

const Sidebar: React.FC = () => {
    return (
        <aside className="w-full lg:w-1/3 flex flex-col gap-8 shrink-0">
            {/* Newsletter Widget */}
            <div className="bg-white dark:bg-[#1a2634] p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3 mb-4 text-[#0d141b] dark:text-white">
                    <MdEmail className="text-primary" size={24} />
                    <h3 className="text-lg font-bold">Newsletter</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                    Get the latest posts delivered right to your inbox. Weekly digest. No spam.
                </p>
                <div className="flex flex-col gap-3">
                    <input
                        className="w-full px-4 py-2.5 rounded-lg bg-[#f6f7f8] dark:bg-slate-900 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
                        placeholder="Your email address"
                        type="email"
                    />
                    <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg transition-colors text-sm">
                        Subscribe
                    </button>
                </div>
            </div>

            {/* Trending Posts */}
            <div className="bg-white dark:bg-[#1a2634] p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3 mb-6 text-[#0d141b] dark:text-white">
                    <MdTrendingUp className="text-primary" size={24} />
                    <h3 className="text-lg font-bold">Trending Now</h3>
                </div>
                <div className="flex flex-col gap-5">
                    {trendingPosts.map((post, index) => (
                        <React.Fragment key={post.id}>
                            <a className="group flex gap-4 items-start" href="#">
                                <span className="text-3xl font-black text-slate-200 dark:text-slate-700 leading-none group-hover:text-primary transition-colors">{post.id}</span>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
                                    <span className="text-xs text-slate-500 mt-1 block">{post.info}</span>
                                </div>
                            </a>
                            {index < trendingPosts.length - 1 && <div className="h-px bg-slate-100 dark:bg-slate-700 w-full"></div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Tags Cloud */}
            <div className="bg-transparent p-4 rounded-xl">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <a
                            key={tag}
                            className="px-3 py-1.5 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs font-medium border border-slate-200 dark:border-slate-600 hover:border-primary hover:text-primary dark:hover:text-primary transition-colors"
                            href="#"
                        >
                            #{tag}
                        </a>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
