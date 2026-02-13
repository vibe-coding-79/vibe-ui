import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '@/features/Auth/components/ProtectedRoute';

import HomePage from '@/pages/user/HomePage';
import PostDetailPage from '@/pages/user/PostDetailPage';
import CategoryPage from '@/pages/user/CategoryPage';

import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminAddPostPage from '@/pages/admin/AdminAddPostPage';
import RoleManagementPage from '@/pages/admin/RoleManagementPage';
import CreateRolePage from '@/pages/admin/CreateRolePage';
import NotFoundPage from '@/pages/NotFoundPage';
import UserLoginPage from '@/pages/user/UserLoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <UserLoginPage />,
  },
  {
    path: '/post/:slug',
    element: <PostDetailPage />,
  },
  {
    path: '/category/:slug',
    element: <CategoryPage />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/posts',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/posts/add',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminAddPostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/posts/:id/edit',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminAddPostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/roles',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <RoleManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/roles/create',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <CreateRolePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/roles/:id/edit',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <CreateRolePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
