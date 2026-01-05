import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/Auth/context/AuthContext';

const AdminLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the return URL from location state, or default to admin dashboard
    const from = location.state?.from?.pathname || '/admin/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-50 transition-colors duration-200">
            {/* Main Card Container */}
            <div className="w-full max-w-[480px] bg-white dark:bg-[#1e2732] rounded-xl shadow-lg border border-[#e7edf3] dark:border-[#2d3a48] overflow-hidden">
                {/* Header Section */}
                <div className="px-8 pt-10 pb-6 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-4xl">admin_panel_settings</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Admin Dashboard Access</h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Secure login for authorized personnel only</p>
                </div>

                {/* Login Form */}
                <form className="px-8 pb-10 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">error</span>
                            {error}
                        </div>
                    )}

                    {/* Username Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200" htmlFor="email">
                            Email Address or Username
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="material-symbols-outlined text-slate-400 text-xl">mail</span>
                            </div>
                            <input
                                className="block w-full rounded-lg border-0 py-3 pl-10 text-slate-900 ring-1 ring-inset ring-[#cfdbe7] dark:ring-[#4c5967] placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-[#101922] dark:text-white transition-all outline-none"
                                id="email"
                                name="email"
                                placeholder="admin@blog.com"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200" htmlFor="password">
                            Password
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="material-symbols-outlined text-slate-400 text-xl">lock</span>
                            </div>
                            <input
                                className="block w-full rounded-lg border-0 py-3 pl-10 text-slate-900 ring-1 ring-inset ring-[#cfdbe7] dark:ring-[#4c5967] placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-[#101922] dark:text-white transition-all outline-none"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-[#101922]"
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                            />
                            <label className="block text-sm text-slate-700 dark:text-slate-300" htmlFor="remember-me">
                                Keep me signed in
                            </label>
                        </div>
                        <div className="text-sm">
                            <a className="font-medium text-primary hover:text-primary/80 transition-colors" href="#">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 pt-2">
                        <button
                            className="flex w-full justify-center rounded-lg bg-primary px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed items-center gap-2"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    Logging in...
                                </>
                            ) : (
                                'Log in'
                            )}
                        </button>
                        <Link
                            to="/"
                            className="flex w-full justify-center rounded-lg bg-transparent border border-[#cfdbe7] dark:border-[#4c5967] px-3 py-3 text-sm font-medium leading-6 text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-[#2d3a48] transition-all"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>

                {/* Footer Area */}
                <div className="border-t border-[#e7edf3] dark:border-[#2d3a48] bg-slate-50 dark:bg-[#18212a] px-8 py-4 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Protected by reCAPTCHA and subject to the Privacy Policy and Terms of Service.
                    </p>
                </div>
            </div>

            {/* Back Link */}
            <div className="mt-8 text-center">
                <Link
                    to="/"
                    className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back to Blog Home
                </Link>
            </div>
        </div>
    );
};

export default AdminLoginPage;
