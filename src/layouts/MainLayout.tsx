import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col overflow-x-hidden">
            <Header />
            <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
