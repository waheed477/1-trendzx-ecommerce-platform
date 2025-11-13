import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'user',
  fallback 
}) => {
  const { user, loading } = useAuth();
  const { addNotification } = useApp();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // User not authenticated
  if (!user) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // Redirect to login (you can replace this with actual routing)
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  // Check role if required
  if (requiredRole === 'admin' && user.role !== 'admin') {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    addNotification({
      type: 'error',
      message: 'Access denied. Admin privileges required.'
    });
    
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return null;
  }

  // User is authenticated and has required role
  return <>{children}</>;
};

export default ProtectedRoute;