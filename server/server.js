import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from 'express-session';
import connectDB from "./config/db.js";
import passport from './config/passport.js';
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import logger from "morgan";
dotenv.config({ quiet: true });



const app = express();
const PORT = process.env.PORT;

// Middlewares
// app.use(cors());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:2221',
  credentials: true
}));
app.use(express.json());
app.use(logger('common'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// Databse Connection
connectDB();


// Routes
// /vehicles – a collection of vehicle resources
app.use("/api/vehicles", vehicleRoutes);
// 
app.use("/api/auth", authRoutes);


// 
app.get('/', (req, res) => {
  res.status(200).send('Autos Api Running!');
});



app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});
