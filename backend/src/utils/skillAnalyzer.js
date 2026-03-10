import { model } from './geminiClient.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const buildPrompt = (resumeText, jobDescription) => `
Extract ONLY technical skills from the following texts.

Resume:
${resumeText || ''}

Job Description:
${jobDescription || ''}

Return JSON format only:
{
  "resumeSkills": [],
  "jobSkills": []
}
`;

const safeParseSkillsJSON = (responseText) => {
  try {
    // Gemini sometimes wraps JSON in markdown fences like ```json ... ```
    const cleaned = String(responseText || '')
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}');
    const jsonString =
      jsonStart !== -1 && jsonEnd !== -1 ? cleaned.slice(jsonStart, jsonEnd + 1) : cleaned;

    const parsed = JSON.parse(jsonString);

    const normalize = (arr) =>
      (Array.isArray(arr) ? arr : [])
        .map((s) => String(s).trim())
        .filter(Boolean)
        .filter(
          (skill, index, self) =>
            self.findIndex((x) => x.toLowerCase() === skill.toLowerCase()) === index
        );

    return {
      resumeSkills: normalize(parsed.resumeSkills),
      jobSkills: normalize(parsed.jobSkills)
    };
  } catch (err) {
    console.error('Gemini JSON parse failed, returning empty skills:', err.message);
    return { resumeSkills: [], jobSkills: [] };
  }
};

// Required function: extractSkills(resumeText, jobDescription)
export const extractSkills = async (resumeText, jobDescription) => {
  const prompt = buildPrompt(resumeText, jobDescription);

  try {
    const result = await model.generateContent(prompt);
    const responseText = result?.response?.text?.() || '';
    return safeParseSkillsJSON(responseText);
  } catch (err) {
    // If the configured model is retired/not available, retry with a safe fallback.
    const status = err?.status || err?.response?.status;
    const msg = String(err?.message || '');
    const looksLikeModelNotFound =
      status === 404 || /model(s)?\/.*not found/i.test(msg) || /not supported/i.test(msg);

    if (looksLikeModelNotFound) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const fallback = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
        const retry = await fallback.generateContent(prompt);
        const responseText = retry?.response?.text?.() || '';
        return safeParseSkillsJSON(responseText);
      } catch (retryErr) {
        console.error('Gemini fallback model failed:', retryErr);
        const error = new Error('Gemini API failed while extracting skills');
        error.statusCode = 502;
        error.originalMessage = retryErr?.message || err?.message;
        throw error;
      }
    }

    console.error('Gemini API error:', err);
    const error = new Error('Gemini API failed while extracting skills');
    error.statusCode = 502;
    error.originalMessage = err?.message;
    throw error;
  }
};

export const analyzeSkillGap = async (resumeText, jobDescription) => {
  const { resumeSkills, jobSkills } = await extractSkills(resumeText, jobDescription);

  const resumeLower = new Set(resumeSkills.map((s) => s.toLowerCase()));
  const jobLower = jobSkills.map((s) => s.toLowerCase());

  const matchedSkills = jobSkills.filter((skill, idx) => resumeLower.has(jobLower[idx]));
  const missingSkills = jobSkills.filter((skill, idx) => !resumeLower.has(jobLower[idx]));

  const matchPercentage =
    jobSkills.length === 0 ? 0 : Math.round((matchedSkills.length / jobSkills.length) * 100);

  return {
    resumeSkills,
    jobSkills,
    matchedSkills,
    missingSkills,
    matchPercentage
  };
};

