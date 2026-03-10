import React, { useMemo, useRef, useState } from 'react';

const UploadCard = ({ onUpload, uploading, uploadedFileName }) => {
  const inputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const hint = useMemo(() => {
    if (uploadedFileName) return `Uploaded: ${uploadedFileName}`;
    return 'PDF only · up to 5MB';
  }, [uploadedFileName]);

  const pickFile = () => inputRef.current?.click();

  const handleFile = async (file) => {
    if (!file) return;
    await onUpload?.(file);
  };

  const onDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    await handleFile(file);
  };

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Resume</h2>
          <p className="mt-1 text-sm text-gray-600">
            Upload your resume PDF and we&apos;ll extract text for analysis.
          </p>
        </div>
        <button type="button" className="btn-secondary" onClick={pickFile} disabled={uploading}>
          {uploading ? 'Uploading…' : 'Choose file'}
        </button>
      </div>

      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOver(false);
        }}
        onDrop={onDrop}
        className={`mt-5 rounded-xl border border-dashed p-6 transition ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : uploadedFileName
              ? 'border-emerald-200 bg-emerald-50/40'
              : 'border-gray-300 bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              uploadedFileName ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
            }`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 18a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.6-1.7A4 4 0 1 1 19 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 12v8m0-8 3 3m-3-3-3 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              Drag & drop your PDF here
              <span className="text-gray-400"> or </span>
              <button
                type="button"
                className="text-blue-700 hover:underline"
                onClick={pickFile}
                disabled={uploading}
              >
                browse
              </button>
            </p>
            <p className="mt-1 text-sm text-gray-600 truncate">{hint}</p>
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
};

export default UploadCard;

