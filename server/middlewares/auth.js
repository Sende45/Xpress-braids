const jwt = require('jsonwebtoken');

// 1. Vérifie simplement si l'utilisateur est connecté
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Accès refusé. Token manquant." });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // On stocke les infos décodées (id et role) dans req.auth
    req.auth = {
      userId: decodedToken.id,
      role: decodedToken.role
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Session expirée ou invalide. Veuillez vous reconnecter." });
  }
};

// 2. Vérifie si l'utilisateur possède le rôle 'admin'
const admin = (req, res, next) => {
  if (req.auth && req.auth.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: "Accès interdit. Droits administrateur requis." });
  }
};

module.exports = { protect, admin };