import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { usePostBySlug, useRecordView } from '@/features/Blog/hooks/usePosts';

const PostDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: postData, isLoading, error } = usePostBySlug(slug || '');
    const recordView = useRecordView();

    const post = postData?.data;

    // Record view when post loads
    useEffect(() => {
        if (post?.id) {
            // Convert string ID to number for the view tracking API
            const numericId = parseInt(post.id.split('-')[0] || '0', 10);
            if (numericId > 0) {
                recordView.mutate(numericId);
            }
        }
    }, [post?.id]);

    // Get author full name
    const authorName = post?.author
        ? `${post.author.first_name} ${post.author.last_name}`
        : post?.author_name || 'Anonymous';

    // Format date - use created_at or published_at
    const dateToFormat = post?.created_at || post?.published_at;
    const formattedDate = dateToFormat
        ? new Date(dateToFormat).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
        : '';

    // Calculate read time (rough estimate: 200 words per minute)
    const calculateReadTime = (content: string) => {
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    };

    if (isLoading) {
        return (
            <MainLayout>
                <div className="mx-auto max-w-[1280px]">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <article className="flex-1 min-w-0 max-w-4xl mx-auto lg:mx-0">
                            <div className="animate-pulse space-y-6">
                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                                <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (error || !post) {
        return (
            <MainLayout>
                <div className="mx-auto max-w-[1280px]">
                    <div className="flex flex-col items-center justify-center py-20">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Post Not Found</h1>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">
                            The post you're looking for doesn't exist or has been removed.
                        </p>
                        <Link
                            to="/"
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    // Use thumbnail or image_url
    const imageUrl = post.thumbnail || post.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop';

    return (
        <MainLayout>
            {/* Main Content Wrapper */}
            <div className="mx-auto max-w-[1280px]">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Article Content (Left Column) */}
                    <article className="flex-1 min-w-0 max-w-4xl mx-auto lg:mx-0">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-sm text-[#4c739a] dark:text-gray-400 mb-6">
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                            {post.category_name && (
                                <>
                                    <Link to={`/category/${post.category_name.toLowerCase()}`} className="hover:text-primary transition-colors">
                                        {post.category_name}
                                    </Link>
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                                </>
                            )}
                            <span className="font-medium text-[#0d141b] dark:text-gray-200">{post.title}</span>
                        </nav>

                        {/* Header */}
                        <header className="mb-8">
                            <h1 className="mb-4 text-3xl font-black tracking-tight text-[#0d141b] dark:text-white sm:text-4xl lg:text-5xl leading-tight">
                                {post.title}
                            </h1>
                            {post.content_snippet && (
                                <p className="mb-6 text-xl text-[#4c739a] dark:text-gray-400 font-light leading-relaxed">
                                    {post.content_snippet}
                                </p>
                            )}

                            {/* Meta Data */}
                            <div className="flex items-center gap-4 border-y border-[#e7edf3] dark:border-gray-800 py-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-primary font-bold">
                                        {authorName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex flex-col text-sm">
                                    <span className="font-bold text-[#0d141b] dark:text-white">
                                        {authorName}
                                    </span>
                                    <span className="text-[#4c739a] dark:text-gray-400">Author</span>
                                </div>
                                <div className="hidden sm:flex items-center gap-4 ml-auto text-sm text-[#4c739a] dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_month</span>
                                        {formattedDate}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
                                        {calculateReadTime(post.content || '')}
                                    </span>
                                </div>
                            </div>
                        </header>

                        {/* Hero Image */}
                        <div className="mb-10 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 aspect-video relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <img
                                alt={post.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                src={imageUrl}
                            />
                        </div>

                        {/* Article Body */}
                        <div
                            className="prose prose-lg prose-slate dark:prose-invert max-w-none text-[#0d141b] dark:text-gray-200 leading-8"
                            dangerouslySetInnerHTML={{ __html: post.content || '' }}
                        />

                        {/* Tags */}
                        <div className="mt-10 flex flex-wrap gap-2">
                            <a className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors" href="#">
                                #GenerativeDesign
                            </a>
                            <a className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors" href="#">
                                #ArtificialIntelligence
                            </a>
                            <a className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors" href="#">
                                #FutureTech
                            </a>
                            <a className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors" href="#">
                                #DesignTrends
                            </a>
                        </div>

                        {/* Divider */}
                        <div className="my-12 h-px w-full bg-[#e7edf3] dark:bg-gray-800"></div>

                        {/* Comments Section */}
                        <section className="mt-12">
                            <h3 className="text-2xl font-bold text-[#0d141b] dark:text-white mb-6">Discussion (3)</h3>
                            {/* Comment Form */}
                            <div className="mb-10 flex gap-4">
                                <div className="hidden sm:block size-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                    <img
                                        alt="Current User"
                                        className="h-full w-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-gZV1bk01N7UnqeGkocZiicRY-jzC8r9Psvza2p7PxQo2eLyI5gINPO_fPn6lqSl9lsMcZDtsTRyYZa8tZN4o5pDyFrsZ_D45cNpd7x1qL1_NmWCDjULd7v1Y3Ro5d4nvov4XKcEwjjfx7NAKbcphHmaWDWCyZXvokSGFCKfRqbtv4aP_cQ2g3d3P4MZj2FFueY1y9BQ3MV49pJHFzShx0Ohu0a6tRjxIowo1U_4VdlG0W-adjQS5Tm0En5SfTlWCuAeGH9z-IQ"
                                    />
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        className="w-full rounded-lg border border-[#e7edf3] dark:border-gray-700 bg-white dark:bg-[#1a2632] p-4 text-[#0d141b] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400"
                                        placeholder="Join the discussion..."
                                        rows={3}
                                    ></textarea>
                                    <div className="mt-3 flex justify-end">
                                        <button className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white hover:bg-blue-600 transition-colors">
                                            Post Comment
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Comment List */}
                            <div className="space-y-8">
                                {/* Comment 1 */}
                                <div className="flex gap-4">
                                    <img
                                        alt="Mark"
                                        className="size-10 rounded-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsqKKjeVi2TvuyrUNIReMGv-6MrWqX7EhA1Bm6OLpmDXfzRtTHcwSwIOnKjXUK3i-U7dnByc_wnQM2zT45-H2OLODXi0HLPCsKwjpxxeTNOjKc-suE0WoBv5cCebkcxRUhSP8oDTTsj2dDsjcBKeiRN6NtdF0cnrvs2vkOR2LVp__q_LBaJB4Mq1_AAtQcxRQdHL8a5RoBCm9rWen18kTq7XUkrbgY81F9zZl7z54VfpMTL4OfpjFZcqJWzAFidvlZs12HbS_R_Q"
                                    />
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="font-bold text-[#0d141b] dark:text-white">Mark Thompson</span>
                                                <span className="ml-2 text-xs text-gray-500">2 hours ago</span>
                                            </div>
                                            <button className="text-gray-400 hover:text-primary">
                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>reply</span>
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                            Great article! I've been experimenting with Midjourney for concept art, and it's incredible how it sparks new ideas I wouldn't have thought of on my own.
                                        </p>
                                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                                            <button className="flex items-center gap-1 hover:text-primary">
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>thumb_up</span> 12
                                            </button>
                                            <button className="flex items-center gap-1 hover:text-primary">
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>thumb_down</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Comment 2 */}
                                <div className="flex gap-4">
                                    <img
                                        alt="Julia"
                                        className="size-10 rounded-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj18SNzrwqMHjI9NsGJFAfwIR8qNr6-xPcp1V7RMlp_rkuaV2Traf-u8NdpqkLMpxq_O3WNI2s1FoHAh0rjn3yNib1VvIIZpa-X-LJLt2RxDO4Uiglj9Liel_JKOKnQaMukvG3cJP9V6bPKyA0N_jbasrDhMXgDQ891wzAiMLqQw4Lamdx2J_hDnchakJEkl1gqrssZSixygSce1xtfz-snxIN0oqvrdjaTehHaNWZGVzTLm9ElZIWtiVM-aHwsrTiNvWV0q4wRQ"
                                    />
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="font-bold text-[#0d141b] dark:text-white">Julia Chen</span>
                                                <span className="ml-2 text-xs text-gray-500">5 hours ago</span>
                                            </div>
                                            <button className="text-gray-400 hover:text-primary">
                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>reply</span>
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                            I worry a bit about the homogenization of design styles if everyone uses the same models. How do we keep things unique?
                                        </p>
                                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                                            <button className="flex items-center gap-1 hover:text-primary">
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>thumb_up</span> 8
                                            </button>
                                            <button className="flex items-center gap-1 hover:text-primary">
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>thumb_down</span> 1
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                    <button className="flex flex-1 items-center justify-center rounded-lg bg-[#1da1f2]/10 py-2.5 text-[#1da1f2] hover:bg-[#1da1f2] hover:text-white transition-all">
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                                    </button>
                                    <button className="flex flex-1 items-center justify-center rounded-lg bg-[#0077b5]/10 py-2.5 text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all">
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path></svg>
                                    </button>
                                    <button className="flex flex-1 items-center justify-center rounded-lg bg-[#3b5998]/10 py-2.5 text-[#3b5998] hover:bg-[#3b5998] hover:text-white transition-all">
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                                    </button>
                                    <button className="flex flex-1 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>content_copy</span>
                                    </button>
                                </div>
                            </div>

                            {/* Newsletter Signup */}
                            <div className="rounded-xl bg-primary p-6 text-white shadow-lg relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-white/20">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold">Weekly Tech Digest</h3>
                                    <p className="mb-4 text-sm text-blue-100">Get the latest design trends and tech news delivered to your inbox.</p>
                                    <form className="flex flex-col gap-2">
                                        <input
                                            className="w-full rounded-lg border-none bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-blue-200 focus:ring-2 focus:ring-white/50"
                                            placeholder="Your email address"
                                            type="email"
                                        />
                                        <button className="w-full rounded-lg bg-white py-2.5 text-sm font-bold text-primary hover:bg-blue-50 transition-colors" type="submit">
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                                {/* Decorative circle bg */}
                                <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                                <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl"></div>
                            </div>

                            {/* More from Author */}
                            <div className="rounded-xl border border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2632] p-6 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-sm font-bold uppercase tracking-wide text-gray-500">More by Sarah</h4>
                                    <a className="text-xs font-medium text-primary hover:underline" href="#">View all</a>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <a className="group flex gap-3" href="#">
                                        <img
                                            alt="People analyzing charts on a laptop"
                                            className="size-16 rounded-lg object-cover group-hover:opacity-80 transition-opacity"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDObXOKnFD1bCRAYEAU4gyVVsblFydDPjAP9n3HM7wfHJdxzY1MZkKzkywoDHcWf3D2Bqxe5zYu1vMm5Rvs1IV1FoBKLMyj6UYt14PZPF9lJSmpdHPmr9fiQJbkthoZfeRQ8yMfoSKU1Binhe40RfUOqujNZHpjIgEXBe1rAklXKCykte0arHkKYWH7aQ4fgzc7T_uTHsx4sk5CUMvEk_e0vwNx_tV36mvfuxGh7yIOqzOFnK6nPGxA6JQ2dzIuegQGvGN_5IpgyA"
                                        />
                                        <div>
                                            <h5 className="text-sm font-bold leading-snug text-[#0d141b] dark:text-white group-hover:text-primary transition-colors">Data-Driven Design Principles</h5>
                                            <span className="mt-1 block text-xs text-gray-500">Sep 12 • 4 min read</span>
                                        </div>
                                    </a>
                                    <a className="group flex gap-3" href="#">
                                        <img
                                            alt="Retro technology setup"
                                            className="size-16 rounded-lg object-cover group-hover:opacity-80 transition-opacity"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhrTSKzUngymLxeX4KNrEWgEjcoclURl9t3vet4YOHVcgkYEaFGnvjZF2VOIPheohFAS2SAAV-GxdicdES8MMj-sGLAs1OAfphkHyJBpCDVN2TWov9SI-TnqQAyHi7ym0_Em8idlQmGdDOODYCP9qTzdJ7XHuI3gN_-cwj_Fxk2PvZX2asKy82r9XvTmPH0nOAV_QomVdyW-ptEKpILC5uZf_zANDGDZLJwIeZj-aVEt5jlLDSnJ_yFwFHyfa07g472a5vCB4D9g"
                                        />
                                        <div>
                                            <h5 className="text-sm font-bold leading-snug text-[#0d141b] dark:text-white group-hover:text-primary transition-colors">Why Retro UI is Coming Back</h5>
                                            <span className="mt-1 block text-xs text-gray-500">Aug 28 • 6 min read</span>
                                        </div>
                                    </a>
                                    <a className="group flex gap-3" href="#">
                                        <img
                                            alt="Mobile app wireframes"
                                            className="size-16 rounded-lg object-cover group-hover:opacity-80 transition-opacity"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4zQrccapbZzv6lKKVvzKh0TuBW6tWmBDjW9Zsxdne8kEOvTKxpLpp_slm78ePJEHfGrUPtHldp4veObLx8BzYmV-IBfpWevTtd99LfC3_paWMmvuP_Xv93f2vkKihVkP-MhFCpPIRfNppUnyJjO80Jbfx6iV-wfg-iMmfb9NmqgLih7s5IIp6lRHDzqSGzGSFqyQWW0EhI0MV_stC_DAQ4cUnH2vDE7MO2EFgQLIvjMUMpn6sb5XU6E0LdLlF5FWNeXvzPgVlCg"
                                        />
                                        <div>
                                            <h5 className="text-sm font-bold leading-snug text-[#0d141b] dark:text-white group-hover:text-primary transition-colors">Sketch vs Figma in 2024</h5>
                                            <span className="mt-1 block text-xs text-gray-500">Aug 15 • 8 min read</span>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Trending Tags */}
                            <div className="rounded-xl border border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2632] p-6 shadow-sm">
                                <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">Trending Topics</h4>
                                <div className="flex flex-wrap gap-2">
                                    <a className="rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" href="#">UI Design</a>
                                    <a className="rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" href="#">UX Research</a>
                                    <a className="rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" href="#">Web Development</a>
                                    <a className="rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" href="#">Freelancing</a>
                                    <a className="rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" href="#">Remote Work</a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </MainLayout>
    );
};

export default PostDetailPage;
