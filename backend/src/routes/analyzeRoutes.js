import express from 'express';
import {
  analyze,
  saveAnalysis,
  getAnalysisHistory
} from '../controllers/analyzeController.js';

const router = express.Router();

// POST /analyze - analyze resume and job description text
router.post('/analyze', analyze);

// POST /save-analysis - store analysis in MongoDB
router.post('/save-analysis', saveAnalysis);

// GET /analysis-history - get all stored analyses
router.get('/analysis-history', getAnalysisHistory);

export default router;

