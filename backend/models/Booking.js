const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    seatsBooked: { type: Number, required: true, min: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
