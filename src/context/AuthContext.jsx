import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au chargement, on vérifie si un utilisateur est déjà stocké
  useEffect(() => {
    const savedUser = localStorage.getItem('phi_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erreur de lecture du localStorage", error);
      }
    }
    setLoading(false);
  }, []);

  // Inscription (À adapter sur le même modèle que login plus tard)
  const register = async (userData) => {
    console.log("Registering to Database...", userData);
    setUser(userData);
    localStorage.setItem('phi_user', JSON.stringify(userData));
  };

  // --- TON NOUVEAU LOGIN RÉEL ---
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
        // On stocke le token ET les infos utilisateur
        localStorage.setItem('phi_token', data.token); 
        localStorage.setItem('phi_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        // On renvoie l'erreur du serveur (ex: "Mot de passe incorrect")
        return { success: false, message: data.message || "Erreur de connexion" };
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      return { success: false, message: "Le serveur ne répond pas." };
    }
  };

  const syncUser = (userData) => {
    setUser(userData);
    localStorage.setItem('phi_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('phi_user');
    localStorage.removeItem('phi_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, syncUser, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);