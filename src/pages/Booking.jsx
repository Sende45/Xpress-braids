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

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const CLEAN_BASE = API_URL.replace(/\/api\/auth\/?$/, "").replace(/\/$/, "");

  const DEPOSIT_AMOUNT = 30; 
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
    <div className="min-h-screen bg-white bg-grain pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header de progression */}
        <div className="mb-12 flex items-end justify-between border-b border-black/5 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500">Step 0{step} / 03</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black">
              {step === 1 && "Select Style"}
              {step === 2 && "Pick a Slot"}
              {step === 3 && "Personal Details"}
            </h1>
          </div>
          {step > 1 && (
            <button onClick={prevStep} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-pink-500 transition-colors">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Go Back
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            {/* ÉTAPE 1 : SELECTION SERVICE */}
            {step === 1 && (
              <div className="grid gap-6">
                {services.map((s) => (
                  <button key={s.id} onClick={() => { setBookingData({...bookingData, service: s.id}); nextStep(); }}
                    className={`group flex justify-between items-center p-8 rounded-[2rem] border transition-all ${bookingData.service === s.id ? 'bg-black text-white border-black scale-[1.02] shadow-xl shadow-pink-500/10' : 'bg-pink-50/30 border-pink-100 hover:border-pink-300'}`}>
                    <div className="space-y-1 text-left">
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${bookingData.service === s.id ? 'text-pink-400' : 'text-pink-500/50'}`}>{s.tag}</span>
                      <h3 className="text-2xl font-black uppercase italic tracking-tight">{s.name}</h3>
                      <p className="text-xs font-medium opacity-60">Deposit: ${DEPOSIT_AMOUNT} • {s.duration / 60}h Session</p>
                    </div>
                    <ChevronRight size={20} className={bookingData.service === s.id ? 'text-pink-500' : 'text-stone-300'} />
                  </button>
                ))}
              </div>
            )}

            {/* ÉTAPE 2 : DATE & HEURE */}
            {step === 2 && (
              <div className="space-y-12">
                <div className="bg-white p-10 rounded-[3rem] border border-pink-100 shadow-xl shadow-pink-500/5 space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 flex items-center gap-2">
                      <CalendarIcon size={14} /> Select Date
                    </label>
                    <input type="date" className="w-full bg-transparent text-4xl font-black uppercase outline-none focus:text-pink-500 transition-colors"
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})} value={bookingData.date} />
                  </div>
                  {bookingData.date && (
                    <div className="pt-8 border-t border-pink-50 space-y-6">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 flex items-center gap-2">
                        <Clock size={14} /> Available Times
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {availableSlots.map((slot) => (
                          <button key={slot} onClick={() => setBookingData({...bookingData, time: slot})}
                            className={`py-4 rounded-2xl font-black text-xs tracking-widest transition-all ${bookingData.time === slot ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30 scale-105' : 'bg-pink-50/50 text-stone-600 border border-pink-100 hover:border-pink-500'}`}>
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button disabled={!bookingData.time} onClick={nextStep} className="w-full bg-black text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-pink-600 disabled:opacity-20 transition-all shadow-xl shadow-pink-500/10">
                  Continue to Personal Details
                </button>
              </div>
            )}

            {/* ÉTAPE 3 : INFOS PERSO */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name" className="w-full bg-pink-50/30 border border-pink-100 p-6 rounded-2xl font-bold outline-none focus:border-pink-500 focus:bg-white transition-all" value={bookingData.firstName} onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})} />
                  <input type="text" placeholder="Last Name" className="w-full bg-pink-50/30 border border-pink-100 p-6 rounded-2xl font-bold outline-none focus:border-pink-500 focus:bg-white transition-all" value={bookingData.lastName} onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})} />
                  <input type="email" placeholder="Email" className="w-full bg-pink-50/30 border border-pink-100 md:col-span-2 p-6 rounded-2xl font-bold outline-none focus:border-pink-500 focus:bg-white transition-all" value={bookingData.email} onChange={(e) => setBookingData({...bookingData, email: e.target.value})} />
                  <input type="tel" placeholder="Phone" className="w-full bg-pink-50/30 border border-pink-100 md:col-span-2 p-6 rounded-2xl font-bold outline-none focus:border-pink-500 focus:bg-white transition-all" value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} />
                </div>
                <div className="bg-black text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full" />
                    <p className="text-xl font-medium leading-tight relative z-10">Secure your slot with a <span className="text-pink-500 font-black italic">${DEPOSIT_AMOUNT}.00</span> deposit.</p>
                </div>
                <button disabled={!isFormComplete || loading} onClick={handlePayment} className="w-full bg-pink-500 text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:scale-[1.02] hover:bg-pink-600 transition-all disabled:opacity-50 shadow-xl shadow-pink-500/20">
                  {loading ? "Redirecting to Stripe..." : "Confirm & Pay Deposit"}
                </button>
              </div>
            )}
          </div>

          {/* SIDEBAR SUMMARY */}
          <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
            <div className="bg-white/80 backdrop-blur-xl border border-pink-100 p-8 rounded-[2.5rem] shadow-2xl shadow-pink-500/5 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500/50 border-b border-pink-50 pb-4">Booking Summary</h4>
              {selectedService ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-2xl font-black uppercase italic leading-none text-black">{selectedService.name}</p>
                    <p className="text-[10px] font-bold text-pink-500 mt-1 uppercase">Maryland Studio Session</p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-pink-50 text-[10px] font-black uppercase tracking-widest text-stone-600">
                    <div className="flex items-center gap-3"><CalendarIcon size={14} className="text-pink-500" /> {bookingData.date || "Date missing"}</div>
                    <div className="flex items-center gap-3"><Clock size={14} className="text-pink-500" /> {bookingData.time || "Slot missing"}</div>
                  </div>
                  <div className="pt-6 border-t border-pink-50 flex justify-between items-end">
                    <p className="text-[10px] font-black uppercase text-stone-400">Secure Deposit</p>
                    <p className="text-4xl font-black italic tracking-tighter text-black">${DEPOSIT_AMOUNT}</p>
                  </div>
                </div>
              ) : <p className="text-xs italic text-stone-400 text-center py-4">Select a style to see the summary.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;