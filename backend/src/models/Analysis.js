import mongoose from 'mongoose';

const AnalysisSchema = new mongoose.Schema(
  {
    resumeSkills: {
      type: [String],
      default: []
    },
    jobSkills: {
      type: [String],
      default: []
    },
    matchedSkills: {
      type: [String],
      default: []
    },
    missingSkills: {
      type: [String],
      default: []
    },
    matchPercentage: {
      type: Number,
      required: true
    },
    jobTitle: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Analysis', AnalysisSchema);

