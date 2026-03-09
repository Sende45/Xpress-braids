import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-brand-cream min-h-screen pt-40 pb-20 px-6 bg-grain">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-24">
        <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter text-stone-900 leading-none">
          Let’s <span className="text-brand-gold">Connect.</span>
        </h1>
        <p className="mt-8 text-stone-500 font-black uppercase tracking-[0.4em] text-xs">Based in the heart of Harlem, NYC</p>
      </div>

      {/* Contact Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {/* WhatsApp Card */}
        <a href="https://wa.me/yournumber" target="_blank" rel="noreferrer" className="group bg-white p-12 rounded-[3.5rem] shadow-xl hover:bg-brand-black transition-all duration-700 text-center">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-green-600 group-hover:text-white transition-all">
            <MessageCircle size={32} />
          </div>
          <h3 className="text-2xl font-black uppercase italic mb-4 group-hover:text-white">WhatsApp</h3>
          <p className="text-stone-400 text-sm group-hover:text-stone-500">Instant booking support & inquiries.</p>
        </a>

        {/* Studio Location Card */}
        <div className="bg-white p-12 rounded-[3.5rem] shadow-xl text-center border-2 border-brand-gold/20 relative overflow-hidden group">
          <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-2xl flex items-center justify-center mx-auto mb-8">
            <MapPin size={32} />
          </div>
          <h3 className="text-2xl font-black uppercase italic mb-4 text-stone-900">Our Studio</h3>
          <p className="text-stone-500 text-sm font-medium">125th St. Harlem<br />New York, NY 10027</p>
          <div className="absolute top-4 right-4 text-brand-gold/20 group-hover:text-brand-gold/40 transition-colors">
            <Sparkles size={24} />
          </div>
        </div>

        {/* Instagram Card */}
        <a href="https://instagram.com/xpressbraids" target="_blank" rel="noreferrer" className="group bg-white p-12 rounded-[3.5rem] shadow-xl hover:bg-brand-black transition-all duration-700 text-center">
          <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-purple-600 group-hover:text-white transition-all">
            <Instagram size={32} />
          </div>
          <h3 className="text-2xl font-black uppercase italic mb-4 group-hover:text-white">Instagram</h3>
          <p className="text-stone-400 text-sm group-hover:text-stone-500">DM us for style inspiration.</p>
        </a>
      </div>

      {/* Business Hours & CTA Section */}
      <div className="max-w-7xl mx-auto bg-brand-black rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-16">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-5xl font-black uppercase italic text-brand-gold leading-none">Business <br /> Hours</h2>
            <div className="space-y-2">
                <p className="text-stone-400 uppercase tracking-[0.3em] text-[10px] font-black">Mon — Sat: 08:00 AM - 07:00 PM</p>
                <p className="text-stone-400 uppercase tracking-[0.3em] text-[10px] font-black">Sun: Closed (Rest & Recharge)</p>
            </div>
          </div>
          
          <Link to="/booking" className="group flex items-center gap-6 bg-white text-brand-black px-12 py-8 rounded-full font-black uppercase tracking-widest hover:bg-brand-gold transition-all duration-500 shadow-2xl">
            Book Your Transformation
            <div className="w-10 h-10 rounded-full bg-brand-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight size={20} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;