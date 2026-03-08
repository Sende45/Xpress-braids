import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Calendar, Clock, Scissors, ArrowRight } from 'lucide-react';

const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const confirmPayment = async () => {
            if (!sessionId) return;
            try {
                // Appel à ton API pour confirmer le paiement en base de données
                const response = await axios.get(`http://localhost:5000/api/bookings/confirm/${sessionId}`);
                
                if (response.data.success) {
                    setBooking(response.data.booking);
                }
            } catch (error) {
                console.error("Erreur de confirmation", error);
            } finally {
                setLoading(false);
            }
        };

        confirmPayment();
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin mb-4"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold animate-pulse">
                    Securing your appointment...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-cream bg-grain flex items-center justify-center px-6 py-20">
            <div className="max-w-md w-full space-y-8 reveal text-center">
                
                {/* Icone Succès Luxe */}
                <div className="relative inline-block">
                    <div className="w-24 h-24 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-brand-gold/20">
                        <CheckCircle className="text-brand-gold" size={48} strokeWidth={1.5} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-brand-gold/20">
                        <span className="text-xs">✨</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
                        Experience <br /> <span className="text-brand-gold">Confirmed.</span>
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-black/40 max-w-[280px] mx-auto leading-relaxed">
                        Your private studio session is secured. See you in NYC.
                    </p>
                </div>

                {/* Carte de Récapitulatif Dynamique */}
                {booking && (
                    <div className="bg-white/40 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] text-left space-y-6 shadow-2xl">
                        <div className="flex items-center gap-4 pb-4 border-b border-brand-black/5">
                            <div className="p-3 bg-brand-black rounded-2xl text-brand-gold">
                                <Scissors size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Service Selected</p>
                                <p className="font-black uppercase italic text-sm">{booking.service}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-brand-black/40">
                                    <Calendar size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Date</span>
                                </div>
                                <p className="font-bold text-xs uppercase">{booking.date}</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-brand-black/40">
                                    <Clock size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Time</span>
                                </div>
                                <p className="font-bold text-xs uppercase">{booking.time}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-brand-black/5">
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-black/30">
                                Transaction ID: <span className="text-brand-black/60">{sessionId?.substring(0, 18)}...</span>
                            </p>
                        </div>
                    </div>
                )}

                <div className="space-y-4 pt-4">
                    <Link 
                        to="/profile" 
                        className="w-full bg-brand-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-brand-gold hover:text-brand-black transition-all duration-500 shadow-xl flex items-center justify-center gap-3 group"
                    >
                        View My Dashboard
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <Link 
                        to="/" 
                        className="block text-[10px] font-black uppercase tracking-widest text-brand-black/40 hover:text-brand-gold transition-colors underline underline-offset-8"
                    >
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Success;