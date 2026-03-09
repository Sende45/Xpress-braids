import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Zap, ShieldCheck, ArrowRight, ArrowUpRight, Play, Heart, Sparkles } from 'lucide-react';

// Importation de tes assets locaux
import braidsHero from '../assets/braids2.png';
import braids1 from '../assets/braids1.png';
import braids3 from '../assets/braids3.png';

const Home = () => {
  return (
    <div className="bg-brand-cream overflow-hidden bg-grain relative">
      {/* --- DÉCORATIONS FLOTTANTES --- */}
      <div className="absolute top-32 left-[8%] text-brand-gold/20 animate-float pointer-events-none hidden lg:block">
        <Heart size={40} fill="currentColor" />
      </div>
      <div className="absolute top-[60%] right-[10%] text-brand-black/5 animate-pulse pointer-events-none hidden lg:block">
        <Star size={100} fill="currentColor" />
      </div>

      {/* --- SECTION HERO --- */}
      <section className="relative min-h-screen flex items-center px-6 pt-24 lg:pt-20">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-brand-gold/30 rounded-full blur-[100px] animate-pulse pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 lg:space-y-12 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/50 shadow-xl shadow-brand-gold/10 text-stone-900">
              <Sparkles size={16} className="text-brand-gold animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">NY's Finest Braid Experience • Harlem</span>
            </div>

            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-black leading-[0.85] tracking-tighter uppercase italic text-stone-900">
              Your <br /><span className="stroke-text">Crown</span> <br /><span className="text-brand-gold relative">Our Art.</span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-lg lg:text-2xl font-medium text-brand-black/70 leading-relaxed italic">
              Experience the exclusivity of the <span className="text-brand-black font-black">"PhiPhi Glow"</span>. Where ancestral artistry meets <span className="underline decoration-brand-gold decoration-4 underline-offset-4 text-stone-900">Manhattan elegance</span>.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <Link to="/booking" className="group relative bg-brand-black text-white px-10 lg:px-14 py-6 lg:py-8 rounded-[2rem] overflow-hidden transition-all duration-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 w-full sm:w-auto text-center">
                <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <div className="relative flex items-center justify-center gap-4">
                  <span className="font-black uppercase tracking-widest text-sm">Elevate Your Style</span>
                  <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative z-20 w-full">
            <div className="relative aspect-[4/5] w-full rounded-[4rem] p-3 bg-white/40 backdrop-blur-md border border-white/60 shadow-2xl transition-transform duration-1000 hover:-rotate-2 group">
              <div className="w-full h-full rounded-[3.2rem] overflow-hidden relative">
                <img src={braidsHero} alt="PhiPhi Braid Art" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION LIFESTYLE (FOCUS SUR BRAIDS 1 & 3) --- */}
      <section className="py-32 lg:py-48 px-6 bg-brand-cream relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-brand-gold/10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 lg:pr-20 z-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 text-brand-gold">
              <Sparkles size={24} />
              <span className="text-xs font-black uppercase tracking-[0.3em]">The Studio Experience</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-none text-stone-900">
              More than <br /> <span className="text-brand-gold">just a braid.</span>
            </h2>
            <p className="text-lg lg:text-xl font-medium text-brand-black/60 leading-relaxed italic">
              "Every strand is a story of power, culture, and precision. Step into our sanctuary and leave with a masterpiece."
            </p>
            <Link to="/services" className="inline-flex items-center gap-6 group">
              <span className="text-sm font-black uppercase tracking-widest border-b-2 border-brand-gold pb-2 group-hover:text-brand-gold transition-colors text-stone-900">Explore our full menu</span>
              <div className="w-12 h-12 rounded-full bg-brand-black text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-500">
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>

          <div className="relative grid grid-cols-2 gap-8 h-full items-center">
            {/* Carte 1 - Braids 1 ($200) */}
            <div className="relative group aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden shadow-2xl rotate-[-4deg] transition-all hover:rotate-0 duration-500">
              <img src={braids1} className="w-full h-full object-cover" alt="Braids Style 1" />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-black/5">
                  <span className="text-xs font-black text-black">$200</span>
              </div>
              <div className="absolute bottom-6 left-6">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">Signature</span>
              </div>
            </div>

            {/* Carte 2 - Braids 3 ($120) */}
            <div className="relative group aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden shadow-2xl rotate-[4deg] transition-all hover:rotate-0 duration-500 mt-12">
              <img src={braids3} className="w-full h-full object-cover" alt="Braids Style 3" />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-black/5">
                  <span className="text-xs font-black text-black">$120</span>
              </div>
              <div className="absolute bottom-6 left-6">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">Trending</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION FEATURES --- */}
      <section className="py-24 lg:py-40 bg-brand-black text-white px-6 rounded-t-[4rem] lg:rounded-t-[8rem] -mt-24 relative z-30 shadow-[0_-30px_60px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center">
            <h2 className="text-5xl lg:text-8xl font-black uppercase italic tracking-tighter"><span className="text-brand-gold">Why</span> choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              { icon: <Zap />, title: "Quick Slay", desc: "Premium quality without the wait." },
              { icon: <ShieldCheck />, title: "Edge Care", desc: "Gentle & safe for your hair health." },
              { icon: <Heart />, title: "Vibe Match", desc: "Luxury Harlem studio atmosphere." }
            ].map((feat, i) => (
              <div key={i} className="group text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-white/5 rounded-[2rem] flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                  {React.cloneElement(feat.icon, { size: 40 })}
                </div>
                <h3 className="text-2xl font-black uppercase italic">{feat.title}</h3>
                <p className="text-gray-400 text-sm lg:text-lg">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-24 lg:py-40 px-6 bg-brand-cream text-center relative z-10 border-t border-brand-black/5">
        <div className="max-w-4xl mx-auto space-y-16">
          <h2 className="text-6xl md:text-9xl lg:text-[120px] font-black uppercase italic tracking-tighter leading-none mb-12 text-stone-900">
            Get <span className="text-brand-gold relative">Braided. <Sparkles size={32} className="absolute -top-8 -right-8 text-brand-gold/30" /></span>
          </h2>
          <Link to="/booking" className="inline-flex flex-col items-center gap-6 group">
            <div className="h-28 w-28 lg:h-36 lg:w-36 rounded-full border-2 border-brand-black/10 flex items-center justify-center group-hover:bg-brand-black group-hover:text-white transition-all duration-700 group-hover:scale-110 shadow-2xl">
              <ArrowRight size={48} className="group-hover:translate-x-2 transition-transform" />
            </div>
            <span className="text-2xl lg:text-3xl font-black uppercase italic tracking-[0.2em] underline decoration-brand-gold decoration-8 underline-offset-[12px] text-stone-900">Check our spots</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;