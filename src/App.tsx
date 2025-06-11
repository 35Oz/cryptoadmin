import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/\" replace />} />
      <Route path="/" element={<Layout />}>
        <Route index element={
          <ProtectedRoute permission="dashboard.view">
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="users" element={
          <ProtectedRoute permission="users.view">
            <Users />
          </ProtectedRoute>
        } />
        <Route path="analytics" element={
          <ProtectedRoute permission="analytics.view">
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="transactions" element={
          <ProtectedRoute permission="transactions.view">
            <Transactions />
          </ProtectedRoute>
        } />
        <Route path="settings" element={
          <ProtectedRoute permission="settings.view">
            <Settings />
          </ProtectedRoute>
        } />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;