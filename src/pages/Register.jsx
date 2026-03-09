import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Sparkles, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const result = await register(formData);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Glow Effect Background */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-pink/10 blur-[120px] rounded-full" />
      
      <div className="max-w-xl w-full space-y-12 reveal relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-pink/30 bg-brand-pink/5 mb-4">
            <Sparkles size={12} className="text-brand-pink" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-pink">Join the Elite</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white">
            Create <br /> <span className="text-brand-pink">Account.</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            Secure your spot in our private studio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-brand-pink/10 border border-brand-pink/20 rounded-xl text-brand-pink animate-shake">
              <AlertCircle size={16} />
              <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-pink px-2">First Name</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="Jane"
                  className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-6 pl-14 rounded-2xl font-bold text-white outline-none focus:border-brand-pink transition-all placeholder:text-white/20"
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-pink px-2">Last Name</label>
              <input 
                type="text" 
                required
                placeholder="Doe"
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl font-bold text-white outline-none focus:border-brand-pink transition-all placeholder:text-white/20"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-pink px-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="email" 
                required
                placeholder="jane@studio.com"
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-6 pl-14 rounded-2xl font-bold text-white outline-none focus:border-brand-pink transition-all placeholder:text-white/20"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                onChange={(e) => setFormData({...formData, password: e.target.value})}
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
            disabled={isSubmitting}
            className="w-full bg-white text-brand-black py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-brand-pink hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,45,120,0.2)] group disabled:opacity-50"
          >
            <div className="flex items-center justify-center gap-3">
              {isSubmitting ? "Processing..." : "Create Account"}
              {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </div>
          </button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
            Already have a profile? <Link to="/login" className="text-brand-pink underline underline-offset-4">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;