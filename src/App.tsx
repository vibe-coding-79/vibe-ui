import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/user/HomePage';
import PostDetailPage from '@/pages/user/PostDetailPage';
import CategoryPage from '@/pages/user/CategoryPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminAddPostPage from '@/pages/admin/AdminAddPostPage';
import RoleManagementPage from '@/pages/admin/RoleManagementPage';
import CreateRolePage from '@/pages/admin/CreateRolePage';
import { AuthProvider } from '@/features/Auth/context/AuthContext';
// import ProtectedRoute from '@/features/Auth/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:slug" element={<PostDetailPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              // <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboardPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/posts/add"
            element={
              // <ProtectedRoute allowedRoles={['admin']}>
              <AdminAddPostPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/roles"
            element={
              // <ProtectedRoute allowedRoles={['admin']}>
              <RoleManagementPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/roles/create"
            element={
              // <ProtectedRoute allowedRoles={['admin']}>
              <CreateRolePage />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
