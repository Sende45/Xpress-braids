import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, Sparkles, ArrowUpRight, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-stone-200 border-t-brand-gold rounded-full animate-spin mb-4"></div>
      <p className="font-black uppercase tracking-[0.4em] text-stone-400">Loading Studio Menu...</p>
    </div>
  );

  return (
    <div className="bg-[#FDFCF8] min-h-screen pt-40 pb-20 px-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 mb-6">
          <Sparkles size={12} className="text-brand-gold" />
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">NYC Master Stylists</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-stone-900">
          Our <span className="text-brand-gold italic">Gallery</span>
        </h1>
        <p className="mt-6 text-stone-500 font-medium uppercase tracking-widest text-xs max-w-md leading-relaxed">
          Discover our signature techniques and high-end styles crafted for the modern woman.
        </p>
      </div>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
        {services.map((service, index) => (
          <div 
            key={service._id} 
            className={`group relative flex flex-col gap-8 ${index % 2 === 1 ? 'md:mt-32' : ''}`}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-stone-200 shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]">
              <img 
                src={service.image} 
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Price Tag Overlay - Dollars Corrected */}
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-xl border border-white/20">
                <span className="text-2xl font-black text-black">${service.price}</span>
              </div>
              
              {/* Category Badge Overlay */}
              <div className="absolute bottom-8 left-8">
                 <span className="px-4 py-1.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/10">
                   {service.category}
                 </span>
              </div>
            </div>

            {/* Info Container */}
            <div className="space-y-4 px-2">
              <div className="flex justify-between items-end border-b border-stone-200 pb-6">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-stone-900 leading-none">{service.name}</h3>
                  <div className="flex items-center gap-4 mt-4 text-stone-400 text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 bg-stone-100 px-2 py-1 rounded-md">
                      <Clock size={14} className="text-brand-gold" /> {service.duration || '60'} min
                    </span>
                    <span className="flex items-center gap-1.5 bg-stone-100 px-2 py-1 rounded-md">
                      <Scissors size={14} className="text-brand-gold" /> Studio Session
                    </span>
                  </div>
                </div>
                <Link 
                  to={`/booking?service=${service._id}`} 
                  className="w-16 h-16 bg-stone-900 text-white rounded-full flex items-center justify-center hover:bg-brand-gold hover:text-black transition-all hover:-rotate-12 shadow-lg group/btn"
                >
                  <ArrowUpRight size={28} className="group-hover/btn:scale-110 transition-transform" />
                </Link>
              </div>
              <p className="text-stone-600 leading-relaxed font-medium text-sm max-w-lg">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto mt-40 text-center py-20 border-t border-stone-200">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Ready for your transformation?</h2>
        <Link 
          to="/booking" 
          className="inline-block bg-stone-900 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-all hover:scale-105"
        >
          Book Your Session Now
        </Link>
      </div>
    </div>
  );
};

export default Services;