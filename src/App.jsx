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
import AboutUs from './pages/AboutUs'; // New Import
import Contact from './pages/Contact'; // New Import
import AdminDashboard from './pages/AdminDashboard'; 
import ProtectedRoute from './components/ProtectedRoute'; 

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#FDFCF8]">
        
        <Header />

        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutUs />} /> {/* New Route */}
            <Route path="/contact" element={<Contact />} /> {/* New Route */}
            <Route path="/booking" element={<Booking />} />
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
            
            {/* Automatic redirection for /studio */}
            <Route path="/studio" element={<Services />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}