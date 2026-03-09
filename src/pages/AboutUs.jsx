import React from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-brand-black min-h-screen pt-40 pb-20 px-6 relative overflow-hidden">
      {/* Pink Glow Accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-pink/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-brand-pink/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Left: Brand Story */}
        <div className="space-y-10 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-pink/30 bg-white/5 backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-brand-pink" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Est. 2026 • Maryland</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-white">
            More than <br /> a Style, <span className="text-brand-pink">A Legacy.</span>
          </h1>
          
          <p className="text-xl font-medium text-white/80 leading-relaxed italic border-l-4 border-brand-pink pl-6">
            "Xpress-Braids isn't just a studio; it’s a sanctuary where ancestral artistry meets modern Manhattan elegance."
          </p>
          
          <div className="space-y-6 text-white/40 leading-relaxed max-w-lg font-medium">
            <p>
              Founded by PHIPHI, our studio was born from a vision to redefine the braiding experience. We combine centuries-old techniques with the precision and pace of Maryland life.
            </p>
            <p>
              Every crown we touch is treated as a masterpiece. We prioritize the health of your natural hair while delivering high-fashion results that turn heads from Harlem to Wall Street.
            </p>
          </div>
        </div>

        {/* Right: The Visionary Visual */}
        <div className="relative lg:pl-10">
          <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 group border border-white/10 group-hover:border-brand-pink/50">
            <img 
              src="https://images.unsplash.com/photo-1595476108010-b4d1f80d77d2?q=80&w=800" 
              alt="PHIPHI - Master Stylist" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
          </div>
          
          {/* Floating Experience Badge - Rose & Noir */}
          <div className="absolute -bottom-10 -left-10 bg-brand-pink text-white p-10 rounded-full shadow-[0_0_50px_rgba(255,45,120,0.3)] flex flex-col items-center animate-float border-4 border-brand-black">
            <span className="text-white font-black text-4xl">10+</span>
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/80">Years Exp.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;