import React from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { stripHtml } from '@/utils/text';

const ArticleGrid: React.FC = () => {
    const { data: postsData, isLoading, error } = usePosts();

    if (isLoading) {
        return (
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse hidden sm:block"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col gap-3 animate-pulse">
                            <div className="w-full aspect-[16/10] bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                            <div className="flex flex-col gap-2">
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
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-slate-500 dark:text-slate-400 font-medium">Failed to load articles. Please try again later.</p>
            </div>
        );
    }

    const posts = postsData?.data || [];

    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-slate-500 dark:text-slate-400 font-medium">No articles found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#0d141b] dark:text-white tracking-tight text-2xl font-bold leading-tight">Recent Articles</h2>
                <Link className="text-sm font-medium text-primary hover:text-blue-600 hidden sm:block" to="/posts">View all posts</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                {posts.map((post) => {
                    const dateToFormat = post.published_at || post.created_at;
                    const formattedDate = new Date(dateToFormat).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    });

                    const imageUrl = post.thumbnail || post.image_url || `https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop`;

                    return (
                        <Link key={post.id} to={`/post/${post.slug}`} className="flex flex-col gap-3 group">
                            <article className="flex flex-col gap-3">
                                <div
                                    className="w-full bg-center bg-no-repeat aspect-[16/10] bg-cover rounded-lg overflow-hidden shadow-sm transition-all duration-300 group-hover:translate-y-[-4px] group-hover:shadow-md"
                                    style={{ backgroundImage: `url("${imageUrl}")` }}
                                ></div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-primary text-xs font-bold uppercase">{post.category_name || 'General'}</span>
                                        <span className="text-slate-400 text-xs">•</span>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs">{formattedDate}</span>
                                    </div>
                                    <h3 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-[#4c739a] dark:text-slate-400 text-sm font-normal leading-relaxed line-clamp-2">
                                        {stripHtml(post.content_snippet)}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    );
                })}
            </div>
            {posts.length >= 6 && (
                <div className="mt-12 flex justify-center">
                    <button className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white font-semibold py-2 px-6 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                        Load More Articles
                    </button>
                </div>
            )}
        </div>
    );
};

export default ArticleGrid;
