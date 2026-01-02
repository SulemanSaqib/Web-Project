import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Events.css'; // Import custom styles

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        date: '',
        priceRange: ''
    });

    const mockEvents = [
        // Tech
        { _id: 'm1', title: 'AI Summit 2024', date: '2024-03-15', time: '09:00', venue: 'Tech Park', availableSeats: 150, price: 50, category: 'Tech', imageURL: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm2', title: 'React Developers Meetup', date: '2024-03-20', time: '18:00', venue: 'Co-work Space', availableSeats: 40, price: 0, category: 'Tech', imageURL: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm3', title: 'Cyber Security Workshop', date: '2024-04-05', time: '10:00', venue: 'Uni Lab 1', availableSeats: 25, price: 15, category: 'Tech', imageURL: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000' },

        // Music
        { _id: 'm4', title: 'Jazz Night', date: '2024-02-14', time: '20:00', venue: 'Blue Note Club', availableSeats: 80, price: 30, category: 'Music', imageURL: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm5', title: 'Indie Rock Festival', date: '2024-05-01', time: '16:00', venue: 'City Park', availableSeats: 500, price: 45, category: 'Music', imageURL: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm6', title: 'Classical Symphony', date: '2024-03-10', time: '19:00', venue: 'Grand Hall', availableSeats: 200, price: 60, category: 'Music', imageURL: 'https://images.unsplash.com/photo-1507838153414-b4b713384ebd?auto=format&fit=crop&q=80&w=1000' },

        // Business
        { _id: 'm7', title: 'Startup Pitch Night', date: '2024-03-01', time: '18:00', venue: 'Innovation Hub', availableSeats: 100, price: 20, category: 'Business', imageURL: 'https://images.unsplash.com/photo-1559223607-a43c990ed9aa?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm8', title: 'Marketing Strategy 101', date: '2024-03-12', time: '14:00', venue: 'Business School', availableSeats: 50, price: 0, category: 'Business', imageURL: 'https://images.unsplash.com/photo-1556761175-5973d0f98e12?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm9', title: 'Networking Breakfast', date: '2024-02-28', time: '08:00', venue: 'Downtown Cafe', availableSeats: 30, price: 15, category: 'Business', imageURL: 'https://images.unsplash.com/photo-1515169067750-d51a73b53861?auto=format&fit=crop&q=80&w=1000' },

        // Workshop
        { _id: 'm10', title: 'Pottery Masterclass', date: '2024-03-08', time: '11:00', venue: 'Art Studio', availableSeats: 15, price: 40, category: 'Workshop', imageURL: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm11', title: 'Photography Basics', date: '2024-03-25', time: '10:00', venue: 'City Library', availableSeats: 20, price: 25, category: 'Workshop', imageURL: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm12', title: 'Cooking Italian', date: '2024-04-10', time: '17:00', venue: 'Culinary School', availableSeats: 12, price: 55, category: 'Workshop', imageURL: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=1000' },

        // Art
        { _id: 'm13', title: 'Abstract Art Exhibition', date: '2024-03-05', time: '10:00', venue: 'Modern Gallery', availableSeats: 300, price: 10, category: 'Art', imageURL: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=1000' },
        { _id: 'm14', title: 'Live Sketching Session', date: '2024-03-18', time: '15:00', venue: 'Central Park', availableSeats: 0, price: 5, category: 'Art', imageURL: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000' }
    ];

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, events]);

    const fetchEvents = async () => {
        try {
            const res = await api.get('/events');
            // Combine real events with mock events (or just use mock if empty to populate UI)
            // Ensuring we don't have duplicates if real items match mock IDs (unlikely given mongodb OIDs)
            const allEvents = [...(res.data || []), ...mockEvents];
            setEvents(allEvents);
            setFilteredEvents(allEvents);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            // Fallback to mock data on error
            setEvents(mockEvents);
            setFilteredEvents(mockEvents);
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        let result = [...events];

        // Search
        if (filters.search) {
            result = result.filter(event =>
                event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                event.description.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Category Filter
        if (filters.category) {
            result = result.filter(event => event.category === filters.category);
        }

        // Date Filter (simple string comparison for now, ideally strictly comparable)
        if (filters.date) {
            result = result.filter(event => event.date === filters.date);
        }

        // Price Filter (Simple logic: Free, Low, High)
        if (filters.priceRange) {
            if (filters.priceRange === 'free') {
                result = result.filter(event => event.price === 0);
            } else if (filters.priceRange === 'low') {
                result = result.filter(event => event.price > 0 && event.price <= 20);
            } else if (filters.priceRange === 'high') {
                result = result.filter(event => event.price > 20);
            }
        }

        setFilteredEvents(result);
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="events-page">
            <div className="events-page-header">
                <div className="container">
                    <h2 className="events-title">All Events</h2>
                    <p className="text-muted">Browse and book your favorite events</p>
                </div>
            </div>

            <div className="container mb-5">
                {/* Filters Section */}
                <div className="filter-section mb-4">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="input-group search-input-group">
                                <span className="input-group-text"><i className="bi bi-search"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="search"
                                    placeholder="Search events..."
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select" name="category" value={filters.category} onChange={handleFilterChange}>
                                <option value="">All Categories</option>
                                <option value="Music">Music</option>
                                <option value="Tech">Tech</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Business">Business</option>
                                <option value="Art">Art</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={filters.date}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
                                <option value="">Price: All</option>
                                <option value="free">Free</option>
                                <option value="low">Low ($1-$20)</option>
                                <option value="high">High ($20+)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="row g-4">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <div className="col-md-4 col-sm-6" key={event._id}>
                                <div className="event-card h-100 d-flex flex-column">
                                    <div className="card-img-container">
                                        <img
                                            src={event.imageURL || "https://via.placeholder.com/400x200"}
                                            alt={event.title}
                                        />
                                        <span className="category-badge">{event.category}</span>
                                        {event.availableSeats === 0 && (
                                            <div className="sold-out-overlay">Sold Out</div>
                                        )}
                                    </div>
                                    <div className="card-body d-flex flex-column position-relative">
                                        <h5 className="card-title text-truncate">{event.title}</h5>

                                        <div className="card-info mb-2">
                                            <i className="bi bi-calendar3 me-2 text-primary"></i>
                                            {event.date}
                                        </div>
                                        <div className="card-info mb-3">
                                            <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                                            <span className="text-truncate d-inline-block w-75 align-bottom">{event.venue}</span>
                                        </div>

                                        <div className="mt-auto d-flex justify-content-between align-items-center">
                                            <div className="price-tag">
                                                {event.price === 0 ? 'Free' : `$${event.price}`}
                                            </div>
                                            <div className="d-flex flex-column align-items-end">
                                                <small className={event.availableSeats > 5 ? "text-success fw-bold" : "text-danger fw-bold"}>
                                                    {event.availableSeats > 0 ? `${event.availableSeats} Left` : ''}
                                                </small>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/events/${event._id}`}
                                            className={`btn btn-outline-custom w-100 mt-3 ${event.availableSeats === 0 ? 'disabled' : ''}`}
                                        >
                                            {event.availableSeats === 0 ? 'Sold Out' : 'View Details'}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon"><i className="bi bi-calendar-x"></i></div>
                            <h3>No events found</h3>
                            <p>Try adjusting your search or filters to find what you're looking for.</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => setFilters({ search: '', category: '', date: '', priceRange: '' })}
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;
