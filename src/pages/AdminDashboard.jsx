import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, Calendar, DollarSign, CheckCircle, XCircle, 
  Search, TrendingUp, ShieldCheck, Mail, Clock, 
  ChevronRight, ArrowUpRight, Trash2, Filter, Plus, Camera, Image as ImageIcon,
  Loader2, UploadCloud
} from 'lucide-react';

const AdminDashboard = () => {
  const { token } = useAuth();
  
  // --- CONFIGURATION DYNAMIQUE CORRIGÉE ---
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  
  // Cette ligne retire proprement "/api/auth" de l'URL pour éviter les doublons 404
  const CLEAN_BASE = API_URL.replace(/\/api\/auth\/?$/, "").replace(/\/$/, "");

  // États pour les données
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // États pour l'UI
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('bookings'); 

  // État pour le nouveau service
  const [newService, setNewService] = useState({
    name: '', price: '', description: '', category: 'Tresses', image: '', duration: '60 min'
  });

  const IMGBB_API_KEY = '35bb74e2910fc59f0f0e4e2ad6c87935';

  useEffect(() => {
    if (token) {
      fetchAllData();
      fetchServices();
    }
  }, [token]);

  // --- LOGIQUE API ---

  const fetchAllData = async () => {
    try {
      const response = await fetch(`${CLEAN_BASE}/api/bookings/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) setBookings(await response.json());
    } catch (err) { console.error("Erreur bookings", err); }
    finally { setLoading(false); }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`${CLEAN_BASE}/api/services`);
      if (response.ok) setServices(await response.json());
    } catch (err) { console.error("Erreur services", err); }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${CLEAN_BASE}/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
      }
    } catch (err) { alert("Erreur lors de la mise à jour"); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setNewService({ ...newService, image: data.data.url });
      }
    } catch (err) {
      alert("Erreur lors de l'upload de l'image");
    } finally {
      setUploading(false);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    if (!newService.image) return alert("Veuillez uploader une image d'abord.");

    try {
      const response = await fetch(`${CLEAN_BASE}/api/services`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(newService)
      });
      if (response.ok) {
        fetchServices();
        setNewService({ name: '', price: '', description: '', category: 'Tresses', image: '', duration: '60 min' });
        alert("Service publié avec succès !");
      }
    } catch (err) { alert("Erreur lors de la création"); }
  };

  const deleteService = async (id) => {
    if(!window.confirm("Supprimer ce service de la galerie ?")) return;
    try {
      const response = await fetch(`${CLEAN_BASE}/api/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) setServices(services.filter(s => s._id !== id));
    } catch (err) { alert("Erreur suppression"); }
  };

  // --- CALCULS STATS ---
  const revenue = bookings.filter(b => b.depositPaid).reduce((acc, curr) => acc + 30, 0);
  const pending = bookings.filter(b => b.status === 'Pending').length;
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length;

  const filteredBookings = bookings.filter(b => 
    b.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.service?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-500">Master System Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/5">
              <ShieldCheck size={12} className="text-pink-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-pink-500">Root Admin Access</span>
            </div>
            <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-none">
              Control <br /> <span className="text-pink-500">{activeTab === 'bookings' ? 'Center' : 'Studio'}</span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
            <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-pink-500" size={16} />
              <input 
                type="text" 
                placeholder="SEARCH DATABASE..." 
                className="bg-white/5 border border-white/10 py-4 pl-12 pr-8 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-pink-500 w-full md:w-64 transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'bookings' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'text-white/40 hover:text-white'}`}
              >
                Bookings
              </button>
              <button 
                onClick={() => setActiveTab('gallery')}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'gallery' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'text-white/40 hover:text-white'}`}
              >
                Gallery
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'bookings' ? (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatBox label="Revenue (Deposits)" value={`$${revenue}`} icon={<DollarSign size={18}/>} sub="Total Fixed Intake" />
              <StatBox label="Confirmed" value={confirmed} icon={<Calendar size={18}/>} sub="Active Sessions" />
              <StatBox label="Queue" value={pending} icon={<Clock size={18}/>} sub="Waiting Approval" />
            </div>

            {/* BOOKINGS LIST */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] italic text-pink-500">Registry Stream</h2>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/20">
                  <span className="text-pink-500">{filteredBookings.length}</span> Entries Found
                </div>
              </div>

              <div className="grid gap-4">
                {filteredBookings.map((b) => (
                  <div key={b._id} className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/5  p-6 md:p-8 rounded-[2.5rem] transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-black border border-white/10 rounded-2xl flex items-center justify-center text-pink-500 font-black text-xl group-hover:rotate-6 transition-transform shadow-lg shadow-pink-500/5">
                          {b.user?.firstName?.[0] || 'U'}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-black uppercase tracking-tight text-lg">{b.user?.firstName} {b.user?.lastName}</h3>
                            <StatusBadge status={b.status} />
                          </div>
                          <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-white/40">
                            <span className="flex items-center gap-1.5 hover:text-white transition-colors"><Mail size={12}/> {b.user?.email}</span>
                            <span className="flex items-center gap-1.5 text-pink-500/70"><TrendingUp size={12}/> {b.service}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col gap-8 md:gap-2">
                        <div className="space-y-1">
                          <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Schedule</p>
                          <p className="text-xs font-bold uppercase">{b.date} <span className="text-pink-500 mx-2">/</span> {b.time}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Security Deposit</p>
                          <p className={`text-xs font-bold uppercase ${b.depositPaid ? 'text-green-500' : 'text-red-500'}`}>
                            {b.depositPaid ? '$30.00 SECURED' : 'PENDING'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <ActionButton 
                          onClick={() => updateStatus(b._id, 'Confirmed')} 
                          icon={<CheckCircle size={18}/>} 
                          label="Approve" 
                          color="hover:text-green-500 hover:bg-green-500/10" 
                        />
                        <ActionButton 
                          onClick={() => updateStatus(b._id, 'Cancelled')} 
                          icon={<XCircle size={18}/>} 
                          label="Reject" 
                          color="hover:text-red-500 hover:bg-red-500/10" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-right-4 duration-700">
            {/* ADD SERVICE FORM */}
            <div className="lg:col-span-1">
              <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] sticky top-32">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-pink-500 mb-8">Add Portfolio Asset</h3>
                <form onSubmit={handleAddService} className="space-y-4">
                  <div className="relative group mb-6">
                    <input 
                      type="file" id="img-upload" className="hidden" 
                      onChange={handleImageUpload} accept="image/*"
                    />
                    <label 
                      htmlFor="img-upload"
                      className="flex flex-col items-center justify-center gap-4 w-full aspect-video bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-pink-500/50 transition-all overflow-hidden shadow-pink-500/5"
                    >
                      {newService.image ? (
                        <img src={newService.image} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <>
                          {uploading ? <Loader2 className="animate-spin text-pink-500" /> : <UploadCloud className="text-white/20" />}
                          <span className="text-[8px] font-black uppercase tracking-widest">Select Work Photo</span>
                        </>
                      )}
                    </label>
                  </div>

                  <input 
                    type="text" placeholder="SERVICE NAME" 
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-pink-500"
                    value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="number" placeholder="PRICE ($)" 
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-pink-500"
                      value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} required
                    />
                    <select 
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-pink-500 text-white"
                      value={newService.category} 
                      onChange={e => setNewService({...newService, category: e.target.value})}
                    >
                      <option value="Tresses" className="bg-white text-black font-sans">Tresses</option>
                      <option value="Soins" className="bg-white text-black font-sans">Soins</option>
                      <option value="Coupe" className="bg-white text-black font-sans">Coupe</option>
                    </select>
                  </div>

                  <textarea 
                    placeholder="WORK DESCRIPTION" rows="3"
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-pink-500"
                    value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})}
                  />
                  
                  <button 
                    disabled={uploading}
                    type="submit" 
                    className="w-full bg-pink-500 text-white font-black uppercase tracking-[0.2em] py-5 rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-pink-500/20"
                  >
                    {uploading ? 'Processing Image...' : 'Deploy to Gallery'}
                  </button>
                </form>
              </div>
            </div>

            {/* SERVICES LIST */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div key={service._id} className="group relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-pink-500/30 transition-all">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
                  </div>
                  <div className="p-8 flex justify-between items-center bg-gradient-to-t from-black to-transparent">
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-xl">{service.name}</h4>
                      <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">${service.price} — {service.duration}</p>
                    </div>
                    <button 
                      onClick={() => deleteService(service._id)}
                      className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const StatBox = ({ label, value, icon, sub }) => (
  <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[3rem] hover:border-pink-500/40 transition-all group shadow-pink-500/5">
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-black rounded-2xl text-pink-500 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/10">{icon}</div>
      <ArrowUpRight size={14} className="text-white/10 group-hover:text-pink-500 transition-colors" />
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{label}</p>
    <div className="flex items-baseline gap-2 mt-1">
      <p className="text-4xl font-black italic tracking-tighter">{value}</p>
      <span className="text-[8px] font-black uppercase tracking-widest text-pink-500/60">{sub}</span>
    </div>
  </div>
);

const ActionButton = ({ icon, label, onClick, color }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 text-[9px] font-black uppercase tracking-widest transition-all ${color}`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: 'text-green-500 border-green-500/20 bg-green-500/5',
    Pending: 'text-orange-500 border-orange-500/20 bg-orange-500/5',
    Cancelled: 'text-red-500 border-red-500/20 bg-red-500/5'
  };
  return (
    <span className={`px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
};

export default AdminDashboard;