import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Écran de chargement pendant la vérification du token/localStorage
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">
            Authenticating Experience...
          </span>
        </div>
      </div>
    );
  }

  // 1. Si aucun utilisateur n'est détecté
  if (!user) {
    // On redirige vers login en passant l'emplacement actuel dans le state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Si la route est réservée aux admins mais que le rôle ne correspond pas
  if (adminOnly && user.role !== 'admin') {
    console.warn("Accès refusé : Droits administrateur requis.");
    return <Navigate to="/" replace />;
  }

  // 3. Tout est en règle, on affiche le contenu protégé
  return children;
};

export default ProtectedRoute;