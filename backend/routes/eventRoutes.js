const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', createEvent); // Add auth middleware here if needed
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
