import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Success from './pages/Success';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PriceList from './pages/PriceList'; // Import de la nouvelle page de tarifs
import AdminDashboard from './pages/AdminDashboard'; 
import ProtectedRoute from './components/ProtectedRoute'; 

export default function App() {
  return (
    <AuthProvider>
      {/* Changement de la couleur de fond pour matcher le thème Noir/Rose si besoin */}
      <div className="min-h-screen flex flex-col bg-brand-black">
        
        <Header />

        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
            {/* Menu des tarifs / Galerie de styles */}
            <Route path="/services" element={<PriceList />} /> 
            
            {/* Page de réservation (reçoit le paramètre ?service=...) */}
            <Route path="/booking" element={<Booking />} />
            
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/success" element={<Success />} />

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
            
            {/* Redirections automatiques */}
            <Route path="/studio" element={<PriceList />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}