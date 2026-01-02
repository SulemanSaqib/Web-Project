import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#2a2a72', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/" style={{ fontSize: '1.5rem', letterSpacing: '1px' }}>
                    <i className="bi bi-calendar-check me-2"></i>UniEvents
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active fw-bold' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/events' ? 'active fw-bold' : ''}`} to="/events">Events</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/admin' ? 'active fw-bold' : ''}`} to="/admin">Admin</Link>
                        </li>
                    </ul>
                    <div className="ms-3">
                        <Link to="/events" className="btn btn-light btn-sm rounded-pill px-3 fw-bold" style={{ color: '#2a2a72' }}>Book Now</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
