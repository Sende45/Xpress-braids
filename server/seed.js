// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const services = [
  {
    name: 'Knotless Braids',
    description: 'Tresses ultra-légères et naturelles. Protection maximale pour vos racines.',
    price: 180,
    duration: '4-6h',
    category: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1646038855662-791834927902?q=80&w=800'
  },
  {
    name: 'Classic Box Braids',
    description: 'Le style iconique, propre et durable. Disponible en plusieurs tailles.',
    price: 150,
    duration: '5h',
    category: 'Classic',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=800'
  },
  {
    name: 'Feed-in Cornrows',
    description: 'Des lignes parfaites et un look sophistiqué pour toutes les occasions.',
    price: 85,
    duration: '1.5h',
    category: 'Express',
    image: 'https://images.unsplash.com/photo-1605497745244-5c34569732a1?q=80&w=800'
  },
  {
    name: 'Bohemian Braids',
    description: 'Mélange de tresses et de boucles pour un volume décontracté et chic.',
    price: 220,
    duration: '6h',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=800'
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Service.deleteMany(); // Nettoie la collection
    await Service.insertMany(services);
    console.log("✅ Services insérés avec succès dans NYC Studio !");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });