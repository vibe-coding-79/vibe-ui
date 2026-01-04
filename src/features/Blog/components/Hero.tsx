import React from 'react';
import { MdArrowForward } from 'react-icons/md';

const Hero: React.FC = () => {
    return (
        <section className="@container w-full mb-12">
            <div className="flex flex-col gap-6 md:gap-8 lg:flex-row items-center bg-white dark:bg-[#1a2634] p-6 md:p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div
                    className="w-full lg:w-3/5 bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden relative group"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCO4AiYok1uI3CMtdGmH7Eywsej9fD63OOgp4Gdnupy27uOxh5RNQh9Efv-m6sPEWKRI4Ev1qLJJazo05NxpF5T1BjTfswTmTmueG_nyGtosKIktN--VvuDLOiPRbG6VoYNqxxk9LdbZ1VwV-1IiOgd3M-MP-DRd3UpZ9LS1en26IsyMYRLgWEoSIitEtFOWsDlEvn4yAwFDVxMUam-CtAzHlR7dCy0F4Czz1x9XyKzNyV7xePscMAMV7vm2SX4E2XE3YOCcEcv7w")' }}
                >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                </div>
                <div className="w-full lg:w-2/5 flex flex-col gap-6 md:justify-center">
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Technology</span>
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">Oct 24, 2023</span>
                    </div>
                    <div className="flex flex-col gap-3 text-left">
                        <h1 className="text-[#0d141b] dark:text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                            The Future of AI in Design
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                            How generative algorithms are changing the way we create and consume visual content, empowering designers to push boundaries.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-full bg-slate-200 bg-cover"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBodhTvVO1k9ovmtRsS_zhyizABfG38ibOLuJCpuFCH0uRHjOv5jMVDjGDwTU9UZuaUsDkrghxxHWQekX6fqBVVuVD4tYHSMxdhumkDZCPhEHdKyyQBqrwM0gLkV2ofy2n6tAHqk0FNXEn-CdJsS1V0X2jUfVqE1EaRbZfmM997xtQM00d9EcqC-zK0sX_dtraenb-UZR4Vd0BBtsZrWYKZhuOqt8g2Pbon1JgeW6JLqsz9k9h-FQAXLzCnwFajgLlil4pymthj2g")' }}
                            ></div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Alex Morgan</p>
                                <p className="text-xs text-slate-500">Lead Editor</p>
                            </div>
                        </div>
                        <div className="flex-1"></div>
                        <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                            Read Story <MdArrowForward size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
