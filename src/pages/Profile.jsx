import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, Calendar, Clock, MapPin, ChevronRight, LogOut, 
  CreditCard, Settings, History, Sparkles, CheckCircle2, ArrowUpRight 
} from 'lucide-react';

const Profile = () => {
  const { user, logout, loading } = useAuth();

  // 1. Loading state to prevent flicker
  if (loading) return null;

  // 2. Security: If no user is logged in, redirect to Login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Mock appointments for now (These will come from MongoDB later)
  const upcomingAppointments = [
    {
      id: 'bk-9921',
      service: 'Knotless Braids',
      variant: 'Medium / Waist Length',
      date: 'March 15, 2026',
      time: '10:00 AM',
      status: 'Confirmed',
      price: 180,
      deposit: 25
    }
  ];

  const pastAppointments = [
    { id: 'bk-8802', service: 'Cornrows', date: 'Jan 12, 2026', price: 85 },
    { id: 'bk-7741', service: 'Box Braids', date: 'Nov 20, 2025', price: 150 },
  ];

  return (
    <div className="min-h-screen bg-brand-cream bg-grain pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Membership Dashboard</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
            Welcome, <span className="text-transparent stroke-text">{user.firstName || 'Guest'}.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* --- SIDEBAR : PROFILE CARD --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/40 backdrop-blur-xl border border-white p-10 rounded-[3rem] shadow-xl shadow-black/[0.02] reveal">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-brand-gold blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  {/* Avatar with fallback to User Icon */}
                  {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="relative w-32 h-32 rounded-full border-4 border-white shadow-2xl" />
                  ) : (
                    <div className="relative w-32 h-32 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-2xl text-brand-gold">
                       <User size={48} />
                    </div>
                  )}
                  <button className="absolute bottom-1 right-1 bg-brand-black text-white p-2.5 rounded-full border-4 border-white hover:bg-brand-gold transition-colors">
                    <Settings size={16} />
                  </button>
                </div>
                
                <div>
                  <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{user.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full pt-8 border-t border-black/5">
                  <div className="space-y-1">
                    <p className="text-2xl font-black italic">12</p>
                    <p className="text-[9px] text-brand-gold font-black uppercase tracking-[0.2em]">Styles Done</p>
                  </div>
                  <div className="space-y-1 border-l border-black/5">
                    <p className="text-2xl font-black italic text-brand-black/40">VIP</p>
                    <p className="text-[9px] text-brand-gold font-black uppercase tracking-[0.2em]">Status</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Links */}
            <div className="bg-brand-black rounded-[2.5rem] p-8 text-white space-y-3 reveal">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold mb-4">Account Security</p>
              
              <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group text-white/70">
                <span className="flex items-center gap-4 font-bold text-xs uppercase tracking-widest group-hover:text-white">
                  <CreditCard size={18} /> Payment Methods
                </span>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group text-white/70">
                <span className="flex items-center gap-4 font-bold text-xs uppercase tracking-widest group-hover:text-white">
                  <Sparkles size={18} /> Loyalty Rewards
                </span>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>

              <button 
                onClick={logout}
                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-red-500/10 transition-all group text-red-400"
              >
                <span className="flex items-center gap-4 font-bold text-xs uppercase tracking-widest">
                  <LogOut size={18} /> Sign Out
                </span>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          {/* --- MAIN CONTENT : APPOINTMENTS --- */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Upcoming Appointment */}
            <section className="reveal">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                    <Calendar size={20} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-widest italic">Next Session</h3>
                </div>
                <Link to="/booking" className="text-[10px] font-black uppercase tracking-widest border-b-2 border-brand-gold pb-1 hover:text-brand-gold transition-colors">Book another style</Link>
              </div>

              {upcomingAppointments.map((appt) => (
                <div key={appt.id} className="group relative bg-white rounded-[3rem] p-10 shadow-xl shadow-black/[0.03] border border-black/[0.02] overflow-hidden transition-transform hover:scale-[1.01]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-brand-black text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-brand-gold" /> {appt.status}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase italic">#{appt.id}</span>
                      </div>
                      <h4 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                        {appt.service} <br />
                        <span className="text-brand-gold text-xl md:text-2xl">{appt.variant}</span>
                      </h4>
                    </div>
                    
                    <div className="flex flex-col items-start md:items-end justify-between">
                      <p className="text-5xl font-black italic tracking-tighter">${appt.price}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] italic">Deposit Paid</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pt-10 border-t border-black/5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-black"><Clock size={20} /></div>
                      <div>
                        <p className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em]">Date & Time</p>
                        <p className="font-bold text-sm uppercase">{appt.date} • {appt.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-black"><MapPin size={20} /></div>
                      <div>
                        <p className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em]">Studio Location</p>
                        <p className="font-bold text-sm uppercase border-b border-black/10">Private Studio, Harlem NYC</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Past History */}
            <section className="reveal">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center text-gray-400">
                  <History size={20} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-widest italic text-gray-400">Past Styles</h3>
              </div>
              
              <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/50 overflow-hidden">
                {pastAppointments.map((appt, idx) => (
                  <div 
                    key={appt.id} 
                    className={`flex justify-between items-center p-8 hover:bg-white transition-all group ${idx !== pastAppointments.length - 1 ? 'border-b border-black/5' : ''}`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-brand-gold transition-colors">
                        <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                      </div>
                      <div>
                        <p className="font-black uppercase italic text-lg tracking-tight">{appt.service}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{appt.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black italic text-lg">${appt.price}</p>
                      <p className="text-[9px] font-black text-green-500 uppercase tracking-widest">Completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-text {
          -webkit-text-stroke: 1px #1A1A1A;
          color: transparent;
        }
      `}} />
    </div>
  );
};

export default Profile;