import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, LayoutDashboard, Menu, X, ArrowUpRight, Home, Sparkles } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Pour l'UX : savoir où on est

  const closeMenu = () => setIsMenuOpen(false);

  // UX : Gestion du scroll pour un header dynamique
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // UX Helper : Style pour le lien actif
  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children, icon: Icon }) => (
    <Link 
      to={to} 
      onClick={closeMenu}
      className={`relative flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
        isActive(to) ? 'text-brand-pink' : 'text-white/70 hover:text-white'
      }`}
    >
      {Icon && <Icon size={12} className={isActive(to) ? 'text-brand-pink' : 'text-brand-pink/50'} />}
      {children}
      {/* UX : Indicateur visuel de page active */}
      {isActive(to) && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-pink rounded-full shadow-[0_0_5px_#ff2d78]" />
      )}
    </Link>
  );

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 transition-all duration-500 ${
          isScrolled ? 'py-2 md:py-3' : 'py-4 md:py-6'
        }`}
      >
        <div className={`max-w-7xl mx-auto transition-all duration-500 rounded-full px-6 md:px-8 flex items-center justify-between border ${
          isScrolled 
          ? 'bg-brand-black/80 backdrop-blur-xl border-white/10 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]' 
          : 'bg-brand-black/40 backdrop-blur-md border-white/5 py-4'
        }`}>
          
          {/* LOGO */}
          <Link to="/" onClick={closeMenu} className="group">
            <span className="text-lg md:text-xl font-black uppercase tracking-tighter italic text-white transition-all">
              Xpress<span className="text-brand-pink">Braids</span>
            </span>
            <div className="flex items-center gap-1 opacity-40">
              <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white">Maryland Studio</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-10">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/services" icon={Sparkles}>Style Menu</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/booking">Booking</NavLink>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 bg-white/5 rounded-full p-1 pr-4 border border-white/10">
                <Link to="/profile" className="w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center border border-brand-pink/30 hover:bg-brand-pink transition-all">
                  <User size={14} className="text-white" />
                </Link>
                <button onClick={logout} className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-brand-pink transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link to="/login" className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-brand-pink transition-all">Sign In</Link>
                <Link to="/booking" className="bg-brand-pink text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,45,120,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                  <span>Book Now</span> <ArrowUpRight size={14} />
                </Link>
              </div>
            )}

            {/* MOBILE TOGGLE */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`fixed inset-0 bg-brand-black/98 backdrop-blur-2xl z-[-1] transition-all duration-500 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <Link onClick={closeMenu} to="/" className={`text-4xl font-black italic uppercase ${isActive('/') ? 'text-brand-pink' : 'text-white'}`}>Home</Link>
            <Link onClick={closeMenu} to="/services" className={`text-4xl font-black italic uppercase ${isActive('/services') ? 'text-brand-pink' : 'text-white'}`}>Style Menu</Link>
            <Link onClick={closeMenu} to="/about" className={`text-4xl font-black italic uppercase ${isActive('/about') ? 'text-brand-pink' : 'text-white'}`}>About Us</Link>
            <Link onClick={closeMenu} to="/booking" className={`text-4xl font-black italic uppercase ${isActive('/booking') ? 'text-brand-pink' : 'text-white'}`}>Booking</Link>
            
            <div className="mt-8 flex gap-4">
               {!user && <Link onClick={closeMenu} to="/login" className="text-brand-pink font-black uppercase tracking-[0.2em]">Sign In</Link>}
            </div>
          </div>
        </div>
      </header>
      <div className="h-20 lg:hidden" />
    </>
  );
};

export default Header;