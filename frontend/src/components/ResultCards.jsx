import React from 'react';
import SkillTags from './SkillTags.jsx';

const StatCard = ({ title, value, subtitle, accent = 'blue' }) => {
  const accentClass =
    accent === 'green'
      ? 'bg-emerald-50 text-emerald-700'
      : accent === 'red'
        ? 'bg-rose-50 text-rose-700'
        : accent === 'indigo'
          ? 'bg-indigo-50 text-indigo-700'
          : 'bg-blue-50 text-blue-700';

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
        </div>
        <div className={`rounded-xl px-3 py-1.5 text-sm font-semibold ${accentClass}`}>
          {value}
        </div>
      </div>
    </div>
  );
};

const ResultCards = ({ result }) => {
  if (!result) return null;

  const matchedSkills = result.matchedSkills || [];
  const missingSkills = result.missingSkills || [];
  const matchPercentage = result.matchPercentage ?? 0;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <StatCard
          title="Match percentage"
          value={`${matchPercentage}%`}
          subtitle="How closely your resume aligns with the job skills."
          accent="blue"
        />
        <StatCard
          title="Matched skills"
          value={matchedSkills.length}
          subtitle="Skills found in both resume and job description."
          accent="green"
        />
        <StatCard
          title="Missing skills"
          value={missingSkills.length}
          subtitle="Skills requested by the job not found in your resume."
          accent="red"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-gray-900">Matched skills</h3>
          <p className="mt-1 text-sm text-gray-600">Strong signals you already have.</p>
          <div className="mt-4">
            <SkillTags skills={matchedSkills} tone="matched" />
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-semibold text-gray-900">Missing skills</h3>
          <p className="mt-1 text-sm text-gray-600">Opportunities to learn or highlight.</p>
          <div className="mt-4">
            <SkillTags skills={missingSkills} tone="missing" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCards;

