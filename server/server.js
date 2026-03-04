require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); // Sécurise les headers HTTP
const rateLimit = require('express-rate-limit'); // Empêche le spam des routes
const morgan = require('morgan'); // Affiche les logs de requêtes dans la console

const app = express();

// --- 1. SÉCURITÉ & PERFORMANCE (Middlewares) ---
app.use(helmet()); // Protection contre les failles XSS et injections
app.use(morgan('dev')); // Log chaque requête (ex: GET /api/bookings 200)
app.use(express.json({ limit: '10kb' })); // Limite la taille du JSON pour éviter les attaques DoS

// Configuration du Rate Limiting (Anti-Spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  message: { error: "Trop de requêtes, réessayez plus tard." }
});
app.use('/api/', limiter);

// Configuration CORS
app.use(cors({
    origin: ['https://xpress-braids.vercel.app', 'http://localhost:3000'], 
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Ajout de PATCH pour tes updates de statut
    credentials: true
}));

// --- 2. CONNEXION MONGODB ---
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("✅ NYC Studio Database: Online"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// --- 3. ROUTES ---
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// --- 4. GESTION DES ROUTES INEXISTANTES (404) ---
app.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée sur le serveur NYC Studio" });
});

// --- 5. GESTION DES ERREURS GLOBALES ---
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(`[ERROR] ${err.message}`);
    res.status(statusCode).json({ 
        error: err.message || "Erreur interne du serveur",
        stack: process.env.NODE_ENV === 'development' ? err.stack : null 
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 NYC Studio Server running in ${process.env.NODE_ENV || 'dev'} mode on port ${PORT}`);
});