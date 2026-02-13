import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { AuthProvider } from '@/features/Auth/context/AuthContext';
import { PermissionProvider } from '@/features/Auth/context/PermissionContext';

function App() {
  return (
    <AuthProvider>
      <PermissionProvider>
        <RouterProvider router={router} />
      </PermissionProvider>
    </AuthProvider>
  );
}

export default App;
