import React from 'react';
import { Clock, DollarSign, ChevronRight, Sparkles, Plus, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'knotless-braids',
    name: 'Knotless Braids',
    description: 'Tresses ultra-légères et naturelles. Protection maximale pour vos racines.',
    price: 180,
    duration: '4-6h',
    category: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1646038855662-791834927902?q=80&w=800'
  },
  {
    id: 'box-braids',
    name: 'Classic Box Braids',
    description: 'Le style iconique, propre et durable. Disponible en plusieurs tailles.',
    price: 150,
    duration: '5h',
    category: 'Classic',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=800'
  },
  {
    id: 'cornrows',
    name: 'Feed-in Cornrows',
    description: 'Des lignes parfaites et un look sophistiqué pour toutes les occasions.',
    price: 85,
    duration: '1.5h',
    category: 'Express',
    image: 'https://images.unsplash.com/photo-1605497745244-5c34569732a1?q=80&w=800'
  },
  {
    id: 'boho-braids',
    name: 'Bohemian Braids',
    description: 'Mélange de tresses et de boucles pour un volume décontracté et chic.',
    price: 220,
    duration: '6h',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=800'
  }
];

const Services = () => {
  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-20">
      {/* Header Section - Style Editorial */}
      <section className="px-6 mb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles size={12} fill="currentColor" /> Signature Collection
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] reveal">
            THE <span className="text-transparent stroke-text">STUDIO</span> <br /> MENU
          </h1>
          <p className="max-w-xl text-gray-500 font-medium text-lg leading-relaxed">
            Chaque tresse est une œuvre d'art. Sélectionnez votre style et réservez votre créneau dans notre studio privé de Harlem.
          </p>
        </div>
      </section>

      {/* Grid de Services - Layout Alterné */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className={`group relative reveal ${index % 2 === 1 ? 'md:mt-24' : ''}`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Image Card */}
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-brand-gold/20">
              <img 
                src={service.image} 
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
              />
              
              {/* Overlay Gradient au hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Badge Catégorie */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                  {service.category}
                </span>
              </div>

              {/* Contenu sur l'image (Visible au hover ou fixe sur mobile) */}
              <div className="absolute inset-x-8 bottom-8 flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                      {service.name}
                    </h3>
                    <div className="flex gap-4 text-brand-gold/80 text-[10px] font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Clock size={12} /> {service.duration}</span>
                      <span className="flex items-center gap-1"><Plus size={12} /> From ${service.price}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/booking?service=${service.id}`}
                    className="w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center text-brand-black hover:bg-white transition-colors duration-300 shadow-xl"
                  >
                    <ArrowUpRight size={24} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Description Textuelle (Sous l'image) */}
            <div className="mt-8 px-4">
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer de Page Informatique */}
      <section className="max-w-5xl mx-auto px-6 mt-40">
        <div className="bg-brand-black rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/20 rounded-full blur-[100px] group-hover:bg-brand-gold/30 transition-all duration-700" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
              Bespoke <br /> <span className="text-brand-gold">Experience.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-lg mx-auto font-medium leading-relaxed">
              "Si vous ne voyez pas exactement ce que vous cherchez, contactez-moi directement. À New York, nous créons l'exceptionnel."
            </p>
            <a 
              href="https://instagram.com" 
              className="inline-block border-b-2 border-brand-gold pb-2 text-brand-gold font-black uppercase tracking-[0.3em] text-xs hover:text-white hover:border-white transition-all duration-300"
            >
              Contact on Instagram
            </a>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-text {
          -webkit-text-stroke: 1.5px #1A1A1A;
          color: transparent;
        }
      `}} />
    </div>
  );
};

export default Services;