import axios from 'axios';

const api = axios.create({
  baseURL:import.meta.env.VITE_API_URL || "http://localhost:5000"
});

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  const { data } = await api.post('/upload-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return data;
};

export const analyzeSkills = async (resumeText, jobDescription) => {
  const { data } = await api.post('/analyze', {
    resumeText,
    jobDescription
  });
  return data;
};

export const saveAnalysis = async (payload) => {
  const { data } = await api.post('/save-analysis', payload);
  return data;
};

export const fetchHistory = async () => {
  const { data } = await api.get('/analysis-history');
  return data;
};

export default api;

