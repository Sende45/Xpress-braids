import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, LayoutDashboard, Menu, X, ArrowUpRight, Home } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-4">
        {/* Container principal - Effet Dark Glass */}
        <div className="max-w-7xl mx-auto bg-brand-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-6 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500">
          
          {/* --- LOGO --- */}
          <Link to="/" onClick={closeMenu} className="flex flex-col leading-none z-50 group">
            <span className="text-lg md:text-xl font-black uppercase tracking-tighter italic text-white transition-colors group-hover:text-brand-pink">
              Xpress<span className="text-brand-pink group-hover:text-white">Braids</span>
            </span>
            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-white/40">Studio NYC</span>
          </Link>

          {/* --- NAVIGATION DESKTOP --- */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-brand-pink transition-colors">Home</Link>
            <Link to="/services" className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-brand-pink transition-colors">Gallery</Link>
            <Link to="/about" className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-brand-pink transition-colors">About</Link>
            <Link to="/booking" className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-brand-pink transition-colors">Booking</Link>
            {user?.role === 'admin' && (
              <Link to="/admin-control-center" className="text-[10px] font-black uppercase tracking-widest text-brand-pink flex items-center gap-2">
                <LayoutDashboard size={14} /> Admin
              </Link>
            )}
          </nav>

          {/* --- ACTIONS --- */}
          <div className="flex items-center gap-3 md:gap-4 z-50">
            {user ? (
              <div className="flex items-center gap-2 md:gap-4">
                <Link to="/profile" onClick={closeMenu} className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-brand-pink transition-all group">
                  <User size={16} className="text-white group-hover:text-brand-pink" />
                </Link>
                <button onClick={() => { logout(); closeMenu(); }} className="text-brand-pink/60 hover:text-brand-pink transition-colors p-2">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 md:gap-4">
                <Link to="/login" onClick={closeMenu} className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-brand-pink transition-colors">Sign In</Link>
                <Link to="/booking" onClick={closeMenu} className="bg-white text-brand-black px-5 md:px-7 py-2.5 md:py-3.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-brand-pink hover:text-white hover:scale-105 transition-all shadow-lg flex items-center gap-2">
                  <span>Book</span> <span className="hidden md:inline">Now</span> <ArrowUpRight size={12} />
                </Link>
              </div>
            )}

            {/* BTN MENU MOBILE */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/5 rounded-full transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* --- MENU MOBILE OVERLAY --- */}
        <div className={`fixed inset-0 bg-brand-black z-[-1] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] lg:hidden ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-pink/10 blur-[100px] rounded-full" />
          
          <div className="flex flex-col items-center justify-center h-full gap-6 px-6 text-center relative z-10">
            {/* Ajout du bouton Home pour Mobile */}
            <Link onClick={closeMenu} to="/" className="flex items-center gap-3 text-4xl font-black uppercase italic tracking-tighter text-white hover:text-brand-pink transition-colors">
              <Home size={28} className="text-brand-pink" /> Home
            </Link>
            
            <Link onClick={closeMenu} to="/services" className="text-4xl font-black uppercase italic tracking-tighter text-white hover:text-brand-pink transition-colors">Gallery</Link>
            <Link onClick={closeMenu} to="/about" className="text-4xl font-black uppercase italic tracking-tighter text-white hover:text-brand-pink transition-colors">About Us</Link>
            <Link onClick={closeMenu} to="/contact" className="text-4xl font-black uppercase italic tracking-tighter text-white hover:text-brand-pink transition-colors">Contact</Link>
            <Link onClick={closeMenu} to="/booking" className="text-4xl font-black uppercase italic tracking-tighter text-white hover:text-brand-pink transition-colors">Booking</Link>
            
            <div className="w-full h-[1px] bg-white/10 max-w-[100px] my-4" />
            
            {!user && (
                <Link onClick={closeMenu} to="/login" className="text-xl font-black uppercase tracking-widest text-brand-pink hover:text-white transition-colors">Sign In</Link>
            )}
            
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mt-4 italic">Studio NYC • Harlem</p>
          </div>
        </div>
      </header>
      
      {/* Spacer for mobile to prevent Hero overlap */}
      <div className="h-24 lg:hidden" /> 
    </>
  );
};

export default Header;