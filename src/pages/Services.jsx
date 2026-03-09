import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, Sparkles, ArrowUpRight, Scissors, Star } from 'lucide-react';
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

  if (loading) return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-stone-200 border-t-brand-gold rounded-full animate-spin mb-4"></div>
      <p className="font-black uppercase tracking-[0.4em] text-brand-gold">Curating Menu...</p>
    </div>
  );

  return (
    <div className="bg-brand-cream min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto mb-24 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-white shadow-xl mb-8">
          <Sparkles size={14} className="text-brand-gold" />
          <span className="text-[10px] font-black uppercase tracking-widest">Master Artistry Menu</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-stone-900">
          The <span className="text-brand-gold italic">Lookbook</span>
        </h1>
      </div>

      {/* Grid avec Gap plus large et colonnes plus étroites */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
        {services.map((service, index) => (
          <div key={service._id} className={`group relative flex flex-col items-center lg:items-start ${index % 2 === 1 ? 'md:mt-24' : ''}`}>
            
            {/* Image Card - Taille Diminuée (max-w-sm et aspect-[2/3]) */}
            <div className="relative w-full max-w-[340px] aspect-[2/3] overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-2xl transition-all duration-700 hover:-translate-y-3">
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Floating Price - Taille ajustée */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-gold text-white rounded-full flex items-center justify-center text-lg font-black shadow-2xl border-4 border-brand-cream transform group-hover:scale-110 transition-transform">
                ${service.price}
              </div>
            </div>

            {/* Info Section - Alignée sur la largeur de la carte */}
            <div className="mt-10 space-y-4 w-full max-w-[340px]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-brand-gold text-[10px] font-black uppercase tracking-widest mb-1 block">{service.category}</span>
                  <h3 className="text-2xl lg:text-3xl font-black uppercase italic text-stone-900 leading-tight">{service.name}</h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <div className="flex items-center gap-0.5 text-brand-gold">
                      {[1,2,3,4,5].map(s => <Star key={s} size={8} fill="currentColor" />)}
                   </div>
                </div>
              </div>

              <p className="text-stone-500 font-medium text-sm leading-relaxed italic border-l-2 border-brand-gold/20 pl-4">
                "{service.description}"
              </p>

              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-center gap-2 text-stone-400 text-[9px] font-black uppercase tracking-[0.2em]">
                  <Clock size={14} className="text-brand-gold" /> {service.duration || '180'} MINS
                </div>
                <Link 
                  to={`/booking?service=${service._id}`} 
                  className="flex items-center justify-center gap-3 bg-stone-900 text-white px-6 py-4 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-stone-900 transition-all shadow-lg group w-full"
                >
                  Book Experience
                  <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER CTA LUXE */}
      <div className="max-w-4xl mx-auto mt-48 p-12 lg:p-20 rounded-[3rem] bg-brand-black text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/20 blur-[80px] rounded-full" />
        <h2 className="text-4xl font-black uppercase italic mb-8 relative z-10 leading-tight">Don't Settle For <br /><span className="text-brand-gold">Basic.</span></h2>
        <Link to="/booking" className="relative z-10 inline-block bg-white text-brand-black px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-brand-gold transition-all">
          Secure Your Spot
        </Link>
      </div>
    </div>
  );
};

export default Services;