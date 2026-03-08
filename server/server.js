const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});

console.log("Ma clé Stripe :", process.env.STRIPE_SECRET_KEY ? "Chargée ✅" : "Manquante ❌");
console.log("Ma DB URI :", process.env.MONGO_URI ? "Chargée ✅" : "Manquante ❌");