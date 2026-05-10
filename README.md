# Traveloop

Traveloop is a multi-city travel planning platform built for the Odoo Hackathon virtual round.

The application helps users organize trips, manage itineraries, track travel budgets, and explore travel activities through an interactive dashboard experience.

---

## Features

- Multi-city trip planning
- Interactive travel dashboard
- Budget tracking interface
- Itinerary timeline view
- Packing and notes sections
- Mock backend API integration
- Responsive UI layout

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS-in-JS Styling

### Backend
- Node.js
- Express.js

### Database
- MySQL (planned integration)

---

## Project Structure

```text
traveloop/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

---

## Run Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:
```bash
http://localhost:5173
```

## Run Backend

```bash
cd server
npm install
npm run dev
```
Backend runs on:
```bash
http://localhost:5000
```

---

## API Endpoints

### Get Trips

```bash
GET /api/trips
```

### Create Trip
```bash
POST /api/trips
```

---

## Team

Built for the Odoo Hackathon using React, Express, and collaborative GitHub workflow.
