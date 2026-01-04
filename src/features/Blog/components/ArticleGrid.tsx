import React from 'react';

const articles = [
    {
        category: 'Productivity',
        date: 'Nov 12',
        title: '10 Tips for Efficient Remote Work',
        description: 'Mastering the art of working from home requires discipline, the right tools, and a designated workspace.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdSSGSqbX9Y_klIqSuSnNZFWiUpR76H7T3Jm6AXiNQCdRExeXUCPB2aRFsOtyvVpyoaDEDZ5_5uCle4_Ccys9uAvYHSUm1AQuD9WyQattPtNUghoHvhf7TuviqENYQ9-4cU141BvlY-K8vRDQevxO2QiTog-v-gcpU1ptCQjNaBdrq1VwcRTfssYYDcDq3sX5f8zeouiu0uMZriYEcgZ5M2OLai8LojN61-7v8TG5_TUiSy1SOp0H2MKPLzJZuP75Tr_6oKR0Skw',
    },
    {
        category: 'Design',
        date: 'Nov 10',
        title: 'Minimalism in Web Development',
        description: 'Why less is more when it comes to code, user interface, and overall user experience.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-8WmFsXV214OT6PMN_iwAIpGPqkuKtDQCEviMvjaBVsjGimTKKTs9pL0e1YIBo5qD48gzkDSA7nRYCA_BP1iq7nLOkecqCft1jbbKe-_PN8l6uFEtL_QqjYK7vLXKIFOQs5wVWXvjXCvh6tqnYHVOz21ofcG6P-KyQi7lTuxEGJrd7fihsUvFs5NvgsBiXve9j7bm1nVDgpcfqtsi4vZhcFqxg6p5ySAFhA8oGOSHex_17vu2w8seE4U0AKnfro-IqqHYLxn4Ew',
    },
    {
        category: 'Design',
        date: 'Nov 08',
        title: 'Understanding Color Theory',
        description: 'How to choose the right palette for your brand and evoke the correct emotions in your users.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbRA1Ipw2n5nolOFGPAxbv0Idw2uK8llyp29ce1yeTCuKS4pE_xIFvo7SN9d7v9LDcxNre-ak05Y_SQPcRURdAXy06qinrQIi0C0zeBLzpD_Xj339s2Nq-QEVPj3Sak9Ntn-d1MIax8cpVE4T9k_hh4FvNOG4JWdebOdfnKhXF3EnjhuZF-C4XNaXDtl2tsfX6JG47Zhlcqa5Sms2quXq4z7hcWkMLDXrtPZZ8KNr1qkeWf2FVQF5lGnmhTGYniXeDejQ4pe02TA',
    },
    {
        category: 'Tech',
        date: 'Nov 05',
        title: 'The Rise of No-Code Tools',
        description: 'Building complex applications without writing a single line of code is becoming a reality.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcs2bs66JInt6q0UalDVIj1IbnX6UNRoLV1Xr5XyPLtCF-8uYlpjDj3OusDXMx_IIGFHgZc4pBHfa3JJPqPf4DNAa4Gs27RRnlKQiAHlZNVOnIm6dmGxvZ95OhIjwZUERyHgy_VJZ8vCTBETHg7BmSdBDD-rBesmEeCVHeVLkUiDniRkU1mBa9uhxeSmSzjMg4sRgeAh8j9YFdnhJla2G54_XW3Z1N__aUmjkTc6gqMb9Wm-NMPd74uXN-VNmnt4hwHmriefLxbQ',
    },
    {
        category: 'Environment',
        date: 'Nov 03',
        title: 'Sustainable Tech Innovations',
        description: 'New technologies that are helping to reduce carbon footprints and promote green energy.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx6e9GJBsEhpKAOmrPdWa1okK0cSsxFEwwyD3TaVc6Lj15E03TQpYPt1yHj698vG2I0HYK5uZ1LFhMlklCrx0MNovq6sXX55DxmtD7jnNFj-tjo_wAHqsk-8Xduc2qKN9DqP-en5Zu78hFIUQo0UbedPBc6BglXTotzX3KoYqPKxy0t5seXqeP5yRb9B30YqQL8ZGPPhrDGEsxd9SwDVyDNJD_YiALzpuOu-hMiTCyIYEOGR4_3wsHm4U2NBEyG8ZQ2ix7vd4O-g',
    },
    {
        category: 'Lifestyle',
        date: 'Nov 01',
        title: 'Digital Nomad Life',
        description: 'Exploring the world while maintaining a full-time career: challenges and rewards.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuXgXjAd6Qe-tjdHp5VoX1SwqRsDb1ovdtKgqMcr0KNe7XyNbbnJnGQf5B3XySrO9kUlnjwI2-Xyr_Toa97r2rNAhb9rd4ST2rPVxgXwM7gVPkH7ySX9xM7ytEFZ8RmZL_su_FXCmfWJBtIqLbd1RzRdoVRQFwpVnMv11fCBSfZ_fRl3nHX-byErZMKsx9mBP15LvWypl-x-siAR2kiGpr8QPGSJeTGKEnz5S4a9ubx6FE3s0AnO7oo-fUnV7qAnshojcoDsP81g',
    },
];

const ArticleGrid: React.FC = () => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#0d141b] dark:text-white tracking-tight text-2xl font-bold leading-tight">Recent Articles</h2>
                <a className="text-sm font-medium text-primary hover:text-blue-600 hidden sm:block" href="#">View all posts</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                {articles.map((article, index) => (
                    <article key={index} className="flex flex-col gap-3 group cursor-pointer">
                        <div
                            className="w-full bg-center bg-no-repeat aspect-[16/10] bg-cover rounded-lg overflow-hidden shadow-sm transition-all duration-300 group-hover:translate-y-[-4px] group-hover:shadow-md"
                            style={{ backgroundImage: `url("${article.image}")` }}
                        ></div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-primary text-xs font-bold uppercase">{article.category}</span>
                                <span className="text-slate-400 text-xs">•</span>
                                <span className="text-slate-500 dark:text-slate-400 text-xs">{article.date}</span>
                            </div>
                            <h3 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-[#4c739a] dark:text-slate-400 text-sm font-normal leading-relaxed line-clamp-2">
                                {article.description}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
            <div className="mt-12 flex justify-center">
                <button className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white font-semibold py-2 px-6 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                    Load More Articles
                </button>
            </div>
        </div>
    );
};

export default ArticleGrid;
