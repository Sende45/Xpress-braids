import React, { useEffect, useState } from 'react';
import { 
  Users, Calendar, DollarSign, CheckCircle, XCircle, 
  Search, Filter, MoreVertical, ExternalLink, Loader2
} from 'lucide-react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Récupération des données depuis MongoDB
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings/all', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      console.error("Erreur API:", err);
      setLoading(false);
    }
  };

  // 2. Actions : Valider, Annuler, Supprimer
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        // Mise à jour locale de l'interface
        setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
        alert(`Statut mis à jour : ${newStatus}. Un mail automatique a été envoyé au client.`);
      }
    } catch (err) {
      alert("Erreur lors de la mise à jour");
    }
  };

  // 3. Calcul des stats réelles
  const totalRevenue = bookings
    .filter(b => b.depositPaid)
    .reduce((acc, curr) => acc + 30, 0);

  const activeClients = new Set(bookings.map(b => b.user?._id)).size;
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;

  const filteredBookings = bookings.filter(b => 
    b.user?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <Loader2 className="text-brand-gold animate-spin" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Admin */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Administrative Access</span>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter">Studio <span className="text-brand-gold">Control.</span></h1>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                type="text" 
                placeholder="Search booking..." 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 py-3 pl-12 pr-6 rounded-xl text-xs font-bold outline-none focus:border-brand-gold transition-all" 
              />
            </div>
          </div>
        </div>

        {/* Stats Grid - Données réelles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Revenue (Deposits)" value={`$${totalRevenue}`} icon={<DollarSign size={20}/>} trend="+12%" />
          <StatCard label="Unique Clients" value={activeClients} icon={<Users size={20}/>} trend="+5%" />
          <StatCard label="Pending Approval" value={pendingCount} icon={<Calendar size={20}/>} trend="-2%" />
        </div>

        {/* Bookings Table */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden">
          <div className="p-8 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-black uppercase tracking-widest italic">Live Appointments</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] font-black uppercase tracking-widest text-white/20">
                <tr>
                  <th className="p-8">Client</th>
                  <th className="p-8">Service</th>
                  <th className="p-8">Deposit</th>
                  <th className="p-8">Status</th>
                  <th className="p-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-8">
                      <div className="flex flex-col">
                        <span className="uppercase">{booking.user?.firstName} {booking.user?.lastName}</span>
                        <span className="text-[10px] text-white/40">{booking.user?.email}</span>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex flex-col">
                        <span>{booking.service}</span>
                        <span className="text-[10px] text-brand-gold">{booking.date} @ {booking.time}</span>
                      </div>
                    </td>
                    <td className="p-8">
                      {booking.depositPaid ? 
                        <span className="text-green-500 text-[10px] border border-green-500/30 px-2 py-1 rounded">$30 PAID</span> : 
                        <span className="text-red-500 text-[10px] border border-red-500/30 px-2 py-1 rounded">UNPAID</span>
                      }
                    </td>
                    <td className="p-8">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="p-8">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => updateStatus(booking._id, 'Confirmed')}
                          className="p-2 hover:text-green-500 transition-colors" title="Confirm Booking">
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => updateStatus(booking._id, 'Cancelled')}
                          className="p-2 hover:text-red-500 transition-colors" title="Cancel Booking">
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sous-composants pour la propreté
const StatCard = ({ label, value, icon, trend }) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-brand-gold/50 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-brand-gold/10 rounded-2xl text-brand-gold">{icon}</div>
      <span className="text-[10px] font-black text-green-400">{trend}</span>
    </div>
    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</p>
    <p className="text-3xl font-black italic mt-1">{value}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: 'bg-green-500/10 text-green-500',
    Pending: 'bg-orange-500/10 text-orange-500',
    Cancelled: 'bg-red-500/10 text-red-500'
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
};

export default AdminDashboard;