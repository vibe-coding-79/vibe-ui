import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { usePost } from '@/features/Blog/hooks/usePosts';

const PostDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: postData, isLoading, error } = usePost(slug || '');

    const post = postData?.data;

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </MainLayout>
        );
    }

    if (error || !post) {
        return (
            <MainLayout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Post not found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">The article you are looking for does not exist or has been removed.</p>
                </div>
            </MainLayout>
        );
    }

    const {
        title,
        content,
        created_at,
        ai_metadata
    } = post;

    const author = ai_metadata?.author || post.author || 'Unknown Author';
    const tags = ai_metadata?.tags || post.tags || [];
    const publishDate = ai_metadata?.publishDate || created_at;
    const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const isHtml = (text: string) => /<\/?[a-z][\s\S]*>/i.test(text);

    return (
        <MainLayout>
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Article Content (Left Column) */}
                <article className="flex-1 min-w-0 max-w-4xl mx-auto lg:mx-0">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-[#4c739a] dark:text-gray-400 mb-6">
                        <a className="hover:text-primary transition-colors" href="/">Home</a>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                        <a className="hover:text-primary transition-colors" href="#">Blog</a>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                        <span className="font-medium text-[#0d141b] dark:text-gray-200 truncate max-w-[200px]">{title}</span>
                    </nav>

                    {/* Header */}
                    <header className="mb-8">
                        <h1 className="mb-4 text-3xl font-black tracking-tight text-[#0d141b] dark:text-white sm:text-4xl lg:text-5xl leading-tight">
                            {title}
                        </h1>
                        {/* Summary/Excerpt if available, else first paragraph logic could go here */}

                        {/* Meta Data */}
                        <div className="flex items-center gap-4 border-y border-[#e7edf3] dark:border-gray-800 py-4">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                                {author.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col text-sm">
                                <span className="font-bold text-[#0d141b] dark:text-white">{author}</span>
                                <span className="text-[#4c739a] dark:text-gray-400">Author</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-4 ml-auto text-sm text-[#4c739a] dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_month</span>
                                    {formattedDate}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
                                    {Math.ceil(content.length / 1000)} min read
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* Hero Image - Placeholder or from metadata */}
                    <div className="mb-10 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 aspect-video relative group">
                        {ai_metadata?.image ? (
                            <img
                                alt={title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                src={ai_metadata.image}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
                                <span className="text-6xl">📝</span>
                            </div>
                        )}
                    </div>

                    {/* Article Body */}
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-[#0d141b] dark:text-gray-200 leading-8">
                        {isHtml(content) ? (
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        ) : (
                            <p className="whitespace-pre-wrap">{content}</p>
                        )}
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mt-10 flex flex-wrap gap-2">
                            {tags.map((tag: string, index: number) => (
                                <a key={index} className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors" href="#">
                                    #{tag}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Divider */}
                    <div className="my-12 h-px w-full bg-[#e7edf3] dark:bg-gray-800"></div>

                    {/* Comments Section - Placeholder for now */}
                    <section className="mt-12">
                        <h3 className="text-2xl font-bold text-[#0d141b] dark:text-white mb-6">Discussion</h3>
                        <p className="text-gray-500 italic">Comments are closed for this post.</p>
                    </section>
                </article>

                {/* Sidebar (Right Column) */}
                <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
                    {/* Sticky Wrapper */}
                    <div className="sticky top-24 space-y-8">
                        {/* Social Share */}
                        <div className="rounded-xl border border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2632] p-6 shadow-sm">
                            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">Share this post</h4>
                            <div className="flex gap-3">
                                {/* Social Buttons Placeholder */}
                                <button className="flex flex-1 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                                    Copy Link
                                </button>
                            </div>
                        </div>

                        {/* More Content Placeholder */}
                        <div className="rounded-xl border border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2632] p-6 shadow-sm">
                            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">Trending Topics</h4>
                            <div className="flex flex-wrap gap-2">
                                <a className="rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" href="#">Technology</a>
                                <a className="rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" href="#">Design</a>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </MainLayout>
    );
};

export default PostDetailPage;
