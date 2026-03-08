require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit'); 
const morgan = require('morgan'); 
const path = require('path'); // Nécessaire pour servir les fichiers statiques si besoin

const app = express();

// --- 1. SÉCURITÉ & PERFORMANCE ---
app.use(helmet({
    crossOriginResourcePolicy: false, // Permet d'afficher les images de domaines tiers (ImgBB)
})); 
app.use(morgan('dev')); 
app.use(express.json({ limit: '10kb' })); 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { error: "Trop de requêtes, réessayez plus tard." }
});
app.use('/api/', limiter);

app.use(cors({
    origin: [
      'https://xpress-braids.vercel.app', 
      'http://localhost:3000', 
      'http://localhost:5173' 
    ], 
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], 
    credentials: true
}));

// --- 2. CONNEXION MONGODB ---
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ ERREUR FATALE : MONGO_URI non définie !");
    process.exit(1); 
}

mongoose.connect(mongoURI)
  .then(() => console.log("✅ NYC Studio Database: Online"))
  .catch(err => {
    console.error("❌ DB Connection Error:", err.message);
  });

// --- 3. ROUTES ---
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const serviceRoutes = require('./routes/services'); 

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes); 

// Optionnel : Servir un dossier uploads si tu décides de stocker localement
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- 4. GESTION DES ERREURS ---
app.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée sur le serveur NYC Studio" });
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ 
        error: err.message || "Erreur interne du serveur",
        stack: process.env.NODE_ENV === 'development' ? err.stack : null 
    });
});

module.exports = app;