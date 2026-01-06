import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CKEditorComponent from '@/components/Editor/CKEditorComponent';
import { postSchema } from '@/features/Blog/schemas/postSchema';
import { useCreatePost } from '@/features/Blog/hooks/usePosts';
import { getErrorMessage } from '@/utils/error-handler';
import * as yup from 'yup';

const AdminAddPostPage: React.FC = () => {
    const [categories, setCategories] = useState([
        { id: 'tech', name: 'Technology', checked: false },
        { id: 'design', name: 'Design', checked: true },
        { id: 'dev', name: 'Development', checked: false },
        { id: 'tutorials', name: 'Tutorials', checked: false },
    ]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [visibility, setVisibility] = useState('Public');
    const [tags, setTags] = useState(['UX Design', 'Web']);
    const [tagInput, setTagInput] = useState('');
    const [author, setAuthor] = useState('John Doe (You)');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const toggleCategory = (id: string) => {
        setCategories(categories.map(cat =>
            cat.id === id ? { ...cat, checked: !cat.checked } : cat
        ));
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const createPostMutation = useCreatePost();

    const handlePublish = async () => {
        const formData = {
            title,
            content,
            publishDate,
            visibility,
            categories: categories.filter(cat => cat.checked).map(cat => cat.name),
            tags,
            author,
        };

        try {
            await postSchema.validate(formData, { abortEarly: false });
            setErrors({});

            createPostMutation.mutate(formData, {
                onSuccess: (data) => {
                    console.log('Post published successfully:', data);
                    alert('Post published successfully!');
                    // Optionally reset form or redirect
                },
                onError: (error) => {
                    const message = getErrorMessage(error);
                    console.error('Failed to publish post:', error);
                    alert(`Failed to publish post: ${message}`);
                }
            });
        } catch (err: unknown) {
            if (err instanceof yup.ValidationError) {
                const newErrors: Record<string, string> = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        newErrors[error.path] = error.message;
                    }
                });
                setErrors(newErrors);
                console.log('Validation failed:', newErrors);
            }
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-50 min-h-screen flex flex-col">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white dark:bg-[#15202b] border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Logo & Back Link */}
                        <div className="flex items-center gap-4">
                            <Link
                                to="/admin/dashboard"
                                className="flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                            >
                                <span className="material-symbols-outlined">arrow_back</span>
                            </Link>
                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                            <div className="flex items-center gap-2">
                                <div className="size-8 rounded bg-primary flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-[20px]">edit_document</span>
                                </div>
                                <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight hidden sm:block">
                                    Add New Post
                                </h1>
                            </div>
                        </div>
                        {/* Right: Status & Actions */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline-block mr-2">
                                <span className="material-symbols-outlined text-[16px] align-text-bottom mr-1">
                                    cloud_done
                                </span>
                                Saved 2 mins ago
                            </span>
                            <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                Preview
                            </button>
                            <button
                                onClick={handlePublish}
                                disabled={createPostMutation.isPending}
                                className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-sm hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {createPostMutation.isPending ? (
                                    <>
                                        <span className="animate-spin size-4 border-2 border-white border-t-transparent rounded-full"></span>
                                        Publishing...
                                    </>
                                ) : (
                                    'Publish'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Editor (70% on large screens) */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Title Input */}
                        <div className="bg-white dark:bg-[#15202b] rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
                            <input
                                className={`w-full bg-transparent border-none p-0 text-3xl sm:text-4xl font-black placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:ring-0 text-slate-900 dark:text-white leading-tight ${errors.title ? 'ring-2 ring-red-500 rounded-lg p-2' : ''}`}
                                placeholder="Enter post title..."
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
                        </div>
                        {/* Refactored CKEditor Component */}
                        <div className="bg-white dark:bg-[#15202b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col min-h-[600px] overflow-hidden">
                            <CKEditorComponent
                                initialData={content}
                                onChange={(data) => setContent(data)}
                                placeholder="Start writing your story here..."
                            />
                        </div>
                        {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                    </div>

                    {/* Right Column: Sidebar (30% on large screens) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Publish Settings */}
                        <div className="bg-white dark:bg-[#15202b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                                <h3 className="font-bold text-slate-900 dark:text-white">Publishing</h3>
                                <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:text-yellow-400">
                                    Draft
                                </span>
                            </div>
                            <div className="p-5 flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Publish Date
                                    </label>
                                    <input
                                        className="block w-full px-3 py-2 rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        type="date"
                                        value={publishDate}
                                        onChange={(e) => setPublishDate(e.target.value)}
                                    />
                                    <p className="mt-1 text-xs text-slate-500">Leave blank to publish immediately.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Visibility
                                    </label>
                                    <select
                                        className="block w-full px-3 py-2 rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        value={visibility}
                                        onChange={(e) => setVisibility(e.target.value)}
                                    >
                                        <option>Public</option>
                                        <option>Private</option>
                                        <option>Password Protected</option>
                                    </select>
                                </div>
                                <div className="pt-2 flex justify-between gap-3">
                                    <button className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                                        Save Draft
                                    </button>
                                    <button className="flex-1 rounded-lg border border-red-200 dark:border-red-900/50 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="bg-white dark:bg-[#15202b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                <h3 className="font-bold text-slate-900 dark:text-white">Featured Image</h3>
                            </div>
                            <div className="p-5">
                                <div className="flex max-w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                                    <div className="rounded-full bg-slate-200 dark:bg-slate-700 p-3 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">
                                            cloud_upload
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                                        Click to upload
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        SVG, PNG, JPG or GIF
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Taxonomy (Categories & Tags) */}
                        <div className="bg-white dark:bg-[#15202b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                <h3 className="font-bold text-slate-900 dark:text-white">Taxonomy</h3>
                            </div>
                            <div className="p-5 flex flex-col gap-6">
                                {/* Categories */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Categories
                                        </label>
                                        <button className="text-xs text-primary font-medium hover:underline">
                                            Add New
                                        </button>
                                    </div>
                                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                        {categories.map(category => (
                                            <label
                                                key={category.id}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                                            >
                                                <input
                                                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                                                    type="checkbox"
                                                    checked={category.checked}
                                                    onChange={() => toggleCategory(category.id)}
                                                />
                                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                                    {category.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.categories && <p className="text-red-500 text-xs mt-2">{errors.categories}</p>}
                                </div>
                                <div className="border-t border-slate-100 dark:border-slate-800"></div>
                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Tags
                                    </label>
                                    <input
                                        className="block w-full px-3 py-2 rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm mb-3"
                                        placeholder="Add tags and press Enter..."
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map(tag => (
                                            <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-700 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 ring-1 ring-inset ring-slate-500/10">
                                                {tag}
                                                <button
                                                    onClick={() => removeTag(tag)}
                                                    className="hover:text-slate-900 dark:hover:text-white"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Author */}
                        <div className="bg-white dark:bg-[#15202b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                <h3 className="font-bold text-slate-900 dark:text-white">Author</h3>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="h-10 w-10 rounded-full bg-slate-200 bg-cover bg-center"
                                        aria-label="Profile picture of current user"
                                        style={{
                                            backgroundImage:
                                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDhvEEyitKf5eE3CSEEXVhHASOZFafbCPN6vxLr_79rKyQlGRz9zFVKhonyisy162OrevZ0k5jQRfXwV8OAkNQGjArVqKb75IlyxEMv1MFcWniX-mG38cJLOhgFEzVWgtC4k2Gf2O33iIOIwHGoyjhvkFnF5LCvKul7iHcbfySv3v1F2aK2uukWJCVdU5z0_GbOeTU2f6EvWQpnxf74rZptqI8Bv8gFd6bTKt_nLilsSnPvlBr3e_XgA3s-zZQzYC6eLXq3hO_rCw')",
                                        }}
                                    ></div>
                                    <div className="flex-1">
                                        <select
                                            className="block w-full rounded-lg border-0 py-1.5 pl-3 pr-10 text-slate-900 dark:text-white ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 bg-transparent"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                        >
                                            <option>John Doe (You)</option>
                                            <option>Jane Smith</option>
                                            <option>Editorial Team</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminAddPostPage;
