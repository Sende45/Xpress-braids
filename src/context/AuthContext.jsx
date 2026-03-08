import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext();

// Remplace par l'URL de ton backend une fois déployé
const API_URL = "http://localhost:5000/api/auth"; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Utilisation de useCallback pour éviter des boucles infinies si utilisé dans useEffect
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('phi_user');
    localStorage.removeItem('phi_token');
  }, []);

  useEffect(() => {
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
  }, [logout]);

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
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
      return { success: false, message: "Impossible de contacter le serveur local." };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
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
      return { success: false, message: "Erreur réseau." };
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