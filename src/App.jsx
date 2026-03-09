import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services'; // Ton Lookbook / Galerie (depuis API)
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Success from './pages/Success';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PriceList from './pages/PriceList'; // Ton Menu de tarifs chic
import AdminDashboard from './pages/AdminDashboard'; 
import ProtectedRoute from './components/ProtectedRoute'; 

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-brand-black font-sans">
        
        <Header />

        <main className="flex-grow">
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<Home />} />
            
            {/* La Gallery (Lookbook dynamique avec images de l'API) */}
            <Route path="/gallery" element={<Services />} /> 
            
            {/* Le Style Menu (Tableau des prix détaillé) */}
            <Route path="/services" element={<PriceList />} /> 
            <Route path="/prices" element={<PriceList />} /> 

            {/* Réservation & Contact */}
            <Route path="/booking" element={<Booking />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Auth & Checkout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/success" element={<Success />} />

            {/* --- Protected Routes --- */}
            
            {/* Client Profile */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />

            {/* Admin Dashboard */}
            <Route 
              path="/admin-control-center" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirection automatique pour l'expérience utilisateur */}
            <Route path="/studio" element={<PriceList />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}