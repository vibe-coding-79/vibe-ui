import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/features/Blog/components/Hero';
import CategoryChips from '@/features/Blog/components/CategoryChips';
import ArticleGrid from '@/features/Blog/components/ArticleGrid';
import Sidebar from '@/features/Blog/components/Sidebar';

const HomePage: React.FC = () => {
    return (
        <MainLayout>
            <Hero />
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 w-full lg:w-2/3 flex flex-col">
                    <CategoryChips />
                    <ArticleGrid />
                </div>
                <Sidebar />
            </div>
        </MainLayout>
    );
};

export default HomePage;
