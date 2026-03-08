import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar as CalendarIcon, Clock, ChevronRight, 
  CreditCard, User, ArrowLeft, Zap, MapPin, Mail, Phone 
} from 'lucide-react';

const services = [
  { id: 'knotless-braids', name: 'Knotless Braids', duration: 240, tag: 'Popular' },
  { id: 'box-braids', name: 'Classic Box Braids', duration: 300, tag: 'Timeless' },
  { id: 'cornrows', name: 'Feed-in Cornrows', duration: 90, tag: 'Express' },
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    service: searchParams.get('service') || '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  // --- CONFIGURATION DYNAMIQUE CORRIGÉE ---
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  // Nettoyage de l'URL pour éviter les doublons /api/auth/api/bookings
  const CLEAN_BASE = API_URL.replace(/\/api\/auth\/?$/, "").replace(/\/$/, "");

  const DEPOSIT_AMOUNT = 30; // Prix unique pour tous les RDV
  const availableSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:30 PM"];
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const selectedService = services.find(s => s.id === bookingData.service);
  const isFormComplete = bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone;

  const handlePayment = async () => {
    if (!selectedService) return alert("Please select a service first.");
    
    setLoading(true);
    try {
      const response = await axios.post(`${CLEAN_BASE}/api/bookings/create-hybride`, {
        ...bookingData,
        service: selectedService.name,
        amount: DEPOSIT_AMOUNT 
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.error("Erreur paiement:", err);
      alert(err.response?.data?.error || "Erreur de connexion au service de paiement.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream bg-grain pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-12 flex items-end justify-between border-b border-black/5 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Step 0{step} / 03</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
              {step === 1 && "Select Style"}
              {step === 2 && "Pick a Slot"}
              {step === 3 && "Personal Details"}
            </h1>
          </div>
          {step > 1 && (
            <button onClick={prevStep} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-black/40 hover:text-brand-black">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Go Back
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            {step === 1 && (
              <div className="grid gap-6">
                {services.map((s) => (
                  <button key={s.id} onClick={() => { setBookingData({...bookingData, service: s.id}); nextStep(); }}
                    className={`group flex justify-between items-center p-8 rounded-[2rem] border transition-all ${bookingData.service === s.id ? 'bg-brand-black text-white border-brand-black scale-[1.02]' : 'bg-white/40 border-white/20 hover:border-brand-gold/50'}`}>
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">{s.tag}</span>
                      <h3 className="text-2xl font-black uppercase italic tracking-tight">{s.name}</h3>
                      <p className="text-xs font-medium opacity-60">Deposit: ${DEPOSIT_AMOUNT} • {s.duration / 60}h Session</p>
                    </div>
                    <ChevronRight size={20} />
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-12">
                <div className="bg-white/40 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold flex items-center gap-2"><CalendarIcon size={14} /> Select Date</label>
                    <input type="date" className="w-full bg-transparent text-4xl font-black uppercase outline-none focus:text-brand-gold"
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})} value={bookingData.date} />
                  </div>
                  {bookingData.date && (
                    <div className="pt-8 border-t border-black/5 space-y-6">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold flex items-center gap-2"><Clock size={14} /> Available Times</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {availableSlots.map((slot) => (
                          <button key={slot} onClick={() => setBookingData({...bookingData, time: slot})}
                            className={`py-4 rounded-2xl font-black text-xs tracking-widest transition-all ${bookingData.time === slot ? 'bg-brand-black text-white scale-105' : 'bg-white border-black/5 hover:border-brand-gold'}`}>
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button disabled={!bookingData.time} onClick={nextStep} className="w-full bg-brand-black text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-brand-gold disabled:opacity-20 transition-all">
                  Continue to Personal Details
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name" className="w-full bg-white/40 border border-white/20 p-6 rounded-2xl font-bold outline-none focus:border-brand-gold" value={bookingData.firstName} onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})} />
                  <input type="text" placeholder="Last Name" className="w-full bg-white/40 border border-white/20 p-6 rounded-2xl font-bold outline-none focus:border-brand-gold" value={bookingData.lastName} onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})} />
                  <input type="email" placeholder="Email" className="w-full bg-white/40 border border-white/20 md:col-span-2 p-6 rounded-2xl font-bold outline-none focus:border-brand-gold" value={bookingData.email} onChange={(e) => setBookingData({...bookingData, email: e.target.value})} />
                  <input type="tel" placeholder="Phone" className="w-full bg-white/40 border border-white/20 md:col-span-2 p-6 rounded-2xl font-bold outline-none focus:border-brand-gold" value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} />
                </div>
                <div className="bg-brand-black text-white p-10 rounded-[3rem] shadow-2xl">
                    <p className="text-xl font-medium leading-tight">Secure your slot with a <span className="text-brand-gold font-black italic">${DEPOSIT_AMOUNT}.00</span> deposit.</p>
                </div>
                <button disabled={!isFormComplete || loading} onClick={handlePayment} className="w-full bg-brand-gold text-brand-black py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:scale-[1.05] transition-all disabled:opacity-50">
                  {loading ? "Redirecting to Stripe..." : "Confirm & Pay Deposit"}
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
            <div className="bg-white/60 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-black/40 border-b border-black/5 pb-4">Booking Summary</h4>
              {selectedService ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-2xl font-black uppercase italic leading-none">{selectedService.name}</p>
                    <p className="text-[10px] font-bold text-brand-gold mt-1 uppercase">NYC Studio Session</p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-black/5 text-[10px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-3"><CalendarIcon size={14} className="text-brand-gold" /> {bookingData.date || "Date missing"}</div>
                    <div className="flex items-center gap-3"><Clock size={14} className="text-brand-gold" /> {bookingData.time || "Slot missing"}</div>
                  </div>
                  <div className="pt-6 border-t border-black/5 flex justify-between items-end">
                    <p className="text-[10px] font-black uppercase">Secure Deposit</p>
                    <p className="text-4xl font-black italic tracking-tighter">${DEPOSIT_AMOUNT}</p>
                  </div>
                </div>
              ) : <p className="text-xs italic text-gray-400 text-center py-4">Select a style to see the summary.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;