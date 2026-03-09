import React from 'react';
import { Instagram, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-black border-t border-white/5 py-12 px-6 relative overflow-hidden">
      {/* Petit rappel de lueur rose en bas de page */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-pink/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="text-[10px] text-white/20 font-black tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} Xpress Braids by Phiphi — Harlem, NYC
        </div>
        
        <div className="flex gap-8">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/20 hover:text-brand-pink transition-all duration-300 hover:scale-110"
          >
            <Instagram size={18} />
          </a>
          <a 
            href="#" 
            className="text-white/20 hover:text-brand-pink transition-all duration-300 hover:scale-110"
          >
            <MapPin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;