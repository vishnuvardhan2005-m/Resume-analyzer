import Analysis from '../models/Analysis.js';
import { analyzeSkillGap } from '../utils/skillAnalyzer.js';

// POST /analyze
// Analyze resume and job description text using Gemini
export const analyze = async (req, res, next) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({ message: 'resumeText is required' });
    }

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ message: 'jobDescription is required' });
    }

    const { resumeSkills, jobSkills, matchedSkills, missingSkills, matchPercentage } =
      await analyzeSkillGap(resumeText, jobDescription);

    return res.status(200).json({
      resumeSkills,
      jobSkills,
      matchedSkills,
      missingSkills,
      matchPercentage
    });
  } catch (error) {
    console.error('Error analyzing texts:', error);

    // Explicit Gemini failure response (do not crash server)
    if (error?.statusCode === 502 || error?.message === 'Gemini API failed while extracting skills') {
      return res.status(502).json({
        message: 'Gemini API failed while extracting skills',
        error: error?.originalMessage || error?.message || 'Unknown Gemini error'
      });
    }

    return next(error);
  }
};

// POST /save-analysis
// Persist analysis results to MongoDB
export const saveAnalysis = async (req, res, next) => {
  try {
    const { resumeSkills, jobSkills, matchedSkills, missingSkills, matchPercentage } = req.body;

    if (typeof matchPercentage !== 'number') {
      return res.status(400).json({ message: 'matchPercentage must be a number' });
    }

    const normalize = (skills) =>
      (skills || []).map((s) => String(s).trim()).filter(Boolean);

    const analysis = await Analysis.create({
      resumeSkills: normalize(resumeSkills),
      jobSkills: normalize(jobSkills),
      matchedSkills: normalize(matchedSkills),
      missingSkills: normalize(missingSkills),
      matchPercentage
    });

    return res.status(201).json({
      id: analysis._id,
      resumeSkills: analysis.resumeSkills,
      jobSkills: analysis.jobSkills,
      matchedSkills: analysis.matchedSkills,
      missingSkills: analysis.missingSkills,
      matchPercentage: analysis.matchPercentage,
      createdAt: analysis.createdAt
    });
  } catch (error) {
    console.error('Error saving analysis:', error);
    return next(error);
  }
};

// GET /analysis-history
// Return all stored analysis records
export const getAnalysisHistory = async (req, res, next) => {
  try {
    const analyses = await Analysis.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json(analyses);
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    return next(error);
  }
};

