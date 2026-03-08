import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext();

// Utilisation dynamique de l'URL :
// 1. Cherche la variable VITE_API_URL définie sur Vercel
// 2. Si absente (en local), utilise localhost:5000
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('phi_user');
    localStorage.removeItem('phi_token');
  }, []);

  useEffect(() => {
    const initAuth = () => {
      const savedUser = localStorage.getItem('phi_user');
      const token = localStorage.getItem('phi_token');

      if (savedUser && token) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Erreur de lecture du localStorage", error);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [logout]);

  const register = async (userData) => {
    try {
      // Nettoyage de l'URL pour éviter les doubles slashs //
      const url = `${API_BASE_URL.replace(/\/$/, "")}/register`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('phi_token', data.token);
        localStorage.setItem('phi_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message || "Erreur lors de l'inscription" };
      }
    } catch (error) {
      console.error("Erreur Register:", error);
      return { success: false, message: "Le serveur ne répond pas. Vérifiez votre connexion." };
    }
  };

  const login = async (email, password) => {
    try {
      const url = `${API_BASE_URL.replace(/\/$/, "")}/login`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('phi_token', data.token);
        localStorage.setItem('phi_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message || "Identifiants incorrects" };
      }
    } catch (error) {
      console.error("Erreur Login:", error);
      return { success: false, message: "Erreur réseau ou serveur injoignable." };
    }
  };

  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      isAdmin,
      token: localStorage.getItem('phi_token')
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);