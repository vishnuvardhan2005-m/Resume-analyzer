import React, { useRef } from 'react';

const ResumeUpload = ({ onUpload, loading }) => {
  const inputRef = useRef(null);

  const handleChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !onUpload) return;
    await onUpload(file);
  };

  return (
    <div className="card p-5 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">1. Upload Resume (PDF)</h2>
          <p className="text-xs text-slate-400">
            We&apos;ll extract text from your resume securely on the server.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary text-xs px-3 py-1.5"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
        >
          {loading ? 'Uploading…' : 'Choose PDF'}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleChange}
      />

      <p className="text-[11px] text-slate-500">
        Accepted format: PDF, max 5MB. Skills are extracted using AI for analysis only.
      </p>
    </div>
  );
};

export default ResumeUpload;
