import React from 'react';
import { Instagram, MapPin, ArrowUpCircle, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-black pt-24 pb-12 px-6 relative overflow-hidden font-sans">
      {/* Design Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-pink/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-white/5 pb-16 items-start">
          
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
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-widest max-w-[280px] leading-relaxed italic">
              "Ancestral artistry meets modern elegance."
            </p>
          </div>

          {/* Location & Contact Details */}
          <div className="space-y-6">
            <p className="text-[9px] font-black text-brand-pink uppercase tracking-[0.3em]">Visit the Studio</p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <MapPin size={18} className="text-brand-pink shrink-0" />
                <a 
                  href="https://goo.gl/maps/votre-lien-maps-ici" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-white/60 uppercase tracking-wider leading-relaxed hover:text-white transition-colors"
                >
                  6495 New Hampshire Ave <br />
                  Hyattsville, MD 20783 <br />
                  <span className="text-brand-pink/80">Suite A35-2 • 3rd Floor</span>
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <Phone size={18} className="text-brand-pink shrink-0" />
                <a href="tel:+12028918463" className="text-[11px] font-bold text-white/60 uppercase tracking-widest hover:text-white transition-colors">
                  (202) 891-8463
                </a>
              </div>
            </div>
          </div>

          {/* Socials & Interaction */}
          <div className="flex flex-col md:items-end justify-between h-full gap-12">
            <div className="space-y-4 md:text-right">
              <p className="text-[9px] font-black text-brand-pink uppercase tracking-[0.3em]">Connect With Phiphi</p>
              <div className="flex md:justify-end gap-4">
                <a 
                  href="https://www.instagram.com/xpressbraidsbyphiphi?igsh=NHI0cGl3aGwybHF5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-brand-pink hover:border-brand-pink/50 hover:bg-brand-pink/5 transition-all duration-500 shadow-xl"
                >
                  <Instagram size={20} />
                </a>
                <button 
                  onClick={scrollToTop}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all duration-500"
                >
                  <ArrowUpCircle size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 md:justify-end">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest italic">Studio Status: Online & Booking</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
          <div className="text-[8px] text-white font-black tracking-[0.4em] uppercase">
            © {new Date().getFullYear()} XpressBraids — Designed for the Elite
          </div>
          
          <div className="flex gap-8 text-[8px] font-black uppercase tracking-widest text-white">
            <a href="#" className="hover:text-brand-pink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-pink transition-colors">Booking Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;