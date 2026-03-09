import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/profile";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    const result = await login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
      setIsLoggingIn(false);
    }
  };

  return (
    // Fond passé en brand-black, retrait de bg-grain pour un look plus "sleek"
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Halo rose discret en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-pink/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full space-y-12 reveal relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">
            Welcome <br /> <span className="text-brand-pink">Back.</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            Access your private studio dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-brand-pink/10 border border-brand-pink/20 rounded-xl text-brand-pink animate-shake">
              <AlertCircle size={16} />
              <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-pink px-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="email" 
                required
                placeholder="studio@phi.com"
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-6 pl-14 rounded-2xl font-bold text-white outline-none focus:border-brand-pink transition-all placeholder:text-white/20"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-pink px-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="••••••••"
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-6 pl-14 pr-14 rounded-2xl font-bold text-white outline-none focus:border-brand-pink transition-all placeholder:text-white/20"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-brand-pink transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            disabled={isLoggingIn}
            className="w-full bg-white text-brand-black py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-brand-pink hover:text-white transition-all duration-500 shadow-2xl active:scale-[0.98] disabled:opacity-50"
          >
            {isLoggingIn ? "Entering Studio..." : "Sign In to Experience"}
          </button>
        </form>

        <p className="text-center text-[10px] font-black uppercase tracking-widest text-white/40">
          New to the studio? <Link to="/register" className="text-brand-pink underline underline-offset-4">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;