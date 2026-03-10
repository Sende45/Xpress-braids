import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, LogOut, LayoutDashboard, Menu, X, 
  ArrowUpRight, Sparkles, Image as ImageIcon, 
  ShieldCheck, ChevronRight 
} from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children, icon: Icon, admin }) => (
    <Link 
      to={to} 
      onClick={closeMenu}
      className={`relative flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
        isActive(to) 
        ? (admin ? 'text-pink-500' : 'text-brand-pink') 
        : 'text-white/70 hover:text-white'
      }`}
    >
      {Icon && <Icon size={12} className={isActive(to) ? (admin ? 'text-pink-500' : 'text-brand-pink') : 'text-brand-pink/50'} />}
      {children}
      {isActive(to) && (
        <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full shadow-[0_0_5px_#ff2d78] ${admin ? 'bg-pink-500' : 'bg-brand-pink'}`} />
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
          ? 'bg-brand-black/95 backdrop-blur-xl border-white/10 py-3 shadow-2xl' 
          : 'bg-brand-black/40 backdrop-blur-md border-white/5 py-4'
        }`}>
          
          {/* LOGO */}
          <Link to="/" onClick={closeMenu} className="group shrink-0">
            <span className="text-lg md:text-xl font-black uppercase tracking-tighter italic text-white transition-all group-hover:text-brand-pink">
              Xpress<span className="text-brand-pink group-hover:text-white">Braids</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-10">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/gallery" icon={ImageIcon}>Gallery</NavLink>
            <NavLink to="/services" icon={Sparkles}>Style Menu</NavLink>
            {user?.role === 'admin' && (
              <NavLink to="/admin-control-center" icon={ShieldCheck} admin={true}>Control Center</NavLink>
            )}
            <NavLink to="/about">About</NavLink>
          </nav>

          {/* ACTIONS & PROFILE */}
          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <div className="flex items-center gap-2 md:gap-4">
                {/* Mobile Admin Icon (Discret mais présent header fermé) */}
                {user.role === 'admin' && (
                  <Link to="/admin-control-center" className="lg:hidden w-8 h-8 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-500 animate-pulse">
                    <ShieldCheck size={16} />
                  </Link>
                )}
                <Link to="/profile" className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all ${user.role === 'admin' ? 'border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'border-white/10 hover:border-brand-pink'}`}>
                  <User size={16} className={user.role === 'admin' ? 'text-pink-500' : 'text-white'} />
                </Link>
                <button onClick={logout} className="p-2 text-white/20 hover:text-brand-pink transition-colors">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 md:gap-4">
                <Link to="/login" className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white">Sign In</Link>
                <Link to="/booking" className="bg-brand-pink text-white px-5 md:px-7 py-2.5 md:py-3.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 border border-brand-pink">
                  <span>Book</span> <ArrowUpRight size={12} />
                </Link>
              </div>
            )}

            {/* TOGGLE MOBILE */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2 text-white bg-white/5 rounded-full border border-white/5 ml-1"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU OVERLAY (Optimisé iPhone) --- */}
        <div className={`fixed inset-0 bg-brand-black z-[-1] transition-all duration-500 flex flex-col items-center justify-center px-8 lg:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
          
          {/* Admin Hero Access (Uniquement pour toi) */}
          {user?.role === 'admin' && (
            <Link 
              onClick={closeMenu} 
              to="/admin-control-center" 
              className="w-full mb-10 p-6 rounded-[2rem] bg-pink-500/10 border border-pink-500/30 flex items-center justify-between group active:scale-95 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-500 rounded-2xl text-white shadow-lg shadow-pink-500/40">
                  <LayoutDashboard size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-1">Privileged Access</p>
                  <p className="text-xl font-black text-white uppercase italic">Control Center</p>
                </div>
              </div>
              <ChevronRight className="text-pink-500" />
            </Link>
          )}

          <nav className="flex flex-col items-center gap-8">
            <Link onClick={closeMenu} to="/" className={`text-4xl font-black italic uppercase ${isActive('/') ? 'text-brand-pink' : 'text-white'}`}>Home</Link>
            <Link onClick={closeMenu} to="/gallery" className={`text-4xl font-black italic uppercase ${isActive('/gallery') ? 'text-brand-pink' : 'text-white'}`}>Gallery</Link>
            <Link onClick={closeMenu} to="/services" className={`text-4xl font-black italic uppercase ${isActive('/services') ? 'text-brand-pink' : 'text-white'}`}>Style Menu</Link>
            <Link onClick={closeMenu} to="/about" className={`text-4xl font-black italic uppercase ${isActive('/about') ? 'text-brand-pink' : 'text-white'}`}>About Us</Link>
            <Link onClick={closeMenu} to="/booking" className="mt-4 bg-white text-black px-10 py-5 rounded-full font-black uppercase italic tracking-widest text-sm active:scale-95 transition-all">Book Now</Link>
          </nav>

          <div className="absolute bottom-12 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
            XpressBraids • Master System
          </div>
        </div>
      </header>
      <div className="h-20 lg:hidden" />
    </>
  );
};

export default Header;