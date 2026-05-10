import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const trips = [
  {
    id: 1,
    title: "Japan Spring Trip",
    destination: "Tokyo, Kyoto, Osaka",
    budget: 2400,
  },
  {
    id: 2,
    title: "Europe Backpacking",
    destination: "Paris, Rome, Prague",
    budget: 4200,
  },
];

app.get("/", (req, res) => {
  res.json({
    message: "Traveloop API Running",
  });
});

app.get("/api/trips", (req, res) => {
  res.json(trips);
});

app.post("/api/trips", (req, res) => {
  const newTrip = req.body;

  trips.push({
    id: trips.length + 1,
    ...newTrip,
  });

  res.status(201).json({
    success: true,
    trip: newTrip,
  });
});
