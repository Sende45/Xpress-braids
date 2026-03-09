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
      <div className="max-w-7xl mx-auto mb-32 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-white shadow-xl mb-8">
          <Sparkles size={14} className="text-brand-gold" />
          <span className="text-[10px] font-black uppercase tracking-widest">Master Artistry Menu</span>
        </div>
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none text-stone-900">
          The <span className="text-brand-gold italic">Lookbook</span>
        </h1>
      </div>

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-40">
        {services.map((service, index) => (
          <div key={service._id} className={`group relative ${index % 2 === 1 ? 'md:mt-32' : ''}`}>
            {/* Image Card Luxe */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-[3.5rem] bg-white p-4 shadow-2xl transition-all duration-700 hover:-translate-y-4">
              <div className="w-full h-full rounded-[2.8rem] overflow-hidden relative">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Floating Price */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-gold text-white rounded-full flex items-center justify-center text-2xl font-black shadow-2xl border-4 border-brand-cream transform group-hover:scale-110 transition-transform">
                ${service.price}
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-12 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-brand-gold text-xs font-black uppercase tracking-widest mb-2 block">{service.category}</span>
                  <h3 className="text-4xl lg:text-5xl font-black uppercase italic text-stone-900">{service.name}</h3>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="flex items-center gap-1 text-brand-gold">
                      {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="currentColor" />)}
                   </div>
                   <span className="text-[10px] font-black text-stone-400">Verified Style</span>
                </div>
              </div>

              <p className="text-stone-500 font-medium text-lg leading-relaxed max-w-md italic border-l-4 border-brand-gold/20 pl-6">
                "{service.description}"
              </p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-stone-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <Clock size={16} className="text-brand-gold" /> {service.duration || '180'} MINS
                </div>
                <Link to={`/booking?service=${service._id}`} className="flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-stone-900 transition-all shadow-lg group">
                  Book Experience
                  <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER CTA LUXE */}
      <div className="max-w-5xl mx-auto mt-60 p-20 rounded-[4rem] bg-brand-black text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/20 blur-[100px] rounded-full" />
        <h2 className="text-5xl font-black uppercase italic mb-8 relative z-10">Don't Settle For <br /><span className="text-brand-gold">Basic.</span></h2>
        <Link to="/booking" className="relative z-10 inline-block bg-white text-brand-black px-12 py-6 rounded-full font-black uppercase tracking-widest hover:bg-brand-gold transition-all">
          Secure Your Spot
        </Link>
      </div>
    </div>
  );
};
export default Services;