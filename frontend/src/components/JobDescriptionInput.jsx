import React from 'react';

const JobDescriptionInput = ({ value, onChange, disabled }) => {
  return (
    <div className="card p-5 space-y-3 h-full">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">2. Job Description</h2>
          <p className="text-xs text-slate-400">
            Paste the job description you want to compare your resume against.
          </p>
        </div>
      </div>

      <textarea
        className="input min-h-[160px] resize-y"
        placeholder="Paste job description here..."
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default JobDescriptionInput;
