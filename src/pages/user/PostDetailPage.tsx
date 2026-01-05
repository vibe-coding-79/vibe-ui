import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    console.log('Current slug:', slug);

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#0d141b] dark:text-gray-100 font-display transition-colors duration-200 min-h-screen">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2632]">
                <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        <a className="flex items-center gap-2 group" href="#">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>article</span>
                            </div>
                            <h2 className="text-lg font-bold leading-tight tracking-tight text-[#0d141b] dark:text-white group-hover:text-primary transition-colors">BlogSite</h2>
                        </a>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-sm font-medium text-[#0d141b] dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">Blog</a>
                            <a className="text-sm font-medium text-[#0d141b] dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">About</a>
                            <a className="text-sm font-medium text-[#0d141b] dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">Contact</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
                            </span>
                            <input
                                className="h-10 w-64 rounded-full border border-[#e7edf3] dark:border-gray-700 bg-[#f6f7f8] dark:bg-[#101922] pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:text-white placeholder:text-gray-500"
                                placeholder="Search..."
                                type="text"
                            />
                        </div>
                        <button className="flex items-center justify-center rounded-full size-10 text-[#0d141b] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 sm:hidden">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <button className="flex items-center justify-center rounded-full size-10 text-[#0d141b] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden cursor-pointer">
                            <img
                                alt="User Profile"
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmfVsgh2rtEakfhhrHetaQcul_GzhKbi68CyP48thjuZmTRa4uHWe1It0z_ZI_fbGkkx1PIE2f5icIMl1ogu2yJXTeLwSwdOJZRdfipWa1GvJAKmQMvom0rm96Czmhg9aE7CA2ueKoQBXR0JDDjm8uZYR132uHImaIvada5ODeb7Z-aKHt-2DIF77EKOGVZTWBG0D4iRfSncl_RY6XRkCONHVDhS-twp78w1R5nKistO8pU49bfWZfBCO0BC652PNiNWgrZw4DiQ"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Wrapper */}
            <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Article Content (Left Column) */}
                    <article className="flex-1 min-w-0 max-w-4xl mx-auto lg:mx-0">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-sm text-[#4c739a] dark:text-gray-400 mb-6">
                            <a className="hover:text-primary transition-colors" href="#">Home</a>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                            <a className="hover:text-primary transition-colors" href="#">Technology</a>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                            <span className="font-medium text-[#0d141b] dark:text-gray-200">{slug || 'Generative Design'}</span>
                        </nav>

                        {/* Header */}
                        <header className="mb-8">
                            <h1 className="mb-4 text-3xl font-black tracking-tight text-[#0d141b] dark:text-white sm:text-4xl lg:text-5xl leading-tight">
                                The Future of Generative Design in 2024
                            </h1>
                            <p className="mb-6 text-xl text-[#4c739a] dark:text-gray-400 font-light leading-relaxed">
                                Exploring how AI is reshaping the creative landscape for designers and developers alike, moving from manual iteration to algorithmic curation.
                            </p>

                            {/* Meta Data */}
                            <div className="flex items-center gap-4 border-y border-[#e7edf3] dark:border-gray-800 py-4">
                                <img
                                    alt="Sarah Jenkins"
                                    className="h-10 w-10 rounded-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr-D36KdsDw4fQ94sTs8Cr4bvfVu82SDrS_Fri3_wzX0YkQS7fCh4Or-x9bPR1WfoGdFCQluRKB8PDscn2_56BuurdGzUSsu29jal4ZlK_9oO0TfjDgDTkUMhx59YwBTbY4MKz0mOykSv0GBvNKVeOlfy4GguySp5sCQXSqRJg4EDvNYgG6iRgTy4eLtHDSLXWUzMqzoD1Kiv4TlExRPPJzTgmmNRbF2NgGBO7aVvJlOnKWlVf0NVPz75A4cph_kOUZSiXoJY-2g"
                                />
                                <div className="flex flex-col text-sm">
                                    <span className="font-bold text-[#0d141b] dark:text-white">Sarah Jenkins</span>
                                    <span className="text-[#4c739a] dark:text-gray-400">Product Designer @ TechFlow</span>
                                </div>
                                <div className="hidden sm:flex items-center gap-4 ml-auto text-sm text-[#4c739a] dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_month</span>
                                        Oct 24, 2023
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
                                        5 min read
                                    </span>
                                </div>
                            </div>
                        </header>

                        {/* Hero Image */}
                        <div className="mb-10 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 aspect-video relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <img
                                alt="Abstract colorful generative art waves"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU-doET7r0QrKTjJs2tw1udwOsr9oSFNLxTyaKiHnOlF4cPG2nZYQG3hTt8fKOFddrkuueSkFNw7dndC0LdlTrNbBwMCLkjUiK8xzRGi4p_gD8bi0Zam10YG56lCweGHAMbGYs82aNcVQAhYjfvojuBBnyLAFDri22mry1pCuKWrGXjJpGnImT-YvzIycHX7TbbXoW4SrAY4UyttRVtGNrerF7O4FYSPRO1ibMCdlbCfdMELkwIHwD6OilqG6X_NVMJOc2fvd48g"
                            />
                        </div>

                        {/* Article Body */}
                        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-[#0d141b] dark:text-gray-200 leading-8">
                            <p className="mb-6">
                                Generative design is not just a buzzword; it represents a fundamental shift in how we approach problem-solving in design. By leveraging machine learning algorithms and vast datasets, designers can now explore thousands of permutations of a solution in the time it used to take to draft a single concept. This isn't about replacing the designer, but rather augmenting their capability to innovate.
                            </p>
                            <h2 className="text-2xl font-bold mt-10 mb-4 text-[#0d141b] dark:text-white">The Algorithmic Partner</h2>
                            <p className="mb-6">
                                Imagine defining the parameters of a problem—weight, material constraints, cost, and structural integrity—and having a system generate hundreds of valid 3D models that meet those criteria. This is the reality today in fields ranging from architecture to industrial design. The designer's role shifts from "creator" to "curator" and "paramter setter."
                            </p>
                            <blockquote className="my-8 border-l-4 border-primary bg-[#e7edf3]/30 dark:bg-gray-800/50 p-6 rounded-r-lg italic text-lg text-gray-700 dark:text-gray-300">
                                "The goal of generative design is not to automate creativity, but to remove the friction between an idea and its execution."
                            </blockquote>
                            <p className="mb-6">
                                However, the integration of these tools brings new challenges. We must ask ourselves: How do we maintain a human touch in an automated world? The answer lies in the subtle imperfections and the emotional intelligence that AI currently lacks. A generative algorithm can maximize efficiency, but it cannot maximize <em>delight</em> without human guidance.
                            </p>
                            <h3 className="text-xl font-bold mt-8 mb-3 text-[#0d141b] dark:text-white">Tools of the Trade</h3>
                            <ul className="list-disc pl-6 mb-6 space-y-2 marker:text-primary">
                                <li><strong>Autodesk Fusion 360:</strong> Leading the charge in industrial manufacturing.</li>
                                <li><strong>Midjourney &amp; DALL-E:</strong> Revolutionizing concept art and visual exploration.</li>
                                <li><strong>RunwayML:</strong> Bringing generative capabilities to video editing and motion graphics.</li>
                            </ul>
                            <p className="mb-6">
                                As we move into 2024, we expect these tools to become more accessible, moving from specialized enterprise software to browser-based utilities that any freelancer can access.
                            </p>
                        </div>

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
            </main>

            {/* Simple Footer */}
            <footer className="mt-20 border-t border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2632] py-12">
                <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex size-6 items-center justify-center rounded bg-primary text-white">
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>article</span>
                        </div>
                        <span className="text-lg font-bold text-[#0d141b] dark:text-white">BlogSite</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 BlogSite Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PostDetailPage;
