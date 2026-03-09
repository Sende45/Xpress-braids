import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, LayoutDashboard, Menu, X, ArrowUpRight } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-2xl border border-white/30 rounded-full px-6 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-2xl shadow-black/5 transition-all duration-500">
          
          {/* --- LOGO --- */}
          <Link to="/" className="flex flex-col leading-none z-50">
            <span className="text-lg md:text-xl font-black uppercase tracking-tighter italic">
              Xpress<span className="text-brand-gold">Braids</span>
            </span>
            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-black/40">Studio NYC</span>
          </Link>

          {/* --- NAVIGATION DESKTOP --- */}
          <nav className="hidden md:flex items-center gap-10">
            <Link to="/services" className="text-[10px] font-black uppercase tracking-widest hover:text-brand-gold transition-colors">Gallery</Link>
            <Link to="/booking" className="text-[10px] font-black uppercase tracking-widest hover:text-brand-gold transition-colors">Booking</Link>
            {user?.role === 'admin' ? (
              <Link to="/admin-control-center" className="text-[10px] font-black uppercase tracking-widest text-brand-gold flex items-center gap-2">
                <LayoutDashboard size={14} /> Admin
              </Link>
            ) : (
               <Link to="/services" className="text-[10px] font-black uppercase tracking-widest hover:text-brand-gold transition-colors">Styles</Link>
            )}
          </nav>

          {/* --- ACTIONS --- */}
          <div className="flex items-center gap-3 md:gap-4 z-50">
            {user ? (
              <div className="flex items-center gap-2 md:gap-4">
                <Link to="/profile" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-brand-cream border border-black/5 flex items-center justify-center hover:border-brand-gold transition-all">
                  <User size={16} className="text-brand-black" />
                </Link>
                <button onClick={logout} className="text-red-500/60 hover:text-red-500 transition-colors p-2">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 md:gap-4">
                <Link to="/login" className="hidden sm:block text-[10px] font-black uppercase tracking-widest hover:text-brand-gold transition-colors">Sign In</Link>
                <Link to="/booking" className="bg-brand-black text-white px-5 md:px-7 py-2.5 md:py-3.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold hover:scale-105 transition-all shadow-lg shadow-black/10 flex items-center gap-2">
                  <span>Book</span> <span className="hidden md:inline">Now</span> <ArrowUpRight size={12} />
                </Link>
              </div>
            )}

            {/* BTN MENU MOBILE */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-brand-black hover:bg-black/5 rounded-full transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* --- MENU MOBILE OVERLAY --- */}
        <div className={`fixed inset-0 bg-brand-cream z-[-1] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6 text-center">
            <Link onClick={() => setIsMenuOpen(false)} to="/services" className="text-4xl font-black uppercase italic tracking-tighter hover:text-brand-gold transition-colors">Gallery</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/booking" className="text-4xl font-black uppercase italic tracking-tighter hover:text-brand-gold transition-colors">Booking</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/login" className="text-4xl font-black uppercase italic tracking-tighter hover:text-brand-gold transition-colors">Sign In</Link>
            
            <div className="w-full h-[1px] bg-black/5 max-w-[100px] my-4" />
            
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">Studio NYC • Harlem</p>
          </div>
        </div>
      </header>
      
      {/* Spacer pour éviter que le Hero ne soit collé au Header */}
      <div className="h-20 md:hidden" /> 
    </>
  );
};

export default Header;