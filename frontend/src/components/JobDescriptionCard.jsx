import React from 'react';

const JobDescriptionCard = ({ value, onChange, disabled, maxChars = 8000 }) => {
  const count = value?.length || 0;
  const nearLimit = count / maxChars > 0.9;

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Job description</h2>
          <p className="mt-1 text-sm text-gray-600">
            Paste the role requirements. We&apos;ll extract technical skills and compare.
          </p>
        </div>
        <div className={`text-xs font-semibold ${nearLimit ? 'text-rose-600' : 'text-gray-500'}`}>
          {count.toLocaleString()} / {maxChars.toLocaleString()}
        </div>
      </div>

      <label className="mt-4 block">
        <span className="sr-only">Job description</span>
        <textarea
          className="input min-h-[220px] resize-y leading-6"
          placeholder="Paste the job description here…"
          value={value}
          onChange={(e) => onChange?.(e.target.value.slice(0, maxChars))}
          disabled={disabled}
        />
      </label>
    </div>
  );
};

export default JobDescriptionCard;

