const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Lien vers le client
  service: { type: String, required: true },
  variant: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Confirmed, Cancelled
  amount: { type: Number },
  depositPaid: { type: Boolean, default: false }
});

module.exports = mongoose.model('Booking', BookingSchema);