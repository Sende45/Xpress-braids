import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Zap, ShieldCheck, ArrowRight, ArrowUpRight, Play, Heart } from 'lucide-react';

// Importation de ton image locale
import braidsImg from '../assets/braids2.png';

const Home = () => {
  return (
    <div className="bg-brand-cream overflow-hidden bg-grain relative">
      {/* --- ELEMENTS DE DECO FLOTTANTS (CUTE FACTOR) --- */}
      <div className="absolute top-20 left-[10%] text-brand-gold/20 animate-bounce pointer-events-none hidden lg:block">
        <Heart size={48} fill="currentColor" />
      </div>
      <div className="absolute bottom-40 right-[5%] text-brand-black/5 animate-pulse pointer-events-none hidden lg:block">
        <Star size={120} fill="currentColor" />
      </div>

      {/* --- MODERN HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center px-6 pt-24 lg:pt-20">
        {/* Gradients de fond plus doux et "glowy" */}
        <div className="absolute top-[-10%] right-[-5%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-brand-gold/30 rounded-full blur-[100px] lg:blur-[150px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-brand-black/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text: Left Column */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-12 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/50 shadow-xl shadow-brand-gold/10">
              <div className="w-2.5 h-2.5 bg-brand-gold rounded-full animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-black/80">
                ✨ Now Slaying in NYC / Harlem
              </span>
            </div>

            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-black leading-[0.85] tracking-tighter uppercase italic">
              Your <br />
              <span className="stroke-text">Crown</span> <br />
              <span className="text-brand-gold relative">
                Our Art.
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-brand-black/5 rounded-full" />
              </span>
            </h1>

            <p className="max-w-lg mx-auto lg:mx-0 text-lg lg:text-2xl font-medium text-brand-black/70 leading-relaxed italic">
              Experience the "PhiPhi Glow". Where traditional braiding meets <span className="text-brand-black font-black underline decoration-brand-gold decoration-4 underline-offset-4">high-fashion elegance</span>.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <Link 
                to="/booking" 
                className="group relative bg-brand-black text-white px-10 lg:px-14 py-6 lg:py-8 rounded-[2rem] overflow-hidden transition-all duration-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                <div className="relative flex items-center gap-4">
                  <span className="font-black uppercase tracking-widest text-sm">Start Your Glow Up</span>
                  <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </Link>
              
              <button className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-500 shadow-lg">
                  <Play size={18} fill="currentColor" className="text-brand-gold group-hover:text-white transition-colors ml-1" />
                </div>
                <span className="font-black uppercase tracking-[0.2em] text-[10px] border-b-2 border-transparent group-hover:border-brand-gold transition-all">The Process</span>
              </button>
            </div>
          </div>

          {/* Image: Right Column - Design Ultra Attractive */}
          <div className="lg:col-span-5 relative z-20 w-full">
            <div className="relative aspect-[4/5] w-full rounded-[4rem] lg:rounded-[6rem] p-3 lg:p-4 bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_40px_100px_rgba(0,0,0,0.15)] transition-transform duration-1000 hover:-rotate-2 group">
              <div className="w-full h-full rounded-[3.2rem] lg:rounded-[5.2rem] overflow-hidden relative">
                <img 
                  src={braidsImg} 
                  alt="Braids Art"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Tag "Best Seller" flottant */}
              <div className="absolute -top-4 -right-4 bg-brand-gold text-white font-black py-4 px-6 rounded-3xl text-xs uppercase tracking-tighter shadow-xl animate-float">
                Trending 🔥
              </div>
            </div>
            
            {/* Stats Badge - Version Plus "Soft" */}
            <div className="absolute -bottom-8 -left-4 lg:-left-16 bg-white/90 backdrop-blur-xl p-6 lg:p-10 rounded-[3rem] shadow-2xl border border-white z-30 hidden sm:block">
              <div className="flex flex-col gap-4">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-4 border-white shadow-lg" alt="Client" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-brand-gold mb-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-brand-black">Loved by 500+ Beauties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES: SECTION SENSATIONNELLE --- */}
      <section className="py-24 lg:py-40 bg-brand-black text-white px-6 rounded-t-[4rem] lg:rounded-t-[8rem] -mt-24 relative z-30 shadow-[0_-30px_60px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl lg:text-8xl font-black uppercase italic tracking-tighter">
              Why Choose <span className="text-brand-gold">Us?</span>
            </h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            {[
              { icon: <Zap />, title: "Quick Slay", desc: "Premium quality tresses without the 10-hour wait." },
              { icon: <ShieldCheck />, title: "Edge Care", desc: "We love your hair as much as you do. Gentle & safe." },
              { icon: <Heart />, title: "Vibe Match", desc: "A cozy studio vibe that feels like home, but luxury." }
            ].map((feat, i) => (
              <div key={i} className="group text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-white/5 rounded-[2.5rem] flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  {React.cloneElement(feat.icon, { size: 44 })}
                </div>
                <h3 className="text-2xl lg:text-3xl font-black uppercase italic tracking-tight">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm lg:text-lg px-4">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-32 lg:py-48 px-6 bg-brand-cream text-center">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="relative inline-block">
            <h2 className="text-6xl md:text-9xl lg:text-[120px] font-black uppercase italic tracking-tighter leading-none mb-4">
              Get <span className="text-brand-gold">Braided.</span>
            </h2>
            <div className="text-brand-gold/10 absolute -top-10 -right-10 animate-spin-slow">
              <Star size={100} fill="currentColor" />
            </div>
          </div>
          
          <Link 
            to="/booking" 
            className="inline-flex flex-col items-center gap-6 group"
          >
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