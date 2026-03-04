const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Vérifie bien le chemin vers ton modèle
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- LOGIQUE GÉNÉRATION TOKEN ---
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1d' }
  );
};

// --- ROUTE : INSCRIPTION (POST /api/auth/register) ---
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validation de base
    if (!email || !password) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) return res.status(400).json({ message: "Utilisateur déjà existant" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'client' // Role par défaut
    });

    await user.save();

    const token = generateToken(user);
    res.status(201).json({ 
      token, 
      user: { id: user._id, firstName, lastName, email: user.email, role: user.role } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur lors de l'inscription" });
  }
});

// --- ROUTE : CONNEXION (POST /api/auth/login) ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // On cherche l'utilisateur
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: "Identifiants invalides" });

    // On compare le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Identifiants invalides" });

    const token = generateToken(user);

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur lors de la connexion" });
  }
});

module.exports = router;