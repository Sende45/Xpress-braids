const Booking = require('../models/Booking');
const User = require('../models/User'); // Vérifie bien le chemin (../ ou ./)
const bcrypt = require('bcryptjs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

// Configuration du transporteur Nodemailer
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

    // A. Gestion de l'utilisateur (on le cherche ou on le crée)
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

    // B. Création de la session de paiement Stripe (30$)
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
          unit_amount: 3000, // 30.00$
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata: {
        userId: user._id.toString(),
        service,
        variant: variant || "N/A",
        date,
        time,
        amount: 30
      },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    // On renvoie l'URL Stripe au front pour redirection
    res.json({ 
      id: session.id, 
      url: session.url, 
      userCreated: isNewUser 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'initialisation du paiement" });
  }
};

// --- 2. RÉCUPÉRER TOUTES LES RÉSERVATIONS (ADMIN) ---
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des données" });
  }
};

// --- 3. METTRE À JOUR LE STATUT + ENVOI MAIL NOTIFICATION ---
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id).populate('user');
    if (!booking) return res.status(404).json({ message: "Réservation introuvable" });

    booking.status = status;
    await booking.save();

    // Envoi de mail automatique si le statut est "Confirmed"
    if (status === 'Confirmed' && booking.user) {
      const mailOptions = {
        from: `"NYC Studio" <${process.env.EMAIL_USER}>`,
        to: booking.user.email,
        subject: '✨ Booking Confirmed - NYC Studio',
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #D4AF37;">
            <h2 style="color: #000;">NYC <span style="color: #D4AF37;">STUDIO.</span></h2>
            <p>Hello <strong>${booking.user.firstName}</strong>,</p>
            <p>Your appointment for <strong>${booking.service}</strong> is now <strong>CONFIRMED</strong>.</p>
            <p>📅 Date: ${booking.date} at ${booking.time}</p>
            <p>The $30 deposit has been successfully processed. See you soon!</p>
          </div>
        `
      };
      await transporter.sendMail(mailOptions);
    }

    res.json({ message: `Status updated to ${status} and email sent.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
};

// --- 4. SUPPRIMER UNE RÉSERVATION (ADMIN) ---
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};