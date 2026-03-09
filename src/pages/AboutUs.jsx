import React from 'react';
import { Sparkles, Heart, Star, ShieldCheck, Zap } from 'lucide-react';

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
            Hello, this is <br /> your girl <span className="text-brand-pink">Phiphi.</span>
          </h1>
          
          <p className="text-xl font-medium text-white/80 leading-relaxed italic border-l-4 border-brand-pink pl-6">
            "I am a talented and versatile hair braider with experience in a variety of techniques, including cornrows, box braids, Senegalese twists, and crochet styles."
          </p>
          
          <div className="space-y-6 text-white/60 leading-relaxed max-w-lg font-medium">
            <p>
              I welcome all hair textures, serve all genders, and offer options for your budget. I focus on creating clean, polished results while ensuring comfort and style.
            </p>
            <p>
              With a keen sense of design, steady hands, and a client-first approach, I deliver looks that last and service you can trust.
            </p>
            <div className="pt-4 p-6 bg-white/5 rounded-2xl border border-white/10">
               <p className="text-brand-pink font-bold uppercase tracking-widest text-xs mb-2">Our Promise at Xpress Braids</p>
               <p className="text-white/80 italic">
                "We respect your time, care for your hair, and consider your budget—providing quick and flawless work that fits your lifestyle."
               </p>
            </div>
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
            <Zap size={24} className="mb-1" />
            <span className="text-white font-black text-2xl uppercase">Xpress</span>
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/80">Flawless</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;