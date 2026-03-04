const User = require('../models/User'); // Correction du chemin si nécessaire
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper pour générer le token (évite la répétition)
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // 24 heures pour une session confortable
  );
};

// --- INSCRIPTION ---
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 1. Validation de base
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Le mot de passe doit faire au moins 6 caractères" });
    }

    // 2. Vérification existence
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) return res.status(400).json({ message: "Cet email est déjà utilisé" });

    // 3. Hashage
    const salt = await bcrypt.genSalt(12); // Salt légèrement plus fort
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Création
    user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'client' // Par défaut, tout le monde est client
    });

    await user.save();

    // 5. Réponse avec Token
    const token = generateToken(user);
    res.status(201).json({ 
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
    console.error("Register Error:", err);
    res.status(500).json({ error: "Erreur lors de la création du compte" });
  }
};

// --- CONNEXION ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Chercher l'utilisateur (on force le lowercase pour éviter les erreurs de saisie)
    const user = await User.findOne({ email: email.toLowerCase() });
    
    // 2. Sécurité : Message générique pour ne pas aider les hackers
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // 3. Vérification mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // 4. Génération Token
    const token = generateToken(user);

    // 5. Réponse
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email, 
        role: user.role // Crucial pour ton AdminDashboard sur le Front
      } 
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Problème de connexion au serveur" });
  }
};