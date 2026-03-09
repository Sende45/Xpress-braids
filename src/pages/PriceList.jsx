import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, Calendar, Percent, ChevronRight } from 'lucide-react';

const PriceList = () => {
  const [activeCategory, setActiveCategory] = useState('Knotless Large');
  const navigate = useNavigate();

  const pricingData = {
    "Knotless Large": [
      { name: "Jumbo+large (Mid back)", price: 220 },
      { name: "Medium (Mid back)", price: 200 },
      { name: "Smed (Mid back)", price: 240 },
      { name: "Small (Mid back)", price: 280 },
      { name: "Xsmall (Mid back)", price: 320 },
      { name: "Medium (Waist)", price: 250 },
      { name: "Small (Waist)", price: 300 },
      { name: "Xsmall (Top Butt)", price: 460 },
    ],
    "Boho Knotless": [
      { name: "Jumbo+large (Mid back)", price: 260 },
      { name: "Medium (Mid back)", price: 260 },
      { name: "Smed (Mid back)", price: 280 },
      { name: "Small (Waist)", price: 400 },
      { name: "Xsmall (Mid Butt)", price: 480 },
    ],
    "French Curls": [
      { name: "Med back", price: 240 },
      { name: "Small back", price: 300 },
      { name: "Smed back", price: 340 },
      { name: "Xsmall (Waist)", price: 420 },
    ],
    "Cornrows & Others": [
      { name: "Sprint Twist (Waist)", price: 300 },
      { name: "Crochet Individual", price: 220 },
      { name: "Straight Back Cornrows", price: 220 },
      { name: "Fulani back", price: 240 },
      { name: "Panytail", price: 140 },
    ]
  };

  const handleBooking = (styleName) => {
    // Redirection vers la page booking avec le nom du service en paramètre d'URL
    const encodedStyle = encodeURIComponent(styleName);
    navigate(`/booking?service=${encodedStyle}`);
  };

  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-brand-pink font-black uppercase tracking-[0.3em] text-sm mb-4">Tarification</h2>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic mb-6">Menu des <span className="text-brand-pink">Styles.</span></h1>
          <div className="inline-flex items-center gap-3 bg-brand-pink/10 border border-brand-pink/30 px-6 py-3 rounded-full animate-pulse">
            <Percent size={20} className="text-brand-pink" />
            <span className="text-white font-bold tracking-tight text-sm md:text-base">-20% OFF SUR L'OUVERTURE !</span>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Object.keys(pricingData).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 uppercase text-[10px] tracking-widest ${
                activeCategory === cat 
                ? 'bg-brand-pink text-white shadow-[0_0_25px_rgba(255,45,120,0.4)]' 
                : 'bg-white/5 text-white/50 border border-white/10 hover:border-brand-pink/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pricing Grid */}
        <div className="grid gap-4">
          {pricingData[activeCategory].map((item, index) => (
            <div 
              key={index}
              className="group flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 hover:border-brand-pink/30 transition-all duration-500"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-pink/20 flex items-center justify-center text-brand-pink group-hover:scale-110 group-hover:bg-brand-pink group-hover:text-white transition-all duration-500">
                  <Scissors size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg md:text-xl tracking-tight">{item.name}</h3>
                  <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest mt-1">Maryland Studio • Pro Finish</p>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-8">
                <div className="text-right">
                  <span className="text-white/20 line-through text-xs font-bold block mb-1">
                    ${Math.round(item.price / 0.8)}
                  </span>
                  <span className="text-brand-pink font-black text-2xl md:text-3xl italic tracking-tighter">
                    ${item.price}
                  </span>
                </div>
                <button 
                  onClick={() => handleBooking(item.name)}
                  className="bg-white text-black p-4 rounded-2xl hover:bg-brand-pink hover:text-white transition-all duration-300 shadow-xl group-hover:rotate-12"
                >
                  <Calendar size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 p-8 rounded-3xl border border-white/5 bg-white/2 text-center">
          <p className="text-white/40 text-xs font-medium italic max-w-lg mx-auto leading-relaxed">
            * Wash and Blow dry & custom blend available. <br />
            Tous les styles Knotless incluent une finition soignée et durable. 
            Le dépôt de $30 sera déduit du prix total affiché ici.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceList;