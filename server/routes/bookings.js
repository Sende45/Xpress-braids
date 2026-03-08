const express = require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/Booking');

// MODIFICATION ICI : On extrait 'protect' et 'admin'
const { protect, admin } = require('../middlewares/auth');

router.post('/create-hybride', bookingCtrl.createHybridBooking);
router.get('/confirm/:sessionId', bookingCtrl.confirmPayment);

// On utilise 'protect' pour vérifier la connexion 
// Et 'admin' pour vérifier les droits sur les routes sensibles
router.get('/all', protect, admin, bookingCtrl.getAllBookings); 
router.patch('/:id/status', protect, admin, bookingCtrl.updateStatus);
router.delete('/:id', protect, admin, bookingCtrl.deleteBooking);

module.exports = router;