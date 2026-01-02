import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './EventDetails.css';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [booking, setBooking] = useState({ name: '', email: '', seatsBooked: 1 });
    const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }
    const [loading, setLoading] = useState(true);

    // Hardcoded mock data to fallback on if API fails (matching Events.jsx)
    const mockEvents = [
        { _id: 'm1', title: 'AI Summit 2024', date: '2024-03-15', time: '09:00', venue: 'Tech Park', availableSeats: 150, price: 50, category: 'Tech', description: 'Join industry leaders to discuss the future of Artificial Intelligence.', imageURL: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm2', title: 'React Developers Meetup', date: '2024-03-20', time: '18:00', venue: 'Co-work Space', availableSeats: 40, price: 0, category: 'Tech', description: 'A casual meetup for React enthusiasts.', imageURL: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm3', title: 'Cyber Security Workshop', date: '2024-04-05', time: '10:00', venue: 'Uni Lab 1', availableSeats: 25, price: 15, category: 'Tech', description: 'Hands-on workshop on network security.', imageURL: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm4', title: 'Jazz Night', date: '2024-02-14', time: '20:00', venue: 'Blue Note Club', availableSeats: 80, price: 30, category: 'Music', description: 'Smooth jazz evening.', imageURL: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm5', title: 'Indie Rock Festival', date: '2024-05-01', time: '16:00', venue: 'City Park', availableSeats: 500, price: 45, category: 'Music', description: 'Local bands performing live.', imageURL: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm6', title: 'Classical Symphony', date: '2024-03-10', time: '19:00', venue: 'Grand Hall', availableSeats: 200, price: 60, category: 'Music', description: 'Beethoven and Mozart classics.', imageURL: 'https://images.unsplash.com/photo-1507838153414-b4b713384ebd?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm7', title: 'Startup Pitch Night', date: '2024-03-01', time: '18:00', venue: 'Innovation Hub', availableSeats: 100, price: 20, category: 'Business', description: 'Pitch your idea to investors.', imageURL: 'https://images.unsplash.com/photo-1559223607-a43c990ed9aa?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm8', title: 'Marketing Strategy 101', date: '2024-03-12', time: '14:00', venue: 'Business School', availableSeats: 50, price: 0, category: 'Business', description: 'Learn marketing basics.', imageURL: 'https://images.unsplash.com/photo-1556761175-5973d0f98e12?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm9', title: 'Networking Breakfast', date: '2024-02-28', time: '08:00', venue: 'Downtown Cafe', availableSeats: 30, price: 15, category: 'Business', description: 'Connect with professionals over coffee.', imageURL: 'https://images.unsplash.com/photo-1515169067750-d51a73b53861?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm10', title: 'Pottery Masterclass', date: '2024-03-08', time: '11:00', venue: 'Art Studio', availableSeats: 15, price: 40, category: 'Workshop', description: 'Create your own ceramics.', imageURL: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm11', title: 'Photography Basics', date: '2024-03-25', time: '10:00', venue: 'City Library', availableSeats: 20, price: 25, category: 'Workshop', description: 'Learn camera settings and composition.', imageURL: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm12', title: 'Cooking Italian', date: '2024-04-10', time: '17:00', venue: 'Culinary School', availableSeats: 12, price: 55, category: 'Workshop', description: 'Master pasta and pizza.', imageURL: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm13', title: 'Abstract Art Exhibition', date: '2024-03-05', time: '10:00', venue: 'Modern Gallery', availableSeats: 300, price: 10, category: 'Art', description: 'Contemporary abstract art showcase.', imageURL: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm14', title: 'Live Sketching Session', date: '2024-03-18', time: '15:00', venue: 'Central Park', availableSeats: 0, price: 5, category: 'Art', description: 'Outdoor sketching group.', imageURL: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000' },

        // Home page mocks
        { _id: '1', title: 'Annual Tech Symposium', date: '2023-12-15', time: '09:00', venue: 'Main Auditorium', availableSeats: 120, price: 15, category: 'Tech', description: 'The biggest tech event of the year.', imageURL: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000' },
        { _id: '2', title: 'Music Under the Stars', date: '2023-12-20', time: '18:00', venue: 'Campus Green', availableSeats: 45, price: 10, category: 'Music', description: 'Live music under open sky.', imageURL: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000' },
        { _id: '3', title: 'Future Careers Workshop', date: '2024-01-10', time: '14:00', venue: 'Seminar Hall B', availableSeats: 30, price: 0, category: 'Workshop', description: 'Guidance for your future career.', imageURL: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000' },
        { _id: '4', title: 'Startup Pitch Night', date: '2024-01-15', time: '17:30', venue: 'Innovation Hub', availableSeats: 80, price: 25, category: 'Business', description: 'Pitch to win funding.', imageURL: 'https://images.unsplash.com/photo-1559223607-a43c990ed9aa?auto=format&fit=crop&q=80&w=1000' },
        { _id: '5', title: 'AI & Robotics Expo', date: '2024-01-22', time: '10:00', venue: 'Engineering Block', availableSeats: 200, price: 12, category: 'Tech', description: 'Robotics demonstrations.', imageURL: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000' },
        { _id: '6', title: 'Photography Walk', date: '2024-02-05', time: '07:00', venue: 'City Park Gate', availableSeats: 15, price: 5, category: 'Art', description: 'Morning photo walk.', imageURL: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=1000' }
    ];

    useEffect(() => {
        const fetchEvent = async () => {
            // Check for mock event first
            const mock = mockEvents.find(e => e._id === id);
            if (mock) {
                setEvent(mock);
                setLoading(false);
                return;
            }

            try {
                const res = await api.get(`/events/${id}`);
                setEvent(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event:', error);
                // If API fails, check if we found a mock event earlier? No, already checked.
                setMessage({ type: 'error', text: 'Error loading event details.' });
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mock submission if it's a mock event
        if (mockEvents.find(e => e._id === event._id)) {
            // Simulate success
            if (booking.seatsBooked > event.availableSeats) {
                setMessage({ type: 'error', text: 'Not enough seats available.' });
                return;
            }
            setMessage({ type: 'success', text: 'Booking confirmed! (Mock)' });
            // simulate reducing seats
            setEvent(prev => ({ ...prev, availableSeats: prev.availableSeats - booking.seatsBooked }));
            setBooking({ name: '', email: '', seatsBooked: 1 });
            return;
        }

        try {
            await api.post('/bookings', { ...booking, eventId: id });
            setMessage({ type: 'success', text: 'Booking successful! Check your email for details.' });
            setBooking({ name: '', email: '', seatsBooked: 1 });
            // Refresh event data to show updated seats
            const res = await api.get(`/events/${id}`);
            setEvent(res.data);
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Error booking seats' });
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (!event) return (
        <div className="container text-center py-5">
            <h3>Event not found</h3>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/events')}>Back to Events</button>
        </div>
    );

    const isSoldOut = event.availableSeats === 0;
    const isLowSeats = event.availableSeats > 0 && event.availableSeats < 10;
    const seatsAfterBooking = event.availableSeats - (booking.seatsBooked || 1);

    return (
        <div className="event-details-page">
            {/* Hero Banner */}
            <div className="event-banner">
                <img src={event.imageURL || "https://via.placeholder.com/1200x400"} alt={event.title} />
                <div className="banner-content">
                    <span className="badge bg-light text-primary mb-2">{event.category}</span>
                    <h1 className="banner-title">{event.title}</h1>
                    <div className="banner-meta">
                        <i className="bi bi-calendar3 me-2"></i> {event.date} &nbsp;|&nbsp;
                        <i className="bi bi-clock me-2 ms-2"></i> {event.time}
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    {/* Event Information */}
                    <div className="col-lg-8">
                        <div className="details-card">
                            <div className="card-body">
                                <h3 className="details-heading">About This Event</h3>
                                <p className="lead text-muted">{event.description || "Join us for this amazing event. Experience a day full of learning, networking, and fun."}</p>

                                <div className="mt-5">
                                    <h4 className="details-heading">Event Details</h4>
                                    <div className="row">
                                        <div className="col-md-6 info-item">
                                            <i className="bi bi-geo-alt-fill"></i>
                                            <div>
                                                <strong>Venue</strong><br />
                                                {event.venue}
                                            </div>
                                        </div>
                                        <div className="col-md-6 info-item">
                                            <i className="bi bi-tags-fill"></i>
                                            <div>
                                                <strong>Category</strong><br />
                                                {event.category}
                                            </div>
                                        </div>
                                        <div className="col-md-6 info-item">
                                            <i className="bi bi-currency-dollar"></i>
                                            <div>
                                                <strong>Price</strong><br />
                                                {event.price === 0 ? 'Free Entry' : `$${event.price} / person`}
                                            </div>
                                        </div>
                                        <div className="col-md-6 info-item">
                                            <i className="bi bi-people-fill"></i>
                                            <div>
                                                <strong>Capacity</strong><br />
                                                {event.totalSeats || 200} People
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="col-lg-4">
                        <div className="details-card booking-card">
                            <div className="booking-header">
                                <span className="d-block mb-1">Ticket Price</span>
                                <div className="price-display">{event.price === 0 ? 'FREE' : `$${event.price}`}</div>
                            </div>
                            <div className="card-body">
                                <div className={`seat-status-box ${isSoldOut || isLowSeats ? 'status-critical' : 'status-available'}`}>
                                    <i className={`bi ${isSoldOut ? 'bi-x-circle' : 'bi-check-circle'} me-2`}></i>
                                    {isSoldOut ? 'SOLD OUT' : `${event.availableSeats} Seats Available`}
                                </div>

                                {message && (
                                    <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}>
                                        {message.text}
                                        <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">FULL NAME</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="name"
                                            value={booking.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">EMAIL ADDRESS</label>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            name="email"
                                            value={booking.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label text-muted small fw-bold">NUMBER OF SEATS</label>
                                        <input
                                            type="number"
                                            className="form-control form-control-lg"
                                            name="seatsBooked"
                                            value={booking.seatsBooked}
                                            onChange={handleChange}
                                            min="1"
                                            max={event.availableSeats}
                                            disabled={isSoldOut}
                                            required
                                        />
                                        {!isSoldOut && (
                                            <div className="form-text mt-2 text-end">
                                                {seatsAfterBooking >= 0
                                                    ? `${seatsAfterBooking} seats will remain`
                                                    : 'Not enough seats!'}
                                            </div>
                                        )}
                                    </div>

                                    {/* Summary Box */}
                                    <div className="summary-box">
                                        <div className="summary-row">
                                            <span>Price per ticket:</span>
                                            <span>${event.price}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Quantity:</span>
                                            <span>x{booking.seatsBooked}</span>
                                        </div>
                                        <div className="summary-total d-flex justify-content-between">
                                            <span>Total:</span>
                                            <span>${event.price * (booking.seatsBooked || 1)}</span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-book w-100 mt-4 text-white"
                                        disabled={isSoldOut || loading}
                                    >
                                        {isSoldOut ? 'Sold Out' : 'Confirm Booking'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
