import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
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
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-gold px-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
              <input 
                type="email" 
                required
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
                type="password" 
                required
                className="w-full bg-white/40 backdrop-blur-md border border-white/20 p-6 pl-14 rounded-2xl font-bold outline-none focus:border-brand-gold transition-all"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="w-full bg-brand-black text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-brand-gold hover:text-brand-black transition-all duration-500 shadow-2xl">
            Sign In to Experience
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