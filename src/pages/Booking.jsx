import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar as CalendarIcon, Clock, ChevronRight, 
  ArrowLeft, Zap 
} from 'lucide-react';

// Centralisation des données pour la cohérence
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

// Aplatir la liste pour la recherche
const allServices = Object.values(pricingData).flat();

const Booking = () => {
  const [searchParams] = useSearchParams();
  const serviceFromUrl = searchParams.get('service');

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

  // Trouver le service sélectionné
  const selectedService = useMemo(() => 
    allServices.find(s => s.name === bookingData.service), 
    [bookingData.service]
  );

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const isFormComplete = bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone;

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
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Progress Header */}
        <div className="mb-12 flex items-end justify-between border-b border-black/5 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500">Step 0{step} / 03</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black">
              {step === 1 && "Select Style"}
              {step === 2 && "Pick a Slot"}
              {step === 3 && "Confirm Details"}
            </h1>
          </div>
          {step > 1 && (
            <button onClick={prevStep} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-pink-500 transition-colors">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            
            {/* STEP 1: SERVICE SELECTION */}
            {step === 1 && (
              <div className="grid gap-4">
                {allServices.map((s) => (
                  <button key={s.id} onClick={() => { setBookingData({...bookingData, service: s.name}); nextStep(); }}
                    className={`group flex justify-between items-center p-6 rounded-[1.5rem] border transition-all ${bookingData.service === s.name ? 'bg-black text-white border-black scale-[1.01]' : 'bg-pink-50/20 border-pink-100 hover:border-pink-300'}`}>
                    <div className="text-left">
                      <h3 className="text-lg font-black uppercase italic">{s.name}</h3>
                      <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Full Price: ${s.price} • Deposit: ${DEPOSIT_AMOUNT}</p>
                    </div>
                    <ChevronRight size={18} />
                  </button>
                ))}
              </div>
            )}

            {/* STEP 2: DATE & TIME */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-pink-100 shadow-xl shadow-pink-500/5">
                  <div className="mb-8">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 flex items-center gap-2 mb-4">
                      <CalendarIcon size={14} /> Select Date
                    </label>
                    <input type="date" className="w-full bg-transparent text-3xl font-black outline-none focus:text-pink-500"
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})} value={bookingData.date} />
                  </div>
                  
                  {bookingData.date && (
                    <div className="pt-8 border-t border-pink-50">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 flex items-center gap-2 mb-6">
                        <Clock size={14} /> Available Times
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {availableSlots.map((slot) => (
                          <button key={slot} onClick={() => setBookingData({...bookingData, time: slot})}
                            className={`py-4 rounded-xl font-black text-[10px] tracking-widest transition-all ${bookingData.time === slot ? 'bg-pink-500 text-white' : 'bg-pink-50/50 text-stone-600 border border-pink-100 hover:border-pink-500'}`}>
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button disabled={!bookingData.time} onClick={nextStep} className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-pink-600 disabled:opacity-10 transition-all">
                  Next Step
                </button>
              </div>
            )}

            {/* STEP 3: PERSONAL INFO */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full bg-pink-50/30 border border-pink-100 p-5 rounded-xl font-bold outline-none focus:border-pink-500 focus:bg-white transition-all" value={bookingData.firstName} onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})} />
                  <input type="text" placeholder="Last Name" className="w-full bg-pink-50/30 border border-pink-100 p-5 rounded-xl font-bold outline-none focus:border-pink-500 focus:bg-white transition-all" value={bookingData.lastName} onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})} />
                  <input type="email" placeholder="Email" className="w-full bg-pink-50/30 border border-pink-100 md:col-span-2 p-5 rounded-xl font-bold outline-none focus:border-pink-500 focus:bg-white transition-all" value={bookingData.email} onChange={(e) => setBookingData({...bookingData, email: e.target.value})} />
                  <input type="tel" placeholder="Phone" className="w-full bg-pink-50/30 border border-pink-100 md:col-span-2 p-5 rounded-xl font-bold outline-none focus:border-pink-500 focus:bg-white transition-all" value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} />
                </div>
                <div className="bg-stone-900 text-white p-8 rounded-[2rem] flex justify-between items-center">
                  <p className="text-sm font-medium">Non-refundable Deposit</p>
                  <p className="text-3xl font-black italic text-pink-500">${DEPOSIT_AMOUNT}.00</p>
                </div>
                <button disabled={!isFormComplete || loading} onClick={handlePayment} className="w-full bg-pink-500 text-white py-7 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-pink-600 transition-all disabled:opacity-50">
                  {loading ? "Redirecting..." : "Pay Deposit & Confirm"}
                </button>
              </div>
            )}
          </div>

          {/* SIDEBAR SUMMARY */}
          <div className="lg:col-span-4 h-fit sticky top-40">
            <div className="bg-stone-50 border border-stone-100 p-8 rounded-[2rem] space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400">Your Selection</h4>
              {selectedService ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-xl font-black uppercase italic leading-none">{selectedService.name}</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] font-bold text-pink-500 uppercase">Total: ${selectedService.price}</span>
                      <span className="text-[10px] font-bold text-stone-400 uppercase">~{selectedService.duration / 60}h</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-stone-200 space-y-2 text-[10px] font-black uppercase tracking-tighter text-stone-600">
                    <div className="flex items-center gap-3"><CalendarIcon size={12} className="text-pink-500" /> {bookingData.date || "Date..."}</div>
                    <div className="flex items-center gap-3"><Clock size={12} className="text-pink-500" /> {bookingData.time || "Time..."}</div>
                  </div>
                </div>
              ) : <p className="text-xs italic text-stone-400">Select a style to continue.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;