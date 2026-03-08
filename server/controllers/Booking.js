const Booking = require('../models/Booking');
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

// --- CONFIGURATION NODEMAILER ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// --- 1. CRÉATION RÉSERVATION HYBRIDE + STRIPE ---
exports.createHybridBooking = async (req, res) => {
  try {
    const { firstName, lastName, email, service, variant, date, time } = req.body;

    if (!email || !firstName) {
      return res.status(400).json({ error: "Données manquantes." });
    }

    // A. Gestion de l'utilisateur
    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const temporaryPassword = await bcrypt.hash("Welcome123!", salt); 
      
      user = new User({
        firstName,
        lastName,
        email,
        password: temporaryPassword,
        role: 'client'
      });
      await user.save();
      isNewUser = true;
    }

    // B. Création session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { 
            name: `Acompte Réservation - ${service}`,
            description: `Rendez-vous le ${date} à ${time}` 
          },
          unit_amount: 3000, 
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata: { userId: user._id.toString(), service, date, time },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    // C. Enregistrement (Statuts en Anglais pour matcher le Dashboard)
    const newBooking = new Booking({
      user: user._id,
      service,
      variant: variant || "N/A",
      date,
      time,
      status: 'Pending', // Harmonisé
      paymentStatus: 'Unpaid', // Harmonisé
      sessionId: session.id 
    });
    await newBooking.save();

    res.json({ id: session.id, url: session.url, userCreated: isNewUser });

  } catch (err) {
    console.error("❌ Error Booking:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// --- 2. CONFIRMATION DU PAIEMENT ---
exports.confirmPayment = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const updatedBooking = await Booking.findOneAndUpdate(
        { sessionId: sessionId },
        { status: 'Confirmed', paymentStatus: 'Paid', depositPaid: true },
        { new: true }
      ).populate('user');

      if (!updatedBooking) return res.status(404).json({ error: "Booking not found." });

      return res.status(200).json({ success: true, booking: updatedBooking });
    }
    res.status(400).json({ error: "Payment not completed." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- 3. TOUTES LES RÉSERVATIONS (ADMIN) ---
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Database error." });
  }
};

// --- 4. UPDATE STATUS + EMAIL ---
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id).populate('user');
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    // Envoi Mail si Confirmé
    if (status === 'Confirmed' && booking.user?.email) {
      try {
        await transporter.sendMail({
          from: `"NYC Studio" <${process.env.EMAIL_USER}>`,
          to: booking.user.email,
          subject: '✨ Appointment Confirmed - NYC Studio',
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 2px solid #D4AF37; max-width: 500px;">
              <h2 style="color: #000;">NYC <span style="color: #D4AF37;">STUDIO.</span></h2>
              <p>Hello <strong>${booking.user.firstName}</strong>,</p>
              <p>Your appointment for <strong>${booking.service}</strong> is <strong>CONFIRMED</strong>.</p>
              <p>📅 ${booking.date} at ${booking.time}</p>
              <p style="color: #666; font-size: 12px;">The $30 deposit has been secured. See you soon!</p>
            </div>
          `
        });
      } catch (mailErr) {
        console.error("📧 Mail Error:", mailErr.message);
      }
    }

    res.json({ success: true, message: `Status: ${status}` });
  } catch (err) {
    res.status(500).json({ error: "Update failed." });
  }
};

// --- 5. DELETE ---
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed." });
  }
};