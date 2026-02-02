import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';
import { usePopularPost } from '../hooks/usePopularPost';
import { useRecordView } from '../hooks/usePosts';

const Hero: React.FC = () => {
    const { data: popularPostData, isLoading, error } = usePopularPost();
    const { mutate: recordView } = useRecordView();

    useEffect(() => {
        if (popularPostData?.data?.id) {
            recordView(popularPostData.data.id);
        }
    }, [popularPostData?.data?.id, recordView]);

    if (isLoading) {
        return (
            <section className="@container w-full mb-12">
                <div className="flex flex-col gap-6 md:gap-8 lg:flex-row items-center bg-white dark:bg-[#1a2634] p-6 md:p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 animate-pulse">
                    <div className="w-full lg:w-3/5 aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                    <div className="w-full lg:w-2/5 flex flex-col gap-6">
                        <div className="flex gap-2">
                            <div className="w-20 h-6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                            <div className="w-24 h-6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="w-full h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
                            <div className="w-3/4 h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
                            <div className="w-full h-20 bg-slate-200 dark:bg-slate-700 rounded mt-2"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !popularPostData?.data) {
        return null; // Or show static content as fallback
    }

    const post = popularPostData.data;
    const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <section className="@container w-full mb-12">
            <div className="flex flex-col gap-6 md:gap-8 lg:flex-row items-center bg-white dark:bg-[#1a2634] p-6 md:p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div
                    className="w-full lg:w-3/5 bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden relative group"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop")' }}
                >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                </div>
                <div className="w-full lg:w-2/5 flex flex-col gap-6 md:justify-center">
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</span>
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">{formattedDate}</span>
                    </div>
                    <div className="flex flex-col gap-3 text-left">
                        <Link to={`/post/${post.slug}`}>
                            <h1 className="text-[#0d141b] dark:text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight hover:text-primary transition-colors cursor-pointer">
                                {post.title}
                            </h1>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                            {post.content_snippet}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-full bg-slate-200 bg-cover"
                                style={{ backgroundImage: 'url("https://ui-avatars.com/api/?name=Admin&background=random")' }}
                            ></div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Editorial Team</p>
                                <p className="text-xs text-slate-500">{post.view_count_this_week} views this week</p>
                            </div>
                        </div>
                        <div className="flex-1"></div>
                        <Link to={`/post/${post.slug}`} className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                            Read Story <MdArrowForward size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
