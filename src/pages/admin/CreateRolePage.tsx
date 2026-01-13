import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import RoleForm from '@/features/RoleManagement/components/RoleForm';
import { Link } from 'react-router-dom';

const CreateRolePage: React.FC = () => {
    const navigate = useNavigate();

    const handleSave = (data: any) => {
        console.log('Role Created:', data);
        // Here you would typically make an API call to save the role
        // For now, we'll just navigate back to the list
        navigate('/admin/roles');
    };

    const handleCancel = () => {
        navigate('/admin/roles');
    };

    return (
        <AdminLayout noPadding>
            <div className="flex flex-col min-h-full">
                <header className="p-8 pb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                        <Link to="/admin/roles" className="hover:text-primary transition-colors">Roles</Link>
                        <span className="material-symbols-outlined !text-[14px]">chevron_right</span>
                        <span className="text-slate-600 dark:text-slate-300">Add New Role</span>
                    </div>
                    <div className="flex flex-wrap justify-between items-end gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">Add New Role</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">Define a new identity and configure its granular permission set within the system.</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancel}
                                className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                // This button mimics the form submit, but in the actual form implementation, we rely on the form submit event.
                                // However, keeping the header button as an alternative action or just removing it if the form has its own primary button.
                                // The design shows buttons in the header AND at the bottom of the form.
                                // We can hook this up to submit specific form using ref or Context, but for simplicity let's stick to the form's bottom button.
                                // Or we can hide the bottom button and use this one.
                                // Looking at code.html, it seems the form has buttons at the bottom.
                                // The header buttons in code.html are "Cancel" and "Save Role".
                                // Ideally both should work. For now let's make the header cancel work, and maybe leave the header Save as a visual or duplicate trigger.
                                // Since react-hook-form or refs are not strictly used here yet, let's keep it simple.
                                // Actually, I will remove the duplicate buttons from the header in my implementation if they are in the form, 
                                // OR better, match the design strictly. The design HAS buttons in the header.
                                // Let's simplify: passing the save handler to the form.
                                onClick={() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
                            >
                                <span className="material-symbols-outlined !text-[18px]">save</span>
                                <span>Save Role</span>
                            </button>
                        </div>
                    </div>
                </header>

                <RoleForm onCancel={handleCancel} onSave={handleSave} />
            </div>
        </AdminLayout>
    );
};

export default CreateRolePage;
