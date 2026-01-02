# Event Management System

A full-stack Event Management System built with Node.js, Express, MongoDB, and React.

> 📘 **Full Documentation**: For a detailed guide on architecture, features, and setup, please see [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md).

## Folder Structure
- `backend/`: Node.js API server
- `frontend/`: React application (Vite)

## Setup Steps

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on default port 27017

### Backend Setup
1. Navigate to `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file (if not exists) with content:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/eventdb
   ```
4. Start server: `npm run dev` (running on http://localhost:5000)

### Frontend Setup
1. Navigate to `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev` (usually http://localhost:5173)

## API Endpoints

| Method | Route          | Description         | Body Parameters                                                                 | Response |
|--------|----------------|---------------------|---------------------------------------------------------------------------------|----------|
| GET    | /api/events    | Get all events      | Query Params: `search` (title), `category`                                      | Array of events |
| GET    | /api/events/:id| Get single event    | -                                                                               | Event object |
| POST   | /api/events    | Create event        | `title`, `description`, `date`, `time`, `venue`, `totalSeats`, `price`, `category`, `imageURL` | Created Event |
| PUT    | /api/events/:id| Update event        | fields to update                                                                | Updated Event |
| DELETE | /api/events/:id| Delete event        | -                                                                               | Success message |
| POST   | /api/bookings  | Book seats          | `name`, `email`, `eventId`, `seatsBooked`                                       | Booking details |

## ERD / Schema Diagram (Text)

**Event**
- _id (ObjectId)
- title (String)
- description (String)
- date (String)
- time (String)
- venue (String)
- totalSeats (Number)
- availableSeats (Number) [Calculated]
- bookedSeats (Number)
- price (Number)
- category (String)
- imageURL (String)

**Booking**
- _id (ObjectId)
- name (String)
- email (String)
- eventId (ObjectId, Ref: Event)
- seatsBooked (Number)
- createdAt (Date)

Relationships:
- 1 Event has Many Bookings.
- 1 Booking belongs to 1 Event.

## Example Postman Requests

**Create Event**
- POST `http://localhost:5000/api/events`
- Body (JSON):
```json
{
  "title": "React Workshop",
  "description": "Learn React from scratch",
  "date": "2023-12-01",
  "time": "10:00",
  "venue": "Tech Hub Hall A",
  "totalSeats": 50,
  "price": 20,
  "category": "Tech",
  "imageURL": "https://via.placeholder.com/300"
}
```

**Book Seat**
- POST `http://localhost:5000/api/bookings`
- Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "eventId": "654321...",
  "seatsBooked": 2
}
```
