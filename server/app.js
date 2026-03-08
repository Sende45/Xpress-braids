require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit'); 
const morgan = require('morgan'); 

const app = express();

// --- 1. SÉCURITÉ & PERFORMANCE ---
app.use(helmet({
    crossOriginResourcePolicy: false, 
})); 
app.use(morgan('dev')); 
app.use(express.json({ limit: '10kb' })); 

// Limiteur de requêtes pour protéger l'API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { error: "Trop de requêtes, réessayez plus tard." }
});
app.use('/api/', limiter);

// Configuration CORS mise à jour pour inclure les domaines de dev et de prod
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

// ✅ AJOUT : Route de base pour corriger le "HEAD / 404" sur Render
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: "success", 
        message: "API Xpress-braids (NYC Studio) est en ligne" 
    });
});

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const serviceRoutes = require('./routes/services'); 

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes); 

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