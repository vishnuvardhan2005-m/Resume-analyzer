import React from 'react';

const SkillTags = ({ skills = [], tone = 'matched' }) => {
  const styles =
    tone === 'matched'
      ? 'bg-emerald-50 text-emerald-800 ring-emerald-200'
      : 'bg-rose-50 text-rose-800 ring-rose-200';

  if (!skills.length) {
    return <p className="text-sm text-gray-500">None</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => (
        <span key={s} className={`tag ${styles}`}>
          {s}
        </span>
      ))}
    </div>
  );
};

export default SkillTags;

