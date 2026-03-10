import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/uploadRoutes.js';
import analyzeRoutes from './routes/analyzeRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true
  })
);

// API routes
app.use('/', uploadRoutes);
app.use('/', analyzeRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Resume Skill Gap Analyzer API is running' });
});

// Error handling (must be last)
app.use(errorHandler);

export default app;

