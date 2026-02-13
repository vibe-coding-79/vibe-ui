import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '@/features/Auth/hooks/useLogin';
import { useAuth } from '@/features/Auth/context/AuthContext';
import { getErrorMessage } from '@/utils/error-handler';

const UserLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const loginMutation = useLogin();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        loginMutation.mutate(
            { email, password },
            {
                onError: (err) => {
                    setError(getErrorMessage(err));
                },
            }
        );
    };

    return (
        <div className="flex min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-light dark:bg-background-dark text-[#0d141b] dark:text-white transition-colors duration-200">
            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center p-4 py-12">
                <div className="layout-content-container flex flex-col w-full max-w-[480px]">
                    {/* Login Card */}
                    <div className="bg-white dark:bg-[#1A2633] rounded-xl shadow-lg border border-[#e7edf3] dark:border-[#2a3845] p-6 sm:p-8 transition-colors">
                        {/* Heading */}
                        <div className="flex flex-col gap-2 mb-8 text-center sm:text-left">
                            <h1 className="text-[#0d141b] dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Welcome back</h1>
                            <p className="text-[#4c739a] dark:text-gray-400 text-base font-normal leading-normal">Please enter your details to sign in.</p>
                        </div>

                        {/* Social Login */}
                        <div className="flex flex-col gap-4">
                            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white dark:bg-[#253240] border border-[#cfdbe7] dark:border-[#3a4b5c] text-[#0d141b] dark:text-white hover:bg-gray-50 dark:hover:bg-[#2d3d4d] transition-colors gap-3 text-base font-bold leading-normal tracking-[0.015em] group">
                                <span className="material-symbols-outlined text-[#0d141b] dark:text-white group-hover:scale-110 transition-transform">account_circle</span>
                                <span className="truncate">Sign in with Google</span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative py-6 flex items-center">
                            <div className="flex-grow border-t border-[#e7edf3] dark:border-[#3a4b5c]"></div>
                            <span className="flex-shrink-0 mx-4 text-[#4c739a] dark:text-gray-500 text-sm font-normal">Or continue with email</span>
                            <div className="flex-grow border-t border-[#e7edf3] dark:border-[#3a4b5c]"></div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">error</span>
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {/* Email Input */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[#0d141b] dark:text-gray-200 text-base font-medium leading-normal" htmlFor="email">Email</label>
                                <input
                                    className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#0d141b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-[#cfdbe7] dark:border-[#3a4b5c] bg-[#f8fafc] dark:bg-[#253240] h-12 px-4 placeholder:text-[#4c739a] dark:placeholder:text-gray-500 text-base font-normal leading-normal transition-all"
                                    id="email"
                                    placeholder="Enter your email address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[#0d141b] dark:text-gray-200 text-base font-medium leading-normal" htmlFor="password">Password</label>
                                <input
                                    className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#0d141b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-[#cfdbe7] dark:border-[#3a4b5c] bg-[#f8fafc] dark:bg-[#253240] h-12 px-4 placeholder:text-[#4c739a] dark:placeholder:text-gray-500 text-base font-normal leading-normal transition-all"
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Utilities Row */}
                            <div className="flex flex-wrap items-center justify-between gap-3 mt-1">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        className="h-4 w-4 rounded border-[#cfdbe7] dark:border-[#3a4b5c] bg-white dark:bg-[#253240] text-primary focus:ring-primary/20 dark:focus:ring-offset-gray-800"
                                        type="checkbox"
                                    />
                                    <span className="text-sm text-[#4c739a] dark:text-gray-400 font-medium">Remember me</span>
                                </label>
                                <Link className="text-sm font-semibold text-primary hover:text-blue-600 transition-colors" to="/forgot-password">Forgot Password?</Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                className="flex w-full mt-2 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loginMutation.isPending}
                            >
                                {loginMutation.isPending ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        <span className="truncate">Signing In...</span>
                                    </>
                                ) : (
                                    <span className="truncate">Sign In</span>
                                )}
                            </button>
                        </form>

                        {/* Footer Link */}
                        <div className="mt-8 text-center">
                            <p className="text-[#4c739a] dark:text-gray-400 text-sm font-normal">
                                Don't have an account?
                                <Link className="ml-1 font-bold text-[#0d141b] dark:text-white hover:underline decoration-primary decoration-2 underline-offset-4 transition-all" to="/signup">Sign up</Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer Simple */}
                    <div className="mt-8 flex justify-center gap-6 text-[#4c739a] dark:text-gray-500">
                        <Link className="text-sm hover:text-primary transition-colors" to="/terms">Terms of Service</Link>
                        <Link className="text-sm hover:text-primary transition-colors" to="/privacy">Privacy Policy</Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserLoginPage;
