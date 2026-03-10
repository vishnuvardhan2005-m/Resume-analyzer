import React from 'react';

const Spinner = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="3"
      className="opacity-25"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className="opacity-90"
    />
  </svg>
);

const AnalyzeButton = ({ onClick, loading, disabled }) => {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="btn-primary px-8 py-3 text-base"
        onClick={onClick}
        disabled={disabled || loading}
      >
        <span className="inline-flex items-center gap-2">
          {loading ? <Spinner /> : null}
          {loading ? 'Analyzing…' : 'Analyze skill gap'}
        </span>
      </button>
    </div>
  );
};

export default AnalyzeButton;
