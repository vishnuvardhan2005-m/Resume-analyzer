import React, { useState } from 'react';
import UploadCard from '../components/UploadCard.jsx';
import JobDescriptionCard from '../components/JobDescriptionCard.jsx';
import AnalyzeButton from '../components/AnalyzeButton.jsx';
import ResultCards from '../components/ResultCards.jsx';
import Visualization from '../components/Visualization.jsx';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { analyzeSkills, saveAnalysis, uploadResume } from '../services/api';
import { useToast } from '../hooks/useToast';

const HomePage = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingAnalyze, setLoadingAnalyze] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const toast = useToast();

  const handleUpload = async (file) => {
    try {
      setLoadingUpload(true);
      setError('');
      setUploadedFileName(file?.name || '');
      const data = await uploadResume(file);
      setResumeText(data.resumeText || '');
      toast.push({
        type: 'success',
        title: 'Resume uploaded',
        message: 'Text extracted successfully. Paste a job description to continue.'
      });
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        'Failed to upload or parse resume. Please try a different PDF.';
      setError(msg);
      toast.push({ type: 'error', title: 'Upload failed', message: msg });
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      const msg = 'Upload a resume and paste a job description before analyzing.';
      setError(msg);
      toast.push({ type: 'info', title: 'Missing inputs', message: msg });
      return;
    }

    try {
      setLoadingAnalyze(true);
      setError('');
      const analysis = await analyzeSkills(resumeText, jobDescription);
      setResult(analysis);
      toast.push({ type: 'success', title: 'Analysis complete', message: 'Results updated.' });

      // Best-effort save; ignore errors in UI
      try {
        await saveAnalysis(analysis);
      } catch (saveErr) {
        console.warn('Failed to save analysis:', saveErr);
      }
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        'Analysis failed. Please check your inputs and try again.';
      setError(msg);
      toast.push({ type: 'error', title: 'Analysis failed', message: msg });
    } finally {
      setLoadingAnalyze(false);
    }
  };

  const isAnalyzing = loadingAnalyze;

  return (
    <main className="container-app py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Skill gap analysis</h1>
        <p className="mt-2 text-gray-600">
          Upload a resume and compare it to a job description to see matched and missing skills.
        </p>
      </div>

      {error ? (
        <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <UploadCard
          onUpload={handleUpload}
          uploading={loadingUpload}
          uploadedFileName={uploadedFileName}
        />
        <JobDescriptionCard value={jobDescription} onChange={setJobDescription} disabled={isAnalyzing} />
      </div>

      <div className="mt-6">
        <AnalyzeButton
          onClick={handleAnalyze}
          loading={isAnalyzing}
          disabled={!resumeText.trim() || !jobDescription.trim() || loadingUpload}
        />
        <p className="mt-3 text-center text-sm text-gray-500">
          Tip: keep job descriptions focused on requirements for best skill extraction.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {isAnalyzing ? (
          <LoadingSkeleton variant="card" />
        ) : (
          <>
            <ResultCards result={result} />
            {result ? <Visualization result={result} /> : null}
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;

