import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, Sparkles, ArrowUpRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const cleanBase = apiUrl.replace(/\/api\/auth\/?$/, "").replace(/\/$/, "");
        const response = await axios.get(`${cleanBase}/api/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // --- SKELETON LOADING (Plus fluide qu'un simple spinner) ---
  if (loading) return (
    <div className="min-h-screen bg-brand-black pt-40 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="space-y-6 animate-pulse">
            <div className="aspect-[2/3] bg-white/5 rounded-[2.5rem] w-full max-w-[340px]" />
            <div className="space-y-3 w-[340px]">
              <div className="h-4 bg-brand-pink/20 rounded w-1/4" />
              <div className="h-8 bg-white/10 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-brand-black min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto mb-24 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-pink/30 bg-white/5 backdrop-blur-md shadow-xl mb-8">
          <Sparkles size={14} className="text-brand-pink" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Master Artistry Menu</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
          The <span className="text-brand-pink italic">Lookbook</span>
        </h1>
      </div>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
        {services.map((service, index) => (
          <div key={service._id} className={`group relative flex flex-col items-center lg:items-start ${index % 2 === 1 ? 'md:mt-24' : ''}`}>
            
            {/* Image Card avec Chargement Optimisé */}
            <div className="relative w-full max-w-[340px] aspect-[2/3] overflow-visible"> 
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-white/5 p-2 shadow-2xl transition-all duration-700 group-hover:-translate-y-3 border border-white/10 group-hover:border-brand-pink/50 relative">
                
                {/* Placeholder pendant le chargement de l'image */}
                <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
                   <div className="w-6 h-6 border-2 border-brand-pink/20 border-t-brand-pink rounded-full animate-spin" />
                </div>

                <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    loading="lazy"
                    onLoad={(e) => e.target.classList.remove('opacity-0')}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-0" 
                  />
                  <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              {/* Badge Prix */}
              <div className="absolute -top-4 -right-4 z-10">
                <div className="relative flex items-center justify-center">
                  <div className="bg-brand-pink w-16 h-16 rounded-tr-[2rem] rounded-bl-[2rem] rounded-tl-md rounded-br-md shadow-[0_0_20px_rgba(255,45,120,0.4)] flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500 border-2 border-brand-black">
                    <span className="text-white text-xl font-black -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      ${service.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badge Premium */}
              <div className="absolute bottom-6 left-6 z-10">
                 <span className="bg-brand-pink/80 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Premium Style
                 </span>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-10 space-y-4 w-full max-w-[340px]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-brand-pink text-[10px] font-black uppercase tracking-widest mb-1 block">{service.category}</span>
                  <h3 className="text-2xl lg:text-3xl font-black uppercase italic text-white leading-tight">{service.name}</h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <div className="flex items-center gap-0.5 text-brand-pink">
                     {[1,2,3,4,5].map(s => <Star key={s} size={8} fill="currentColor" />)}
                   </div>
                </div>
              </div>

              <p className="text-white/40 font-medium text-sm leading-relaxed italic border-l-2 border-brand-pink/40 pl-4">
                "{service.description}"
              </p>

              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-center gap-2 text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">
                  <Clock size={14} className="text-brand-pink" /> {service.duration || '180'} MINS
                </div>
                <Link 
                  to={`/booking?service=${service._id}`} 
                  className="flex items-center justify-center gap-3 bg-white text-brand-black px-6 py-4 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-brand-pink hover:text-white transition-all shadow-lg group w-full"
                >
                  Book Experience
                  <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER CTA */}
      <div className="max-w-4xl mx-auto mt-48 p-12 lg:p-20 rounded-[3rem] bg-white/5 border border-white/10 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-pink/10 blur-[80px] rounded-full" />
        <h2 className="text-4xl font-black uppercase italic mb-8 relative z-10 leading-tight">Don't Settle For <br /><span className="text-brand-pink">Basic.</span></h2>
        <Link to="/booking" className="relative z-10 inline-block bg-brand-pink text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-brand-pink transition-all shadow-[0_0_30px_rgba(255,45,120,0.2)]">
          Secure Your Spot
        </Link>
      </div>
    </div>
  );
};

export default Services;