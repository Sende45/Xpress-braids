import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
    navigate('/'); // Redirect to home after signup
  };

  return (
    <div className="min-h-screen bg-brand-cream bg-grain flex items-center justify-center px-6 py-24">
      <div className="max-w-xl w-full space-y-12 reveal">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 mb-4">
            <Sparkles size={12} className="text-brand-gold" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Join the Elite</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
            Create <br /> <span className="text-brand-gold">Account.</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-black/40">
            Secure your spot in our private NYC studio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-gold px-2">First Name</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="Jane"
                  className="w-full bg-white/40 backdrop-blur-md border border-white/20 p-6 pl-14 rounded-2xl font-bold outline-none focus:border-brand-gold transition-all"
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-gold px-2">Last Name</label>
              <input 
                type="text" 
                required
                placeholder="Doe"
                className="w-full bg-white/40 backdrop-blur-md border border-white/20 p-6 rounded-2xl font-bold outline-none focus:border-brand-gold transition-all"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-gold px-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
              <input 
                type="email" 
                required
                placeholder="jane@nyc.com"
                className="w-full bg-white/40 backdrop-blur-md border border-white/20 p-6 pl-14 rounded-2xl font-bold outline-none focus:border-brand-gold transition-all"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                placeholder="••••••••"
                className="w-full bg-white/40 backdrop-blur-md border border-white/20 p-6 pl-14 rounded-2xl font-bold outline-none focus:border-brand-gold transition-all"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button className="w-full bg-brand-black text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-brand-gold hover:text-brand-black transition-all duration-500 shadow-2xl group">
            <div className="flex items-center justify-center gap-3">
              Create Account
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">
            Already have a profile? <Link to="/login" className="text-brand-gold underline underline-offset-4">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;