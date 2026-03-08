import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérification au chargement
  useEffect(() => {
    const savedUser = localStorage.getItem('phi_user');
    const token = localStorage.getItem('phi_token');

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erreur de lecture du localStorage", error);
        logout(); // En cas d'erreur, on nettoie tout
      }
    }
    setLoading(false);
  }, []);

  // --- INSCRIPTION ---
  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
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
      return { success: false, message: "Le serveur ne répond pas." };
    }
  };

  // --- CONNEXION ---
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
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

  // --- UTILITAIRES ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem('phi_user');
    localStorage.removeItem('phi_token');
  };

  // Vérifie si l'utilisateur est admin (utile pour le Dashboard Admin)
  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading, 
      isAdmin, // Nouveau
      token: localStorage.getItem('phi_token') // Pratique pour tes futurs appels API
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);