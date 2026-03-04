import React from 'react';
import { Instagram, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xs text-gray-400 font-medium tracking-widest uppercase">
          © {new Date().getFullYear()} Xpress Braids by Phiphi — Harlem, NYC
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors">
            <MapPin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;