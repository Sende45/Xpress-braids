const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Le nom de la prestation est obligatoire"],
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, "La description est nécessaire pour rassurer la cliente"] 
  },
  price: { 
    type: Number, 
    required: true 
  },
  duration: { 
    type: String, 
    required: true,
    default: "60 min" 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Tresses', 'Coloration', 'Coupe', 'Soin', 'Studio'] // Pour éviter les erreurs de frappe
  },
  image: { 
    type: String, 
    required: [true, "Une photo est indispensable pour la galerie"] 
  },
}, { 
  timestamps: true // Ajoute automatiquement 'createdAt' et 'updatedAt'
});

// Pour éviter l'erreur "OverwriteModelError" si nodemon redémarre trop vite
module.exports = mongoose.models.Service || mongoose.model('Service', serviceSchema);