import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false); // État de chargement
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // On récupère la page d'où vient l'utilisateur (ou on va sur le profile par défaut)
  const from = location.state?.from?.pathname || "/profile";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    const result = await login(email, password);

    if (result.success) {
      // Redirection vers la page demandée initialement
      navigate(from, { replace: true });
    } else {
      setError(result.message);
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream bg-grain flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full space-y-12 reveal">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter">
            Welcome <br /> <span className="text-brand-gold">Back.</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-black/40">
            Access your private studio dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Message d'erreur élégant */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 animate-shake">
              <AlertCircle size={16} />
              <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-gold px-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
              <input 
                type="email" 
                required
                placeholder="studio@phi.com"
                className="w-full bg-white/40 backdrop-blur-md border border-white/20 p-6 pl-14 rounded-2xl font-bold outline-none focus:border-brand-gold transition-all"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-gold px-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="••••••••"
                className="w-full bg-white/40 backdrop-blur-md border border-white/20 p-6 pl-14 pr-14 rounded-2xl font-bold outline-none focus:border-brand-gold transition-all"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-black/20 hover:text-brand-gold transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            disabled={isLoggingIn}
            className="w-full bg-brand-black text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-brand-gold hover:text-brand-black transition-all duration-500 shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? "Entering Studio..." : "Sign In to Experience"}
          </button>
        </form>

        <p className="text-center text-[10px] font-black uppercase tracking-widest text-brand-black/40">
          New to the studio? <Link to="/register" className="text-brand-gold underline underline-offset-4">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;