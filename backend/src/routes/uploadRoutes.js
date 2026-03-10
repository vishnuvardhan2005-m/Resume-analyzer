import express from 'express';
import uploadMiddleware from '../middleware/uploadMiddleware.js';
import { uploadResume } from '../controllers/uploadController.js';

const router = express.Router();

// POST /upload-resume - upload PDF and get extracted text
router.post('/upload-resume', uploadMiddleware.single('resume'), uploadResume);

export default router;

