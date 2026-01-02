const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.createBooking = async (req, res) => {
    const { name, email, eventId, seatsBooked } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.availableSeats < seatsBooked) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        // Create booking
        const booking = new Booking({
            name,
            email,
            eventId,
            seatsBooked
        });

        await booking.save();

        // Update event seats
        event.bookedSeats += Number(seatsBooked);
        event.availableSeats -= Number(seatsBooked);
        await event.save();

        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
