import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePostsByCategory } from '@/features/Blog/hooks/usePosts';

const CategoryPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: postsData, isLoading, error } = usePostsByCategory(slug || '');

    const posts = postsData?.data || [];
    const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Category';

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#0d141b] dark:text-white font-display flex flex-col min-h-screen overflow-x-hidden">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2632] border-b border-[#e7edf3] dark:border-[#2a3b4d]">
                <div className="px-4 lg:px-10 py-3 mx-auto max-w-[1440px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Link to="/" className="flex items-center gap-4 text-[#0d141b] dark:text-white">
                                <div className="size-8 text-primary">
                                    <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold leading-tight tracking-tight">BlogSpace</h2>
                            </Link>
                            <nav className="hidden md:flex items-center gap-6">
                                <Link className="text-sm font-medium hover:text-primary transition-colors" to="/">Home</Link>
                                <Link className="text-sm font-medium hover:text-primary transition-colors text-primary" to={`/category/${slug}`}>Categories</Link>
                                <a className="text-sm font-medium hover:text-primary transition-colors" href="#">About</a>
                                <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Contact</a>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4 lg:gap-8">
                            <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-[#e7edf3] dark:border-[#2a3b4d] overflow-hidden">
                                    <div className="text-[#4c739a] flex bg-white dark:bg-[#1a2632] items-center justify-center pl-3">
                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                    </div>
                                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#0d141b] dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-[#1a2632] h-full placeholder:text-[#4c739a] px-3 text-sm" placeholder="Search articles..." />
                                </div>
                            </label>
                            <button className="hidden sm:flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold shadow-sm">
                                <span>Subscribe</span>
                            </button>
                            <button className="md:hidden p-2 text-[#0d141b] dark:text-white">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-grow">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 text-sm text-[#4c739a] mb-6">
                        <Link className="hover:text-primary transition-colors" to="/">Home</Link>
                        <span>/</span>
                        <Link className="hover:text-primary transition-colors" to="/">Blog</Link>
                        <span>/</span>
                        <span className="text-[#0d141b] dark:text-white font-medium uppercase">{categoryName}</span>
                    </div>
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-[#e7edf3] dark:border-[#2a3b4d] pb-8">
                        <div className="flex flex-col gap-3 max-w-2xl">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0d141b] dark:text-white uppercase">{categoryName}</h1>
                            <p className="text-lg text-[#4c739a] dark:text-gray-400">
                                {isLoading ? 'Loading articles...' : `Showing ${posts.length} article${posts.length !== 1 ? 's' : ''}`}
                            </p>
                        </div>
                    </div>
                    {/* Main Content Layout */}
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left Column: Articles Grid */}
                        <div className="flex-1">
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
                                    {/* Article Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                        {posts.map((post) => {
                                            const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            });
                                            const imageUrl = post.image_url || `https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop`;

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
                                                        </div>
                                                        <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2 leading-snug group-hover:text-primary transition-colors">
                                                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                                        </h3>
                                                        <p className="text-[#4c739a] dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                                                            {post.content_snippet}
                                                        </p>
                                                        <div className="pt-4 mt-auto border-t border-[#e7edf3] dark:border-[#2a3b4d] flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
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
                        </aside>
                    </div>
                </div>
            </main>
            {/* Footer */}
            <footer className="bg-white dark:bg-[#1a2632] border-t border-[#e7edf3] dark:border-[#2a3b4d] mt-12 py-10 px-4 md:px-8">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-[#0d141b] dark:text-white">
                        <div className="size-6 text-primary">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
                            </svg>
                        </div>
                        <span className="font-bold text-lg">BlogSpace</span>
                    </div>
                    <p className="text-sm text-[#4c739a]">© 2024 BlogSpace Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="text-[#4c739a] hover:text-primary transition-colors" href="#">
                            <span className="sr-only">Twitter</span>
                            <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                        </a>
                        <a className="text-[#4c739a] hover:text-primary transition-colors" href="#">
                            <span className="sr-only">GitHub</span>
                            <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CategoryPage;
