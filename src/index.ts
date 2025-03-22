import express from 'express';
import mongoose from 'mongoose';
import noteRoutes from './routes/noteRoutes';
import { logger } from './middlewares/logger';
import { errorHandler } from './utils/errorHandler';
import dotenv from 'dotenv';
import { IUser } from './models/User'; // Import the IUser interface

// Extend the Request type to include the user property
declare module 'express' {
          interface Request {
                    user?: IUser; // Use IUser instead of User
          }
}

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(logger);

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
          console.error('MONGODB_URI is not defined in .env file');
          process.exit(1);
}

mongoose.connect(MONGODB_URI)
          .then(() => console.log('Connected to MongoDB'))
          .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/api/notes', noteRoutes);

// Root endpoint
app.use('/', (req, res) => {
          res.send('Note-Keeping API is running!');
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
});