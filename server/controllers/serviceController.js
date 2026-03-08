const Service = require('../models/Service');

// Récupérer tous les services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des services" });
    }
};

// Créer un nouveau service (via Admin Dashboard)
exports.createService = async (req, res) => {
    try {
        const newService = new Service(req.body);
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (err) {
        res.status(400).json({ error: "Impossible de créer le service" });
    }
};

// Supprimer un service (Bouton Poubelle)
exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Service supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la suppression" });
    }
};