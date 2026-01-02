import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Home.css'; // Import custom styles

const Home = () => {
    const [featuredEvents, setFeaturedEvents] = useState([]);

    // Standard curated events for fallback
    const mockEvents = [
        {
            _id: '1',
            title: 'Annual Tech Symposium',
            date: '2023-12-15',
            time: '09:00',
            venue: 'Main Auditorium',
            availableSeats: 120,
            price: 15,
            imageURL: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
            category: 'Tech'
        },
        {
            _id: '2',
            title: 'Music Under the Stars',
            date: '2023-12-20',
            time: '18:00',
            venue: 'Campus Green',
            availableSeats: 45,
            price: 10,
            imageURL: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000',
            category: 'Music'
        },
        {
            _id: '3',
            title: 'Future Careers Workshop',
            date: '2024-01-10',
            time: '14:00',
            venue: 'Seminar Hall B',
            availableSeats: 30,
            price: 0,
            imageURL: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000',
            category: 'Workshop'
        },
        {
            _id: '4',
            title: 'Startup Pitch Night',
            date: '2024-01-15',
            time: '17:30',
            venue: 'Innovation Hub',
            availableSeats: 80,
            price: 25,
            imageURL: 'https://images.unsplash.com/photo-1559223607-a43c990ed9aa?auto=format&fit=crop&q=80&w=1000',
            category: 'Business'
        },
        {
            _id: '5',
            title: 'AI & Robotics Expo',
            date: '2024-01-22',
            time: '10:00',
            venue: 'Engineering Block',
            availableSeats: 200,
            price: 12,
            imageURL: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000',
            category: 'Tech'
        },
        {
            _id: '6',
            title: 'Photography Walk',
            date: '2024-02-05',
            time: '07:00',
            venue: 'City Park Gate',
            availableSeats: 15,
            price: 5,
            imageURL: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=1000',
            category: 'Art'
        }
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/events');
                if (res.data && res.data.length > 0) {
                    // Show latest 6 events from DB
                    const latestEvents = res.data.reverse().slice(0, 6);
                    // If less than 6, pad with mocks
                    if (latestEvents.length < 6) {
                        setFeaturedEvents([...latestEvents, ...mockEvents.slice(0, 6 - latestEvents.length)]);
                    } else {
                        setFeaturedEvents(latestEvents);
                    }
                } else {
                    setFeaturedEvents(mockEvents);
                }
            } catch (error) {
                console.error('Error fetching events, using mock data:', error);
                setFeaturedEvents(mockEvents);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <div className="hero-section text-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="hero-title">Elevate Your Campus Experience</h1>
                            <p className="hero-desc">
                                Discover the hottest events, workshops, and gatherings happening around you.
                                Book your spot seamlessly and never miss out on the action.
                            </p>
                            <Link to="/events" className="btn btn-custom btn-lg">Explore Events</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Events Section */}
            <div className="container mb-5">
                <div className="text-center">
                    <h2 className="section-title">Upcoming Events</h2>
                </div>

                <div className="row g-4 mt-2">
                    {featuredEvents.length > 0 ? (
                        featuredEvents.map(event => (
                            <div className="col-md-4" key={event._id}>
                                <div className="event-card h-100 d-flex flex-column">
                                    <div className="card-img-wrapper">
                                        <img
                                            src={event.imageURL || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                                            alt={event.title}
                                        />
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{event.title}</h5>
                                        <div className="card-info">
                                            <i className="bi bi-calendar-event"></i> {event.date} | {event.time}
                                        </div>
                                        <div className="card-info">
                                            <i className="bi bi-geo-alt"></i> {event.venue}
                                        </div>
                                        <div className="mt-3 d-flex justify-content-between align-items-center mt-auto">
                                            <span className="seat-badge">
                                                {event.availableSeats} Seats Left
                                            </span>
                                            <span className="fw-bold text-primary">${event.price}</span>
                                        </div>
                                        <Link to={`/events/${event._id}`} className="btn btn-outline-custom mt-3 w-100">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p className="text-muted">No upcoming events found. Be the first to add one!</p>
                            <Link to="/admin" className="btn btn-outline-primary">Create Event</Link>
                        </div>
                    )}
                </div>

                <div className="text-center mt-5">
                    <Link to="/events" className="btn btn-link text-decoration-none fw-bold fs-5">View All Events &rarr;</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
