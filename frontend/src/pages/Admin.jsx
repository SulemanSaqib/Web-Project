import React, { useEffect, useState } from 'react';
import api from '../api';
import './Admin.css';

const Admin = () => {
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('manage'); // 'manage' or 'add'
    const [formData, setFormData] = useState({
        title: '', description: '', date: '', time: '', venue: '',
        totalSeats: '', price: '', category: '', imageURL: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [toast, setToast] = useState(null); // { type: 'success'|'error', msg: '' }
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    // Mock functions for mixed data handling (if needed) but we rely on API mostly
    // For this view, we'll try to rely on real CRUD if possible, otherwise we handle errors gracefully

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await api.get('/events');
            setEvents(res.data);
        } catch (error) {
            console.error(error);
            // If API fails, we could load mocks here but Admin usually requires real backend
            showToast('error', 'Failed to load events. Ensure backend is running.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/events/${editingId}`, formData);
                showToast('success', 'Event updated successfully!');
            } else {
                await api.post('/events', formData);
                showToast('success', 'Event created successfully!');
            }
            fetchEvents();
            resetForm();
            setActiveTab('manage'); // Switch back to list view
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.message || 'Error saving event. Please try again.';
            showToast('error', errorMsg);
        }
    };

    const confirmDelete = (id) => {
        setEventToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!eventToDelete) return;
        try {
            await api.delete(`/events/${eventToDelete}`);
            showToast('success', 'Event deleted successfully.');
            fetchEvents();
        } catch (error) {
            showToast('error', 'Failed to delete event.');
        } finally {
            setShowDeleteModal(false);
            setEventToDelete(null);
        }
    };

    const handleEdit = (event) => {
        setFormData(event);
        setEditingId(event._id);
        setActiveTab('add'); // Switch to form view
    };

    const resetForm = () => {
        setFormData({
            title: '', description: '', date: '', time: '', venue: '',
            totalSeats: '', price: '', category: '', imageURL: ''
        });
        setEditingId(null);
    };

    const showToast = (type, msg) => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="admin-dashboard">
            {/* Toast Notification */}
            {toast && (
                <div className={`alert alert-${toast.type === 'success' ? 'success' : 'danger'} position-fixed top-0 end-0 m-3`} style={{ zIndex: 1100 }}>
                    {toast.msg}
                </div>
            )}

            {/* Custom Delete Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="custom-modal">
                        <i className="bi bi-exclamation-circle-fill modal-icon"></i>
                        <h4>Are you sure?</h4>
                        <p className="text-muted">Do you really want to delete this event? This process cannot be undone.</p>
                        <div className="d-flex justify-content-center gap-2 mt-4">
                            <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="btn btn-danger" onClick={handleDelete}>Delete Event</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="admin-header">
                <div className="container d-flex justify-content-between align-items-center">
                    <h2 className="admin-title"><i className="bi bi-speedometer2 me-2"></i>Admin Dashboard</h2>
                    <div className="admin-tabs">
                        <button
                            className={`nav-tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('manage'); resetForm(); }}
                        >
                            <i className="bi bi-list-ul me-2"></i>Manage Events
                        </button>
                        <button
                            className={`nav-tab-btn ${activeTab === 'add' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('add'); resetForm(); }}
                        >
                            <i className="bi bi-plus-circle me-2"></i>{editingId ? 'Edit Event' : 'Add Event'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="container">
                {activeTab === 'add' ? (
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">{editingId ? 'Edit Event Details' : 'Create New Event'}</h3>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit} className="row g-3">
                                <div className="col-md-6">
                                    <label className="admin-form-label">Event Title</label>
                                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6">
                                    <label className="admin-form-label">Category</label>
                                    <select className="form-select" name="category" value={formData.category} onChange={handleChange} required>
                                        <option value="">Select Category</option>
                                        <option value="Music">Music</option>
                                        <option value="Tech">Tech</option>
                                        <option value="Workshop">Workshop</option>
                                        <option value="Business">Business</option>
                                        <option value="Art">Art</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label className="admin-form-label">Description</label>
                                    <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleChange} required></textarea>
                                </div>
                                <div className="col-md-4">
                                    <label className="admin-form-label">Date</label>
                                    <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
                                </div>
                                <div className="col-md-4">
                                    <label className="admin-form-label">Time</label>
                                    <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} required />
                                </div>
                                <div className="col-md-4">
                                    <label className="admin-form-label">Venue</label>
                                    <input type="text" className="form-control" name="venue" value={formData.venue} onChange={handleChange} required />
                                </div>
                                <div className="col-md-4">
                                    <label className="admin-form-label">Total Seats</label>
                                    <input type="number" className="form-control" name="totalSeats" value={formData.totalSeats} onChange={handleChange} required />
                                </div>
                                <div className="col-md-4">
                                    <label className="admin-form-label">Price ($)</label>
                                    <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                                </div>
                                <div className="col-md-4">
                                    <label className="admin-form-label">Image URL</label>
                                    <input type="text" className="form-control" name="imageURL" value={formData.imageURL} onChange={handleChange} placeholder="https://example.com/image.jpg" />
                                </div>
                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn btn-primary-admin w-100">
                                        {editingId ? 'Update Event' : 'Publish Event'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">All Events ({events.length})</h3>
                        </div>
                        <div className="table-responsive">
                            <table className="table admin-table mb-0">
                                <thead>
                                    <tr>
                                        <th>Event Name</th>
                                        <th>Date</th>
                                        <th>Seats (Avail/Total)</th>
                                        <th>Price</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.length > 0 ? (
                                        events.map(event => (
                                            <tr key={event._id}>
                                                <td className="fw-bold">{event.title}</td>
                                                <td>{event.date}</td>
                                                <td>
                                                    <span className={`badge ${event.availableSeats > 0 ? 'bg-success' : 'bg-danger'} me-1`}>
                                                        {event.availableSeats}
                                                    </span>
                                                    / {event.totalSeats}
                                                </td>
                                                <td>${event.price}</td>
                                                <td className="text-end">
                                                    <button className="action-btn btn-edit" onClick={() => handleEdit(event)} title="Edit">
                                                        <i className="bi bi-pencil-fill"></i>
                                                    </button>
                                                    <button className="action-btn btn-delete" onClick={() => confirmDelete(event._id)} title="Delete">
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 text-muted">
                                                No events found. Start by adding one!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
