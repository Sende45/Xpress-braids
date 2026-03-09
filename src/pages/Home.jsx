import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Zap, ShieldCheck, ArrowRight, ArrowUpRight, Play, Heart, Sparkles } from 'lucide-react';

// Importation de ton image locale
import braidsImg from '../assets/braids2.png';

const Home = () => {
  return (
    <div className="bg-brand-cream overflow-hidden bg-grain relative">
      {/* --- ELEMENTS DE DECO FLOTTANTS (CUTE & FEMININE) --- */}
      <div className="absolute top-32 left-[8%] text-brand-gold/20 animate-float pointer-events-none hidden lg:block">
        <Heart size={40} fill="currentColor" />
      </div>
      <div className="absolute top-[60%] right-[10%] text-brand-black/5 animate-pulse pointer-events-none hidden lg:block">
        <Star size={100} fill="currentColor" />
      </div>

      {/* --- MODERN HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center px-6 pt-24 lg:pt-20">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-brand-gold/30 rounded-full blur-[100px] lg:blur-[150px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-brand-black/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text: Left Column */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-12 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/50 shadow-xl shadow-brand-gold/10">
              <Sparkles size={16} className="text-brand-gold animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-black/80">
                NY's Finest Braid Experience • Harlem
              </span>
            </div>

            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-black leading-[0.85] tracking-tighter uppercase italic text-stone-900">
              Your <br />
              <span className="stroke-text">Crown</span> <br />
              <span className="text-brand-gold relative">
                Our Art.
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-brand-black/5 rounded-full" />
              </span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-lg lg:text-2xl font-medium text-brand-black/70 leading-relaxed italic">
              Experience the exclusivity of the <span className="text-brand-black font-black">"PhiPhi Glow"</span>. Where ancestral artistry meets <span className="underline decoration-brand-gold decoration-4 underline-offset-4">Manhattan elegance</span>.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <Link 
                to="/booking" 
                className="group relative bg-brand-black text-white px-10 lg:px-14 py-6 lg:py-8 rounded-[2rem] overflow-hidden transition-all duration-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 w-full sm:w-auto text-center"
              >
                <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
                <div className="relative flex items-center justify-center gap-4">
                  <span className="font-black uppercase tracking-widest text-sm">Elevate Your Style</span>
                  <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </Link>
              
              <button className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold transition-all duration-500 shadow-lg">
                  <Play size={18} fill="currentColor" className="text-brand-gold group-hover:text-white ml-1" />
                </div>
                <span className="font-black uppercase tracking-[0.2em] text-[10px] text-brand-black/80">The Process</span>
              </button>
            </div>
          </div>

          {/* Image: Right Column */}
          <div className="lg:col-span-5 relative z-20 w-full">
            <div className="relative aspect-[4/5] w-full rounded-[4rem] lg:rounded-[6rem] p-3 lg:p-4 bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_40px_100px_rgba(0,0,0,0.15)] transition-transform duration-1000 hover:-rotate-2 group">
              <div className="w-full h-full rounded-[3.2rem] lg:rounded-[5.2rem] overflow-hidden relative">
                <img src={braidsImg} alt="PhiPhi Braid Art" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="absolute -top-4 -right-4 bg-brand-gold text-white font-black py-4 px-6 rounded-3xl text-xs uppercase tracking-tighter shadow-xl animate-float">
                ✨ Trending Style
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 lg:py-40 bg-brand-black text-white px-6 rounded-t-[4rem] lg:rounded-t-[8rem] -mt-24 relative z-30 shadow-[0_-30px_60px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl lg:text-8xl font-black uppercase italic tracking-tighter">
              <span className="text-brand-gold relative">Why</span> choose Us?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              { icon: <Zap />, title: "Quick Slay", desc: "Premium quality without the 10-hour wait." },
              { icon: <ShieldCheck />, title: "Edge Care", desc: "We love your hair as much as you do. Gentle & safe." },
              { icon: <Heart />, title: "Vibe Match", desc: "A cozy studio vibe that feels like home, but luxury." }
            ].map((feat, i) => (
              <div key={i} className="group text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-white/5 rounded-[2rem] flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                  {React.cloneElement(feat.icon, { size: 40 })}
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tight">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm lg:text-lg">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LIFESTYLE & TRANSITION TO SERVICES (LA NOUVELLE MODIF) --- */}
      <section className="py-32 lg:py-48 px-6 bg-brand-cream relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-brand-gold/10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 lg:pr-20 z-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 text-brand-gold">
              <Sparkles size={24} />
              <span className="text-xs font-black uppercase tracking-[0.3em]">The Studio Experience</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-none">
              More than <br /> 
              <span className="text-brand-gold">just a braid.</span>
            </h2>
            <p className="text-lg lg:text-xl font-medium text-brand-black/60 leading-relaxed italic">
              "Every strand is a story of power, culture, and precision. Step into our sanctuary and leave with a masterpiece that reflects your inner queen."
            </p>
            <Link to="/services" className="inline-flex items-center gap-6 group">
              <span className="text-sm font-black uppercase tracking-widest border-b-2 border-brand-gold pb-2 group-hover:text-brand-gold transition-colors">
                Explore our full menu
              </span>
              <div className="w-12 h-12 rounded-full bg-brand-black text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-500">
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>

          <div className="relative grid grid-cols-2 gap-4 h-full">
            <div className="space-y-4 pt-12">
              <div className="aspect-[3/4] bg-stone-200 rounded-3xl overflow-hidden shadow-xl rotate-[-2deg]">
                <img src="https://images.unsplash.com/photo-1621333100653-53a5c7776521?q=80&w=400" className="w-full h-full object-cover" alt="Detail" />
              </div>
              <div className="aspect-square bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold animate-pulse">
                 <Star size={40} fill="currentColor" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-stone-200 rounded-[3rem] overflow-hidden shadow-2xl rotate-[2deg]">
                <img src="https://images.unsplash.com/photo-1614949533314-72410a823f99?q=80&w=400" className="w-full h-full object-cover" alt="Vibe" />
              </div>
              <div className="aspect-[3/4] bg-stone-200 rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1595476108010-b4d1f80d77d2?q=80&w=400" className="w-full h-full object-cover" alt="Finish" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-24 lg:py-40 px-6 bg-brand-cream text-center relative z-10 border-t border-brand-black/5">
        <div className="max-w-4xl mx-auto space-y-16">
          <h2 className="text-6xl md:text-9xl lg:text-[120px] font-black uppercase italic tracking-tighter leading-none mb-4 text-stone-900">
            Get <span className="text-brand-gold relative">Braided.
            <Sparkles size={32} className="absolute -top-8 -right-8 text-brand-gold/30" />
            </span>
          </h2>
          <Link to="/booking" className="inline-flex flex-col items-center gap-6 group">
            <div className="h-28 w-28 lg:h-36 lg:w-36 rounded-full border-2 border-brand-black/10 flex items-center justify-center group-hover:bg-brand-black group-hover:text-white transition-all duration-700 group-hover:scale-110 shadow-2xl">
              <ArrowRight size={48} className="group-hover:translate-x-2 transition-transform" />
            </div>
            <span className="text-2xl lg:text-3xl font-black uppercase italic tracking-[0.2em] underline decoration-brand-gold decoration-8 underline-offset-[12px]">Check our spots</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;