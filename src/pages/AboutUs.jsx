import React from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-brand-cream min-h-screen pt-40 pb-20 px-6 bg-grain relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: Brand Story */}
        <div className="space-y-10 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-white shadow-sm">
            <Sparkles size={14} className="text-brand-gold" />
            <span className="text-[10px] font-black uppercase tracking-widest text-stone-900">Est. 2026 • NYC & Harlem</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-stone-900">
            More than <br /> a Style, <span className="text-brand-gold">A Legacy.</span>
          </h1>
          
          <p className="text-xl font-medium text-stone-600 leading-relaxed italic border-l-4 border-brand-gold pl-6">
            "Xpress-Braids isn't just a studio; it’s a sanctuary where ancestral artistry meets modern Manhattan elegance."
          </p>
          
          <div className="space-y-6 text-stone-500 leading-relaxed max-w-lg">
            <p>
              Founded by PHIPHI, our studio was born from a vision to redefine the braiding experience. We combine centuries-old techniques with the precision and pace of New York City life.
            </p>
            <p>
              Every crown we touch is treated as a masterpiece. We prioritize the health of your natural hair while delivering high-fashion results that turn heads from Harlem to Wall Street.
            </p>
          </div>
        </div>

        {/* Right: The Visionary Visual */}
        <div className="relative lg:pl-10">
          <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 group">
             {/* Replace with a professional photo of the stylist or studio work */}
            <img 
              src="https://images.unsplash.com/photo-1595476108010-b4d1f80d77d2?q=80&w=800" 
              alt="PHIPHI - Master Stylist" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent" />
          </div>
          
          {/* Floating Experience Badge */}
          <div className="absolute -bottom-10 -left-10 bg-brand-black text-white p-10 rounded-full shadow-2xl flex flex-col items-center animate-float">
            <span className="text-brand-gold font-black text-4xl">10+</span>
            <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Years Exp.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;