const express = require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/Booking');

// Route client (Stripe)
router.post('/create-hybride', bookingCtrl.createHybridBooking);

// Routes Admin (Dashboard)
router.get('/all', bookingCtrl.getAllBookings);
router.patch('/:id/status', bookingCtrl.updateStatus);
router.delete('/:id', bookingCtrl.deleteBooking);

module.exports = router;