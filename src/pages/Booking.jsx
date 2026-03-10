import React, { useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar as CalendarIcon, Clock, ChevronRight, 
  ArrowLeft, Zap, CheckCircle2 
} from 'lucide-react';

const pricingData = {
  "Knotless Large": [
    { id: "kl-1", name: "Jumbo+large (Mid back)", price: 220, duration: 180 },
    { id: "kl-2", name: "Medium (Mid back)", price: 200, duration: 240 },
    { id: "kl-3", name: "Smed (Mid back)", price: 240, duration: 240 },
    { id: "kl-4", name: "Small (Mid back)", price: 280, duration: 300 },
    { id: "kl-5", name: "Xsmall (Mid back)", price: 320, duration: 360 },
  ],
  "Boho Knotless": [
    { id: "bk-1", name: "Jumbo+large (Mid back)", price: 260, duration: 210 },
    { id: "bk-2", name: "Medium (Mid back)", price: 260, duration: 240 },
    { id: "bk-3", name: "Small (Waist)", price: 400, duration: 360 },
  ],
  "French Curls": [
    { id: "fc-1", name: "Med back", price: 240, duration: 240 },
    { id: "fc-2", name: "Small back", price: 300, duration: 300 },
  ],
  "Cornrows & Others": [
    { id: "co-1", name: "Sprint Twist (Waist)", price: 300, duration: 180 },
    { id: "co-2", name: "Straight Back Cornrows", price: 220, duration: 120 },
    { id: "co-3", name: "Panytail", price: 140, duration: 90 },
  ]
};

const allServices = Object.values(pricingData).flat();

const Booking = () => {
  const [searchParams] = useSearchParams();
  const serviceFromUrl = searchParams.get('service');
  
  // Ref pour le calendrier iOS
  const dateInputRef = useRef(null);

  const [step, setStep] = useState(serviceFromUrl ? 2 : 1);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    service: serviceFromUrl || '',
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

  const selectedService = useMemo(() => 
    allServices.find(s => s.name === bookingData.service), 
    [bookingData.service]
  );

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(step + 1);
  };
  
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(step - 1);
  };

  const isFormComplete = bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone;

  // Fonction pour forcer le calendrier sur iPhone
  const handleDateClick = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch (err) {
        dateInputRef.current.focus();
      }
    }
  };

  const handlePayment = async () => {
    if (!selectedService) return alert("Please select a service.");
    setLoading(true);
    try {
      const response = await axios.post(`${CLEAN_BASE}/api/bookings/create-hybride`, {
        ...bookingData,
        service: selectedService.name,
        amount: DEPOSIT_AMOUNT 
      });
      if (response.data.url) window.location.href = response.data.url;
    } catch (err) {
      alert(err.response?.data?.error || "Erreur de connexion.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-20 px-6 font-sans overflow-x-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Progress Header */}
        <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink">Step 0{step} / 03</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
              {step === 1 && "Select Style"}
              {step === 2 && "Pick a Slot"}
              {step === 3 && "Confirm Details"}
            </h1>
          </div>
          {step > 1 && (
            <button onClick={prevStep} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-brand-pink transition-colors">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            
            {step === 1 && (
              <div className="grid gap-4">
                {allServices.map((s) => (
                  <button key={s.id} onClick={() => { setBookingData({...bookingData, service: s.name}); nextStep(); }}
                    className={`group flex justify-between items-center p-6 rounded-[1.5rem] border transition-all active:scale-95 ${bookingData.service === s.name ? 'bg-brand-pink text-white border-brand-pink shadow-[0_0_30px_rgba(255,45,120,0.3)]' : 'bg-white/5 border-white/10 hover:border-brand-pink/50 text-white'}`}>
                    <div className="text-left">
                      <h3 className="text-lg font-black uppercase italic">{s.name}</h3>
                      <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Full Price: ${s.price} • Deposit: ${DEPOSIT_AMOUNT}</p>
                    </div>
                    <ChevronRight size={18} className={bookingData.service === s.name ? 'text-white' : 'text-brand-pink'} />
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                  {/* DATE PICKER IPHONE OPTIMIZED */}
                  <div className="mb-8 group cursor-pointer" onClick={handleDateClick}>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink flex items-center gap-2 mb-4">
                      <CalendarIcon size={14} /> Select Date
                    </label>
                    <div className="relative border-b-2 border-white/10 group-hover:border-brand-pink transition-colors pb-4">
                      <div className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
                        {bookingData.date ? new Date(bookingData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Pick a date"}
                      </div>
                      <input 
                        ref={dateInputRef}
                        type="date" 
                        required
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})} 
                        value={bookingData.date} 
                      />
                    </div>
                  </div>
                  
                  {bookingData.date && (
                    <div className="pt-8 border-t border-white/10">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink flex items-center gap-2 mb-6">
                        <Clock size={14} /> Available Times
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {availableSlots.map((slot) => (
                          <button key={slot} onClick={() => setBookingData({...bookingData, time: slot})}
                            className={`py-4 rounded-xl font-black text-[10px] tracking-widest transition-all active:scale-95 ${bookingData.time === slot ? 'bg-brand-pink text-white shadow-[0_0_15px_rgba(255,45,120,0.4)]' : 'bg-white/5 text-white/60 border border-white/10 hover:border-brand-pink/30'}`}>
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button disabled={!bookingData.time} onClick={nextStep} className="w-full bg-white text-brand-black py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-pink hover:text-white disabled:opacity-20 transition-all shadow-xl">
                  Continue to Checkout
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full bg-white/5 border border-white/10 p-5 rounded-xl font-bold text-white outline-none text-base focus:border-brand-pink transition-all" value={bookingData.firstName} onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})} />
                  <input type="text" placeholder="Last Name" className="w-full bg-white/5 border border-white/10 p-5 rounded-xl font-bold text-white outline-none text-base focus:border-brand-pink transition-all" value={bookingData.lastName} onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})} />
                  <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 md:col-span-2 p-5 rounded-xl font-bold text-white outline-none text-base focus:border-brand-pink transition-all" value={bookingData.email} onChange={(e) => setBookingData({...bookingData, email: e.target.value})} />
                  <input type="tel" placeholder="Phone" className="w-full bg-white/5 border border-white/10 md:col-span-2 p-5 rounded-xl font-bold text-white outline-none text-base focus:border-brand-pink transition-all" value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} />
                </div>
                
                <div className="bg-brand-pink/10 border border-brand-pink/20 text-white p-8 rounded-[2rem] flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-pink">Required Deposit</p>
                    <p className="text-sm font-medium text-white/60 italic">Non-refundable secure payment</p>
                  </div>
                  <p className="text-4xl font-black italic text-brand-pink">${DEPOSIT_AMOUNT}.00</p>
                </div>

                <button disabled={!isFormComplete || loading} onClick={handlePayment} className="w-full bg-white text-brand-black py-7 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-pink hover:text-white active:scale-95 transition-all disabled:opacity-50 shadow-2xl">
                  {loading ? "Processing..." : "Pay Deposit & Confirm"}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-4 h-fit sticky top-40 hidden lg:block">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 blur-3xl rounded-full" />
              
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink relative z-10">Booking Summary</h4>
              
              {selectedService ? (
                <div className="space-y-6 relative z-10">
                  <div>
                    <p className="text-2xl font-black uppercase italic leading-none text-white">{selectedService.name}</p>
                    <div className="flex justify-between mt-3">
                      <span className="text-[10px] font-bold text-brand-pink uppercase">Total: ${selectedService.price}</span>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{selectedService.duration / 60}H Session</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-brand-pink/10 flex items-center justify-center text-brand-pink">
                        <CalendarIcon size={14} />
                      </div>
                      <span className="text-[10px] font-black text-white/60 uppercase">{bookingData.date || "Date Select..."}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-brand-pink/10 flex items-center justify-center text-brand-pink">
                        <Clock size={14} />
                      </div>
                      <span className="text-[10px] font-black text-white/60 uppercase">{bookingData.time || "Time Select..."}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-10 text-center border-2 border-dashed border-white/5 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 italic">Select your art to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;