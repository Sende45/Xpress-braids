import React from 'react';
import { Clock, DollarSign, Check } from 'lucide-react';

const BookingServiceCard = ({ service, isSelected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(service.id)}
      className={`
        relative group cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-500 ease-expo
        ${isSelected 
          ? 'border-brand-gold bg-brand-gold/[0.03] shadow-xl shadow-brand-gold/10' 
          : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-lg'}
      `}
    >
      <div className="flex p-4 gap-5">
        {/* Thumbnail Image */}
        <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
          <img 
            src={service.image} 
            alt={service.name} 
            className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}
          />
          {isSelected && (
            <div className="absolute inset-0 bg-brand-gold/20 backdrop-blur-[2px] flex items-center justify-center">
              <div className="bg-white rounded-full p-1 text-brand-gold shadow-lg animate-reveal">
                <Check size={16} strokeWidth={4} />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <div className="flex justify-between items-start">
              <h3 className={`font-black uppercase italic tracking-tighter transition-colors ${isSelected ? 'text-brand-gold' : 'text-brand-black'}`}>
                {service.name}
              </h3>
              <span className="font-bold text-sm italic">${service.price}</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-tight mt-1 line-clamp-2">
              {service.description}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock size={12} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{service.duration} min</span>
            </div>
            {service.isPopular && (
              <span className="text-[9px] font-black uppercase tracking-widest bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded">
                Popular
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Barre de sélection discrète en bas */}
      <div className={`h-1 w-full transition-all duration-500 ${isSelected ? 'bg-brand-gold' : 'bg-transparent'}`} />
    </div>
  );
};

export default BookingServiceCard;