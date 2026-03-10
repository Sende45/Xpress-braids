import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Zap, ShieldCheck, ArrowRight, ArrowUpRight, Play, Heart, Sparkles } from 'lucide-react';

// Importation de tes assets locaux
import braidsHero from '../assets/braids2.png';
import braids1 from '../assets/braids1.png';
import braids3 from '../assets/braids3.png';

const Home = () => {
  return (
    <div className="bg-white overflow-hidden bg-grain relative">
      {/* --- DÉCORATIONS FLOTTANTES (PINK VERSION) --- */}
      <div className="absolute top-32 left-[8%] text-pink-500/20 animate-float pointer-events-none hidden lg:block">
        <Heart size={40} fill="currentColor" />
      </div>
      <div className="absolute top-[60%] right-[10%] text-brand-black/5 animate-pulse pointer-events-none hidden lg:block">
        <Star size={100} fill="currentColor" />
      </div>

      {/* --- SECTION HERO --- */}
      <section className="relative min-h-screen flex items-center px-6 pt-24 lg:pt-20">
        {/* Glow Rose en arrière-plan */}
        <div className="absolute top-[-10%] right-[-5%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-pink-500/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-pink-200/30 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 lg:space-y-12 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl px-5 py-2.5 rounded-full border border-pink-200 shadow-xl shadow-pink-500/10 text-stone-900">
              <Sparkles size={16} className="text-pink-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">NY's Finest Braid Experience • Maryland</span>
            </div>

            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-black leading-[0.85] tracking-tighter uppercase italic text-black">
              Your <br /><span className="stroke-text-pink">Crown</span> <br /><span className="text-pink-500 relative">Our Art.</span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-lg lg:text-2xl font-medium text-stone-600 leading-relaxed italic">
              Experience the exclusivity of the <span className="text-pink-600 font-black">"PhiPhi Glow"</span>. Where ancestral artistry meets <span className="underline decoration-pink-500 decoration-4 underline-offset-4 text-black">Manhattan elegance</span>.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <Link to="/booking" className="group relative bg-black text-white px-10 lg:px-14 py-6 lg:py-8 rounded-[2rem] overflow-hidden transition-all duration-700 hover:shadow-[0_20px_40px_rgba(236,72,153,0.3)] hover:scale-105 active:scale-95 w-full sm:w-auto text-center">
                <div className="absolute inset-0 bg-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <div className="relative flex items-center justify-center gap-4">
                  <span className="font-black uppercase tracking-widest text-sm">Elevate Your Style</span>
                  <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative z-20 w-full">
            <div className="relative aspect-[4/5] w-full rounded-[4rem] p-3 bg-white/40 backdrop-blur-md border border-pink-100 shadow-2xl transition-transform duration-1000 hover:-rotate-2 group">
              <div className="w-full h-full rounded-[3.2rem] overflow-hidden relative">
                <img src={braidsHero} alt="PhiPhi Braid Art" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION LIFESTYLE (PINK & BLACK) --- */}
      <section className="py-32 lg:py-48 px-6 bg-pink-50/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-pink-500/10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 lg:pr-20 z-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 text-pink-500">
              <Sparkles size={24} />
              <span className="text-xs font-black uppercase tracking-[0.3em]">The Studio Experience</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-none text-black">
              More than <br /> <span className="text-pink-500">just a braid.</span>
            </h2>
            <p className="text-lg lg:text-xl font-medium text-stone-500 leading-relaxed italic">
              "Every strand is a story of power, culture, and precision. Step into our sanctuary and leave with a masterpiece."
            </p>
            <Link to="/services" className="inline-flex items-center gap-6 group">
              <span className="text-sm font-black uppercase tracking-widest border-b-2 border-pink-500 pb-2 group-hover:text-pink-600 transition-colors text-black">Explore our full menu</span>
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-500 transition-all duration-500">
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>

          <div className="relative grid grid-cols-2 gap-8 h-full items-center">
            {/* Carte 1 - Braids 1 ($200) */}
            <div className="relative group aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden shadow-2xl rotate-[-4deg] transition-all hover:rotate-0 duration-500 border border-pink-100">
              <img src={braids1} className="w-full h-full object-cover" alt="Braids Style 1" />
              <div className="absolute top-4 right-4 bg-pink-500 px-4 py-1.5 rounded-full shadow-lg border border-white">
                  <span className="text-xs font-black text-white">$200</span>
              </div>
              <div className="absolute bottom-6 left-6">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white bg-black/70 px-3 py-1.5 rounded-lg backdrop-blur-md">Signature</span>
              </div>
            </div>

            {/* Carte 2 - Braids 3 ($120) */}
            <div className="relative group aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden shadow-2xl rotate-[4deg] transition-all hover:rotate-0 duration-500 mt-12 border border-pink-100">
              <img src={braids3} className="w-full h-full object-cover" alt="Braids Style 3" />
              <div className="absolute top-4 right-4 bg-pink-500 px-4 py-1.5 rounded-full shadow-lg border border-white">
                  <span className="text-xs font-black text-white">$120</span>
              </div>
              <div className="absolute bottom-6 left-6">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white bg-black/70 px-3 py-1.5 rounded-lg backdrop-blur-md">Trending</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION FEATURES (BLACK & PINK) --- */}
      <section className="py-24 lg:py-40 bg-black text-white px-6 rounded-t-[4rem] lg:rounded-t-[8rem] -mt-24 relative z-30 shadow-[0_-30px_60px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center">
            <h2 className="text-5xl lg:text-8xl font-black uppercase italic tracking-tighter"><span className="text-pink-500">Why</span> choosing Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              { icon: <Zap />, title: "Quick Slay", desc: "Premium quality without the wait." },
              { icon: <ShieldCheck />, title: "Edge Care", desc: "Gentle & safe for your hair health." },
              { icon: <Heart />, title: "Vibe Match", desc: "Luxury Maryland studio atmosphere." }
            ].map((feat, i) => (
              <div key={i} className="group text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-white/5 rounded-[2rem] flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-500">
                  {React.cloneElement(feat.icon, { size: 40 })}
                </div>
                <h3 className="text-2xl font-black uppercase italic">{feat.title}</h3>
                <p className="text-stone-400 text-sm lg:text-lg">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-24 lg:py-40 px-6 bg-white text-center relative z-10 border-t border-stone-100">
        <div className="max-w-4xl mx-auto space-y-16">
          <h2 className="text-6xl md:text-9xl lg:text-[120px] font-black uppercase italic tracking-tighter leading-none mb-12 text-black">
            Get <span className="text-pink-500 relative">Braided. <Sparkles size={32} className="absolute -top-8 -right-8 text-pink-500/30" /></span>
          </h2>
          <Link to="/booking" className="inline-flex flex-col items-center gap-6 group">
            <div className="h-28 w-28 lg:h-36 lg:w-36 rounded-full border-2 border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-700 group-hover:scale-110 shadow-2xl group-hover:shadow-pink-500/20">
              <ArrowRight size={48} className="group-hover:translate-x-2 transition-transform" />
            </div>
            <span className="text-2xl lg:text-3xl font-black uppercase italic tracking-[0.2em] underline decoration-pink-500 decoration-8 underline-offset-[12px] text-black">Check our spots</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;