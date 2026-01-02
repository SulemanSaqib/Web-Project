const Event = require('../models/Event');

// Get all events with optional filtering
exports.getEvents = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const events = await Event.find(query);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single event
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new event
exports.createEvent = async (req, res) => {
    try {
        let { title, description, date, time, venue, totalSeats, price, category, imageURL } = req.body;

        // Convert types
        totalSeats = parseInt(totalSeats);
        price = parseFloat(price);

        // Handle empty imageURL to allow default
        if (!imageURL || imageURL.trim() === '') {
            imageURL = undefined;
        }

        const event = new Event({
            title, description, date, time, venue, totalSeats,
            availableSeats: (totalSeats - 0), // Explicitly set initial available seats
            price, category, imageURL
        });

        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        Object.assign(event, req.body);

        // Recalculate available seats logic handled in pre-save or manually here if needed.
        // For simplicity Mongoose pre-save handles strict math if fields strictly modified
        // verifying valid availableSeats vs booked
        if (event.totalSeats < event.bookedSeats) {
            return res.status(400).json({ message: 'Total seats cannot be less than booked seats' });
        }
        event.availableSeats = event.totalSeats - event.bookedSeats;

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
