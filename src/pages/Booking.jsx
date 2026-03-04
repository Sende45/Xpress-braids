import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, Clock, ChevronRight, 
  CreditCard, User, ArrowLeft, Zap, MapPin, Mail, Phone 
} from 'lucide-react';

const services = [
  { id: 'knotless-braids', name: 'Knotless Braids', price: 180, duration: 240, tag: 'Popular' },
  { id: 'box-braids', name: 'Classic Box Braids', price: 150, duration: 300, tag: 'Timeless' },
  { id: 'cornrows', name: 'Feed-in Cornrows', price: 85, duration: 90, tag: 'Express' },
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // État pour le chargement Stripe
  const [bookingData, setBookingData] = useState({
    service: searchParams.get('service') || '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const availableSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:30 PM"];
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const selectedService = services.find(s => s.id === bookingData.service);

  const isFormComplete = bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone;

  // --- LOGIQUE DE PAIEMENT STRIPE ---
  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/bookings/create-hybride`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingData,
          service: selectedService.name,
          amount: 30 // L'acompte de 30$
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirection vers la page de paiement sécurisée de Stripe
        window.location.href = data.url;
      } else {
        alert("Erreur: Impossible de générer la session de paiement.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Erreur paiement:", err);
      alert("Erreur de connexion avec le serveur.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream bg-grain pt-32 pb-20 px-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-black/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-12 flex items-end justify-between border-b border-black/5 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">
              Step 0{step} / 03
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
              {step === 1 && "Select Style"}
              {step === 2 && "Pick a Slot"}
              {step === 3 && "Personal Details"}
            </h1>
          </div>
          
          {step > 1 && (
            <button 
              onClick={prevStep}
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-black/40 hover:text-brand-black transition-colors"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            {step === 1 && (
              <div className="grid gap-6 reveal">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setBookingData({...bookingData, service: s.id}); nextStep(); }}
                    className={`group relative flex justify-between items-center p-8 rounded-[2rem] border transition-all duration-500 text-left
                      ${bookingData.service === s.id 
                        ? 'bg-brand-black text-white border-brand-black scale-[1.02]' 
                        : 'bg-white/40 backdrop-blur-md border-white/20 hover:border-brand-gold/50 hover:bg-white/60'}`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">{s.tag}</span>
                        {bookingData.service === s.id && <Zap size={12} className="text-brand-gold fill-current" />}
                      </div>
                      <h3 className="text-2xl font-black uppercase italic tracking-tight">{s.name}</h3>
                      <p className={`text-xs font-medium ${bookingData.service === s.id ? 'text-gray-400' : 'text-gray-500'}`}>
                        {s.duration / 60}h Studio Session • From ${s.price}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500
                      ${bookingData.service === s.id ? 'bg-brand-gold border-brand-gold text-brand-black' : 'border-black/5 group-hover:border-brand-gold'}`}>
                      <ChevronRight size={20} />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-12 reveal">
                <div className="bg-white/40 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 space-y-8 shadow-xl shadow-black/[0.02]">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold flex items-center gap-2">
                      <CalendarIcon size={14} /> Select Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full bg-transparent text-4xl font-black uppercase tracking-tighter outline-none focus:text-brand-gold transition-colors"
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      value={bookingData.date}
                    />
                  </div>

                  {bookingData.date && (
                    <div className="pt-8 border-t border-black/5 space-y-6 reveal">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold flex items-center gap-2">
                        <Clock size={14} /> Available Times
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setBookingData({...bookingData, time: slot})}
                            className={`py-4 rounded-2xl font-black text-xs tracking-widest transition-all duration-300
                              ${bookingData.time === slot 
                                ? 'bg-brand-black text-white shadow-xl shadow-brand-black/20 scale-105' 
                                : 'bg-white border border-black/5 hover:border-brand-gold hover:text-brand-gold'}`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  disabled={!bookingData.time}
                  onClick={nextStep}
                  className="w-full bg-brand-black text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-brand-gold disabled:opacity-20 transition-all duration-500"
                >
                  Continue to Personal Details
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 reveal">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-gold px-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
                      <input 
                        type="text" 
                        placeholder="Jane"
                        className="w-full bg-white/40 backdrop-blur-md border border-white/20 p-6 pl-14 rounded-2xl font-bold outline-none focus:border-brand-gold transition-all"
                        onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})}
                        value={bookingData.firstName}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-gold px-2">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe"
                      className="w-full bg-white/40 backdrop-blur-md border border-white/20 p-6 rounded-2xl font-bold outline-none focus:border-brand-gold transition-all"
                      onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})}
                      value={bookingData.lastName}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-gold px-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
                      <input 
                        type="email" 
                        placeholder="jane.doe@example.com"
                        className="w-full bg-white/40 backdrop-blur-md border border-white/20 p-6 pl-14 rounded-2xl font-bold outline-none focus:border-brand-gold transition-all"
                        onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                        value={bookingData.email}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-gold px-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
                      <input 
                        type="tel" 
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-white/40 backdrop-blur-md border border-white/20 p-6 pl-14 rounded-2xl font-bold outline-none focus:border-brand-gold transition-all"
                        onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                        value={bookingData.phone}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-brand-black text-white p-10 rounded-[3rem] relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl" />
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-3 text-brand-gold">
                      <CreditCard size={20} />
                      <span className="font-black text-[10px] uppercase tracking-[0.3em]">Secure Deposit</span>
                    </div>
                    <p className="text-xl font-medium leading-tight">
                      A <span className="text-brand-gold text-2xl font-black italic">$30.00</span> non-refundable deposit is required to secure your slot. 
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Remaining balance will be due at the studio.</p>
                  </div>
                </div>

                <button 
                  disabled={!isFormComplete || loading}
                  onClick={handlePayment}
                  className="w-full bg-brand-gold text-brand-black py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-2xl shadow-brand-gold/20"
                >
                  {loading ? "Redirecting to Stripe..." : "Confirm & Pay Deposit"}
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
            <div className="bg-white/60 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-black/40 border-b border-black/5 pb-4">
                Booking Summary
              </h4>
              
              {selectedService ? (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-2xl font-black uppercase italic leading-none">{selectedService.name}</p>
                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{selectedService.duration / 60} Hours Session</p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-black/5">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                      <CalendarIcon size={14} className="text-brand-gold" />
                      {bookingData.date || "Date to be selected"}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                      <Clock size={14} className="text-brand-gold" />
                      {bookingData.time || "Slot to be selected"}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                      <MapPin size={14} className="text-brand-gold" />
                      Private Studio, Harlem
                    </div>
                  </div>

                  <div className="pt-6 border-t border-black/5 flex justify-between items-end">
                    <p className="text-[10px] font-black uppercase tracking-widest">Acompte</p>
                    <p className="text-4xl font-black italic tracking-tighter">$30</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs font-medium text-gray-400 italic leading-relaxed">Please select a style to view your reservation details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;