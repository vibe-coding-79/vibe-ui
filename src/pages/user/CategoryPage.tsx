import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePostsByCategory } from '@/features/Blog/hooks/usePosts';
import MainLayout from '@/layouts/MainLayout';

const CategoryPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: postsData, isLoading, error } = usePostsByCategory(slug || '');
    const [activeFilter, setActiveFilter] = useState('All');
    const [sortBy, setSortBy] = useState('Newest First');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const posts = postsData?.data || [];
    const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Category';

    // Category descriptions
    const categoryDescriptions: Record<string, string> = {
        'Engineering': 'Deep dives into software architecture, coding best practices, and system design for the modern web.',
        'Technology': 'Latest trends and innovations in the tech world.',
        'Design': 'UI/UX design principles, tools, and creative inspiration.',
        'Business': 'Strategies, insights, and trends in modern business.',
    };

    const description = categoryDescriptions[categoryName] || 'Explore our curated collection of articles.';

    return (
        <MainLayout>
            <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap gap-2 text-sm text-[#4c739a] mb-6">
                    <Link className="hover:text-primary transition-colors" to="/">Home</Link>
                    <span>/</span>
                    <Link className="hover:text-primary transition-colors" to="/">Blog</Link>
                    <span>/</span>
                    <span className="text-[#0d141b] dark:text-white font-medium">{categoryName}</span>
                </div>
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-[#e7edf3] dark:border-[#2a3b4d] pb-8">
                    <div className="flex flex-col gap-3 max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0d141b] dark:text-white">{categoryName}</h1>
                        <p className="text-lg text-[#4c739a] dark:text-gray-400">{description}</p>
                    </div>
                    {/* Filter Chips */}
                    <div className="flex gap-2 flex-wrap">
                        {['All', 'Backend', 'Frontend', 'DevOps'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`flex h-9 items-center justify-center gap-x-2 rounded-full px-4 transition-all ${activeFilter === filter
                                    ? 'bg-[#e7edf3] dark:bg-[#2a3b4d] hover:bg-primary hover:text-white'
                                    : 'bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-[#2a3b4d] hover:border-primary hover:text-primary'
                                    }`}
                            >
                                <span className="text-sm font-medium">{filter}</span>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Articles Grid */}
                    <div className="flex-1">
                        {/* Sorting Toolbar */}
                        <div className="flex justify-between items-center mb-8">
                            <p className="text-[#4c739a] dark:text-gray-400 text-sm font-medium">
                                {isLoading ? 'Loading...' : `Showing ${posts.length} articles`}
                            </p>
                            <div className="flex items-center gap-3">
                                <span className="text-[#0d141b] dark:text-white text-sm font-medium hidden sm:inline">Sort by:</span>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-white dark:bg-[#1a2632] border border-[#cfdbe7] dark:border-[#2a3b4d] text-[#0d141b] dark:text-white text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-primary focus:border-primary cursor-pointer"
                                    >
                                        <option>Newest First</option>
                                        <option>Oldest First</option>
                                        <option>Most Popular</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#4c739a] text-[18px]">expand_more</span>
                                </div>
                                <div className="hidden sm:flex border border-[#cfdbe7] dark:border-[#2a3b4d] rounded-lg overflow-hidden ml-2">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 ${viewMode === 'grid' ? 'bg-[#e7edf3] dark:bg-[#2a3b4d] text-primary' : 'bg-white dark:bg-[#1a2632] text-[#4c739a] hover:bg-gray-50 dark:hover:bg-[#202e3b]'}`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 ${viewMode === 'list' ? 'bg-[#e7edf3] dark:bg-[#2a3b4d] text-primary' : 'bg-white dark:bg-[#1a2632] text-[#4c739a] hover:bg-gray-50 dark:hover:bg-[#202e3b]'}`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">view_list</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {isLoading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex flex-col gap-3 animate-pulse">
                                        <div className="w-full h-56 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                                        <div className="flex flex-col gap-2 p-5">
                                            <div className="flex gap-2">
                                                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                                <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                            </div>
                                            <div className="h-6 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                                            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mt-1"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {error && (
                            <div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                                <p className="text-slate-500 dark:text-slate-400 font-medium">Failed to load articles. Please try again later.</p>
                            </div>
                        )}

                        {!isLoading && !error && posts.length === 0 && (
                            <div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                                <p className="text-slate-500 dark:text-slate-400 font-medium">No articles found in this category.</p>
                            </div>
                        )}

                        {!isLoading && !error && posts.length > 0 && (
                            <>
                                {/* Featured Post (First Post) */}
                                {posts[0] && (
                                    <article className="group mb-12 bg-white dark:bg-[#1a2632] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[#e7edf3] dark:border-[#2a3b4d] grid md:grid-cols-2">
                                        <div className="relative h-64 md:h-auto overflow-hidden">
                                            <img
                                                alt={posts[0].title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                src={posts[0].image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop'}
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Featured</span>
                                            </div>
                                        </div>
                                        <div className="p-6 md:p-8 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 text-xs text-[#4c739a] font-medium mb-3">
                                                <span>{new Date(posts[0].published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                <span className="w-1 h-1 rounded-full bg-[#cfdbe7]"></span>
                                                <span>{posts[0].author_name || 'Anonymous'}</span>
                                            </div>
                                            <h2 className="text-2xl font-bold text-[#0d141b] dark:text-white mb-3 leading-tight group-hover:text-primary transition-colors">
                                                <Link to={`/post/${posts[0].slug}`}>{posts[0].title}</Link>
                                            </h2>
                                            <p className="text-[#4c739a] dark:text-gray-400 mb-6 line-clamp-3">
                                                {posts[0].content_snippet}
                                            </p>
                                            <Link to={`/post/${posts[0].slug}`} className="inline-flex items-center text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4">
                                                Read Article
                                                <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
                                            </Link>
                                        </div>
                                    </article>
                                )}

                                {/* Article Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                    {posts.slice(1).map((post) => {
                                        const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        });
                                        const imageUrl = post.image_url || `https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop`;
                                        // Calculate read time (rough estimate: 200 words per minute)
                                        const wordCount = post.content_snippet?.split(' ').length || 0;
                                        const readTime = Math.max(1, Math.ceil(wordCount / 200 * 5)); // Multiply by 5 for full article estimate

                                        return (
                                            <article key={post.id} className="group bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[#e7edf3] dark:border-[#2a3b4d] flex flex-col h-full">
                                                <div className="relative h-56 overflow-hidden">
                                                    <img
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        src={imageUrl}
                                                    />
                                                    <div className="absolute top-3 left-3">
                                                        <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-[#0d141b] dark:text-white text-xs font-bold px-2 py-1 rounded">
                                                            {post.category_name || categoryName}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-5 flex flex-col flex-1">
                                                    <div className="flex items-center gap-2 text-xs text-[#4c739a] mb-2">
                                                        <span>{formattedDate}</span>
                                                        <span>•</span>
                                                        <span>{readTime} min read</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2 leading-snug group-hover:text-primary transition-colors">
                                                        <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                                    </h3>
                                                    <p className="text-[#4c739a] dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                                                        {post.content_snippet}
                                                    </p>
                                                    <div className="pt-4 mt-auto border-t border-[#e7edf3] dark:border-[#2a3b4d] flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                className="w-6 h-6 rounded-full object-cover"
                                                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author_name || 'Anonymous')}&background=137fec&color=fff`}
                                                                alt={post.author_name || 'Anonymous'}
                                                            />
                                                            <span className="text-xs font-medium text-[#0d141b] dark:text-white">
                                                                {post.author_name || 'Anonymous'}
                                                            </span>
                                                        </div>
                                                        <Link to={`/post/${post.slug}`} className="text-primary hover:text-primary/80">
                                                            <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>

                                {/* Pagination */}
                                <div className="flex items-center justify-center gap-2">
                                    <button className="flex items-center justify-center w-10 h-10 rounded-lg text-[#4c739a] hover:bg-[#e7edf3] dark:hover:bg-[#2a3b4d] transition-colors disabled:opacity-50" disabled>
                                        <span className="material-symbols-outlined">chevron_left</span>
                                    </button>
                                    <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white font-medium shadow-sm">1</button>
                                    <button className="flex items-center justify-center w-10 h-10 rounded-lg text-[#0d141b] dark:text-white hover:bg-[#e7edf3] dark:hover:bg-[#2a3b4d] transition-colors font-medium">2</button>
                                    <button className="flex items-center justify-center w-10 h-10 rounded-lg text-[#0d141b] dark:text-white hover:bg-[#e7edf3] dark:hover:bg-[#2a3b4d] transition-colors font-medium">3</button>
                                    <span className="text-[#4c739a]">...</span>
                                    <button className="flex items-center justify-center w-10 h-10 rounded-lg text-[#0d141b] dark:text-white hover:bg-[#e7edf3] dark:hover:bg-[#2a3b4d] transition-colors font-medium">8</button>
                                    <button className="flex items-center justify-center w-10 h-10 rounded-lg text-[#0d141b] dark:text-white hover:bg-[#e7edf3] dark:hover:bg-[#2a3b4d] transition-colors">
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    {/* Right Sidebar */}
                    <aside className="w-full lg:w-[320px] shrink-0 flex flex-col gap-8">
                        {/* Newsletter Widget */}
                        <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl border border-[#e7edf3] dark:border-[#2a3b4d]">
                            <h3 className="text-lg font-bold text-[#0d141b] dark:text-white mb-4">Newsletter</h3>
                            <p className="text-sm text-[#4c739a] mb-4">Get the latest engineering insights delivered straight to your inbox weekly.</p>
                            <form className="flex flex-col gap-3">
                                <input className="w-full h-10 rounded-lg border border-[#e7edf3] dark:border-[#2a3b4d] bg-background-light dark:bg-background-dark px-3 text-sm focus:ring-primary focus:border-primary" placeholder="Your email address" type="email" />
                                <button className="w-full h-10 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors" type="submit">Subscribe</button>
                            </form>
                        </div>

                        {/* Trending Topics Widget */}
                        <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl border border-[#e7edf3] dark:border-[#2a3b4d]">
                            <h3 className="text-lg font-bold text-[#0d141b] dark:text-white mb-4">Trending Topics</h3>
                            <div className="flex flex-wrap gap-2">
                                {['#React', '#SystemDesign', '#Rust', '#AWS', '#Kubernetes', '#AI'].map((tag) => (
                                    <a
                                        key={tag}
                                        className="px-3 py-1.5 bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-white text-xs font-medium rounded-lg hover:bg-[#e7edf3] dark:hover:bg-[#202e3b] transition-colors cursor-pointer"
                                        href="#"
                                    >
                                        {tag}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Top Contributors Widget */}
                        <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl border border-[#e7edf3] dark:border-[#2a3b4d]">
                            <h3 className="text-lg font-bold text-[#0d141b] dark:text-white mb-4">Top Contributors</h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    { name: 'John Smith', role: 'Principal Engineer' },
                                    { name: 'Alice Chen', role: 'DevOps Lead' },
                                    { name: 'Robert Fox', role: 'Database Specialist' }
                                ].map((contributor) => (
                                    <a key={contributor.name} className="flex items-center gap-3 group cursor-pointer" href="#">
                                        <img
                                            className="w-10 h-10 rounded-full object-cover"
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contributor.name)}&background=137fec&color=fff`}
                                            alt={contributor.name}
                                        />
                                        <div>
                                            <p className="text-sm font-bold text-[#0d141b] dark:text-white group-hover:text-primary transition-colors">{contributor.name}</p>
                                            <p className="text-xs text-[#4c739a]">{contributor.role}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </MainLayout>
    );
};

export default CategoryPage;

