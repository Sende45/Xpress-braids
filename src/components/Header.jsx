import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, LayoutDashboard, Menu, X, ArrowUpRight, Sparkles, Image as ImageIcon } from 'lucide-react';

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

  // Composant interne pour les liens de navigation (DRY principle)
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
          ? 'bg-brand-black/90 backdrop-blur-xl border-white/10 py-3 shadow-2xl' 
          : 'bg-brand-black/40 backdrop-blur-md border-white/5 py-4'
        }`}>
          
          {/* LOGO */}
          <Link to="/" onClick={closeMenu} className="group">
            <span className="text-lg md:text-xl font-black uppercase tracking-tighter italic text-white">
              Xpress<span className="text-brand-pink">Braids</span>
            </span>
          </Link>

          {/* DESKTOP NAV - Gallery ET Style Menu sont là */}
          <nav className="hidden lg:flex items-center gap-10">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/gallery" icon={ImageIcon}>Gallery</NavLink>
            <NavLink to="/services" icon={Sparkles}>Style Menu</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/booking">Booking</NavLink>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                {user.role === 'admin' && (
                  <Link to="/admin-control-center" className="text-brand-pink hover:scale-110 transition-transform">
                    <LayoutDashboard size={18} />
                  </Link>
                )}
                <Link to="/profile" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-pink transition-all">
                  <User size={14} className="text-white" />
                </Link>
                <button onClick={logout} className="p-2 text-white/40 hover:text-brand-pink">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white">Sign In</Link>
                <Link to="/booking" className="bg-brand-pink text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,45,120,0.5)] transition-all flex items-center gap-2">
                  <span>Book Now</span> <ArrowUpRight size={14} />
                </Link>
              </div>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`fixed inset-0 bg-brand-black/98 backdrop-blur-2xl z-[-1] transition-all duration-500 flex flex-col items-center justify-center gap-6 lg:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/services">Style Menu</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/booking">Booking</NavLink>
          <div className="h-px w-12 bg-white/10 my-4" />
          {!user && <Link onClick={closeMenu} to="/login" className="text-brand-pink font-black uppercase tracking-widest">Sign In</Link>}
        </div>
      </header>
      <div className="h-20 lg:hidden" />
    </>
  );
};

export default Header;