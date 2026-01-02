# Event Management System - Project Documentation

## 1. Project Overview
The **Event Management System** is a full-stack web application designed to simplify the process of browsing, creating, and booking events. It serves two primary user roles:
- **Users**: Can browse events, filter by category/price, view details, and book seats in real-time.
- **Admins**: Can manage the platform by creating, updating, and deleting events via a secure dashboard.

The system is built with a focus on a modern, responsive user interface and a robust RESTful backend API.

## 2. Technologies Used

### Frontend
- **React.js (Vite)**: For building a fast, interactive single-page application.
- **React Router**: For client-side routing and navigation.
- **Bootstrap 5**: For responsive layout and pre-built UI components.
- **CSS3**: Custom styling for gradients, animations, and modern aesthetics.
- **Axios**: For making HTTP requests to the backend API.

### Backend
- **Node.js**: Runtime environment for executing JavaScript on the server.
- **Express.js**: Web framework for building the RESTful API.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB interactions.
- **Dotenv**: For managing environment variables.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.

### Database
- **MongoDB**: NoSQL database for storing flexible event and booking data.

## 3. Features

### User Features (Frontend)
- **Hero Section**: Attractive landing page with featured events.
- **Event Listing**: Dynamic grid of events with **Search**, **Category Filter**, **Date Filter**, and **Price Sorting**.
- **Real-Time Availability**: View live seat counts (e.g., "5 Seats Left").
- **Booking System**: Seamless form to book tickets with validation to prevent overbooking.
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile.

### Admin Features (Dashboard)
- **Event Management**: Create, Edit, and Delete events.
- **Form Validation**: Ensures data integrity (e.g., Seat count must be numeric).
- **Confirmation Modals**: Prevents accidental deletions.
- **Status Notifications**: Toast messages for success or error feedback.

## 4. Database Schema

### Event Model
| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Name of the event |
| `description` | String | Detailed info about the event |
| `date` | String | Event date (YYYY-MM-DD) |
| `time` | String | Event start time |
| `venue` | String | Physical location |
| `totalSeats` | Number | Maximum capacity |
| `availableSeats` | Number | Currently available seats (Calculated) |
| `bookedSeats` | Number | Seats already taken (Default: 0) |
| `price` | Number | Cost per ticket |
| `category` | String | E.g., Tech, Music, Art, Business |
| `imageURL` | String | URL for event banner |

### Booking Model
| Field | Type | Description |
|-------|------|-------------|
| `name` | String | User's full name |
| `email` | String | User's contact email |
| `seatsBooked` | Number | Quantity of tickets |
| `eventId` | ObjectId | Reference to the Event model |
| `createdAt` | Date | Timestamp of booking |

## 5. API Endpoints

The backend runs on `http://localhost:5000` by default.

| Method | Endpoint | Description | Request Body Example |
|--------|----------|-------------|----------------------|
| **GET** | `/api/events` | Fetch all events (supports filters) | - |
| **GET** | `/api/events/:id` | Fetch details of a single event | - |
| **POST** | `/api/events` | Create a new event | `{ "title": "Tech Talk", "price": 0, ... }` |
| **PUT** | `/api/events/:id` | Update an existing event | `{ "title": "Updated Title" }` |
| **DELETE** | `/api/events/:id` | Delete an event | - |
| **POST** | `/api/bookings` | Book seats for an event | `{ "name": "John", "email": "j@test.com", "seatsBooked": 2, "eventId": "..." }` |

## 6. Setup & Installation Guide

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Running locally or cloud URI)

### Step 1: Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment:
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/eventDB
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *You should see: "Server running on port 5000" and "MongoDB Connected".*

### Step 2: Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173` (or the port shown in terminal).

## 7. Project Structure

```
Web Project/
├── backend/
│   ├── models/         # Database Schemas (Event.js, Booking.js)
│   ├── routes/         # API Routes (eventRoutes.js, bookingRoutes.js)
│   ├── controllers/    # Business Logic
│   ├── server.js       # Entry point
│   └── .env            # Config
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI (Navbar, Footer)
    │   ├── pages/      # Views (Home, Events, EventDetails, Admin)
    │   ├── api.js      # Axios setup
    │   ├── App.jsx     # Main Router
    │   └── index.css   # Global Styles
    └── package.json
```

## 8. Future Enhancements
- **User Authentication**: Login/Signup for users and secure Admin routes.
- **Payment Gateway**: Integration with Stripe/Razorpay for paid events.
- **Email Confirmation**: Sending ticket details via email (Nodemailer).
- **Dashboard Analytics**: Visual charts for ticket sales and revenue.

---
*Documentation Version 1.0 - Generated by Antigravity*
