import React from 'react';
import { Instagram, MapPin, ArrowUpCircle } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-black pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Éléments de design d'arrière-plan - Modern Art */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-pink/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 border-b border-white/5 pb-16">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <div className="flex flex-col leading-none">
              <span className="text-3xl font-black uppercase tracking-tighter italic text-white">
                Xpress<span className="text-brand-pink">Braids</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mt-2">
                The Luxury Standard
              </span>
            </div>
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-widest max-w-[280px] leading-relaxed">
              Crafting premium hair experiences in the heart of Harlem, New York.
            </p>
          </div>

          {/* Socials & Interaction */}
          <div className="flex flex-wrap gap-12 md:gap-20">
            <div className="space-y-4">
              <p className="text-[9px] font-black text-brand-pink uppercase tracking-[0.3em]">Follow The Art</p>
              <div className="flex gap-6">
                <a href="#" className="p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-brand-pink hover:border-brand-pink/50 hover:bg-brand-pink/5 transition-all duration-500">
                  <Instagram size={20} />
                </a>
                <a href="#" className="p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-brand-pink hover:border-brand-pink/50 hover:bg-brand-pink/5 transition-all duration-500">
                  <MapPin size={20} />
                </a>
              </div>
            </div>

            <button 
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-3 transition-all"
            >
              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] group-hover:text-white transition-colors">Back to top</p>
              <ArrowUpCircle size={32} className="text-white/10 group-hover:text-brand-pink group-hover:-translate-y-1 transition-all duration-500" strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[9px] text-white/20 font-black tracking-[0.4em] uppercase">
            © {new Date().getFullYear()} — Designed for the Elite
          </div>
          
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-white/20">
            <a href="#" className="hover:text-brand-pink transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-pink transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-pink transition-colors">Cookies</a>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Studio Status: Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;