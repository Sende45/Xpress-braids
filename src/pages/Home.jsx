import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, Zap, ShieldCheck, ArrowRight, ArrowUpRight, Play } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-brand-cream overflow-hidden bg-grain">
      {/* --- MODERN HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center px-6 pt-20">
        {/* Dynamic Background Gradients */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-gold/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-brand-black/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text: Left Column (7/12) */}
          <div className="lg:col-span-7 space-y-10 z-10 reveal">
            <div className="inline-flex items-center gap-3 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white shadow-sm">
              <div className="w-2 h-2 bg-brand-gold rounded-full animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-black/60">
                Booking Open • NYC / Harlem Studio
              </span>
            </div>

            <h1 className="text-7xl md:text-[130px] font-black leading-[0.8] tracking-tighter uppercase italic">
              Style <br />
              <span className="stroke-text">Without</span> <br />
              <span className="text-brand-gold">Limits.</span>
            </h1>

            <p className="max-w-lg text-xl md:text-2xl font-medium text-brand-black/70 leading-tight">
              High-fashion expertise by <span className="text-brand-black font-black">PHIPHI</span>. 
              A seamless fusion of ancestral artistry and Manhattan efficiency.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/booking" 
                className="group relative bg-brand-black text-white px-12 py-7 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="relative flex items-center gap-3">
                  <span className="font-black uppercase tracking-widest text-xs">Book the Experience</span>
                  <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </Link>
              
              <button className="flex items-center gap-4 group cursor-pointer">
                <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-white transition-colors">
                  <Play size={16} fill="currentColor" />
                </div>
                <span className="font-black uppercase tracking-[0.2em] text-[10px]">Watch Process</span>
              </button>
            </div>
          </div>

          {/* Image: Right Column (5/12) */}
          <div className="lg:col-span-5 relative z-20 hidden lg:block h-full">
            <div className="relative aspect-[4/5] w-full bg-neutral-200 rounded-[4rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 group animate-shimmer">
             <img 
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
              alt="Test"
              className="w-full h-full object-cover"
            />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-12 bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] reveal z-30" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-4 border-white bg-gray-300" alt="Client Avatar" />
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-black">Trusted by</p>
                  <p className="text-[10px] text-brand-gold font-bold">500+ NYC Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES: DARK MODE SECTION --- */}
      <section className="py-32 bg-brand-black text-white px-6 rounded-t-[5rem] -mt-20 relative z-30">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-12 reveal">
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              The <span className="text-brand-gold">Studio</span> <br /> Standard.
            </h2>
            <p className="max-w-xs text-gray-400 text-sm uppercase tracking-widest leading-relaxed font-bold">
              Surgical precision. <br /> Radical aesthetics. <br /> Absolute comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: <Zap />, title: "Express Flow", desc: "Time is luxury. We have mastered the art of both." },
              { icon: <ShieldCheck />, title: "Tension Control", desc: "The health of your edges is our absolute priority." },
              { icon: <Star />, title: "Harlem Soul", desc: "Neighborhood authenticity in every single braid." }
            ].map((feat, i) => (
              <div key={i} className="group cursor-default reveal" style={{ animationDelay: `${(i + 1) * 0.2}s` }}>
                <div className="text-brand-gold mb-6 group-hover:scale-110 group-hover:animate-float transition-transform duration-500">
                  {React.cloneElement(feat.icon, { size: 40 })}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4">{feat.title}</h3>
                <p className="text-gray-500 group-hover:text-gray-300 transition-colors leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-40 px-6 bg-brand-cream relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12 reveal">
          <h2 className="text-6xl md:text-[100px] font-black uppercase italic tracking-tighter leading-[0.8]">
            Ready to <br /> <span className="text-brand-gold">Transform?</span>
          </h2>
          <Link 
            to="/booking" 
            className="inline-flex items-center gap-6 group"
          >
            <div className="h-24 w-24 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-brand-black group-hover:text-white transition-all duration-500">
              <ArrowRight size={32} />
            </div>
            <span className="text-2xl font-black uppercase italic tracking-widest underline underline-offset-8 decoration-brand-gold">Check Availability</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;