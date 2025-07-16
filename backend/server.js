import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';


import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/job.routes.js';
import errorHandler from './middlewares/error.middleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')); // log all requests to console
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Health Check
app.get('/', (req, res) => res.send('Job Management System Running'));

// Error Middleware (last!)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
