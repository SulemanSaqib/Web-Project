import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row g-4">
                    {/* Brand & About */}
                    <div className="col-lg-4 col-md-6">
                        <h4 className="footer-heading">CampusEvents</h4>
                        <p className="mt-3">
                            The ultimate platform for discovering and booking campus events.
                            From tech talks to music festivals, we bring the campus community together.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="social-icon"><i className="bi bi-twitter-x"></i></a>
                            <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className="footer-heading">Quick Links</h5>
                        <ul className="footer-links mt-3">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/events">Browse Events</Link></li>
                            <li><Link to="/admin">Organizers (Admin)</Link></li>
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className="footer-heading">Support</h5>
                        <ul className="footer-links mt-3">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="footer-heading">Contact Us</h5>
                        <div className="mt-3">
                            <div className="contact-item">
                                <i className="bi bi-geo-alt-fill"></i>
                                <span>123 University Ave, Student Center,<br />Innovation City, ST 54321</span>
                            </div>
                            <div className="contact-item">
                                <i className="bi bi-telephone-fill"></i>
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="contact-item">
                                <i className="bi bi-envelope-fill"></i>
                                <span>support@campusevents.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="mb-0">&copy; {new Date().getFullYear()} CampusEvents. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
