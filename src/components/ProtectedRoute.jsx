import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-brand-gold font-black uppercase tracking-[0.5em]">Authenticating...</div>;

  // Si pas de user -> Redirection Login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si route Admin mais user n'est pas Admin -> Redirection Home
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;