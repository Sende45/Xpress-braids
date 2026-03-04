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
import AdminDashboard from './pages/AdminDashboard'; // Import de la page Admin
import ProtectedRoute from './components/ProtectedRoute'; // Import du garde-barrière

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        
        <Header />

        <main className="flex-grow">
          <Routes>
            {/* --- Routes Publiques --- */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* --- Routes Protégées (Utilisateurs connectés) --- */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />

            {/* --- Route Admin (Admin uniquement) --- */}
            <Route 
              path="/admin-control-center" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}