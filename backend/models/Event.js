const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true }, // Keeping simple string for date or Date object
    time: { type: String, required: true },
    venue: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    bookedSeats: { type: Number, default: 0 },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageURL: { type: String, default: 'https://via.placeholder.com/300' }
}, { timestamps: true });

// Pre-save hook removed to avoid next() issues. Logic moved to controller.

module.exports = mongoose.model('Event', eventSchema);
