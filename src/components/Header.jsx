import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 flex items-center justify-between shadow-lg shadow-black/5">
        
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="text-xl font-black uppercase tracking-tighter italic">Xpress<span className="text-brand-gold">Braids</span></span>
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-black/40">Studio NYC</span>
        </Link>

        {/* Navigation Centrale */}
        <nav className="hidden md:flex items-center gap-10">
          <Link to="/services" className="text-[10px] font-black uppercase tracking-widest hover:text-brand-gold transition-colors">Gallery</Link>
          <Link to="/booking" className="text-[10px] font-black uppercase tracking-widest hover:text-brand-gold transition-colors">Booking</Link>
          <Link to="/studio" className="text-[10px] font-black uppercase tracking-widest hover:text-brand-gold transition-colors">Studio</Link>
        </nav>

        {/* Actions : Login / Profile */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/profile" 
                className="w-10 h-10 rounded-full bg-brand-cream border border-black/5 flex items-center justify-center hover:border-brand-gold transition-all"
              >
                <User size={18} className="text-brand-black" />
              </Link>
              <button onClick={logout} className="text-[10px] font-black uppercase tracking-widest text-red-500 opacity-60 hover:opacity-100">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-[10px] font-black uppercase tracking-widest hover:text-brand-gold transition-colors">
                Sign In
              </Link>
              <Link 
                to="/booking" 
                className="bg-brand-black text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-black transition-all"
              >
                Book Now ↗
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;