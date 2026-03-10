import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultsDashboard = ({ result }) => {
  if (!result) {
    return (
      <div className="card p-6 text-sm text-slate-400">
        Run an analysis to see your skill match results.
      </div>
    );
  }

  const { matchedSkills = [], missingSkills = [], matchPercentage = 0 } = result;

  const pieData = {
    labels: ['Matched Skills', 'Missing Skills'],
    datasets: [
      {
        data: [matchedSkills.length, missingSkills.length],
        backgroundColor: ['#22c55e', '#f97316'],
        borderColor: ['#16a34a', '#ea580c'],
        borderWidth: 1
      }
    ]
  };

  const totalSkills = matchedSkills.length + missingSkills.length;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-50">Skill Match Overview</h2>
          <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {totalSkills} total job skills
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Match Percentage</span>
              <span className="font-semibold text-slate-50">{matchPercentage}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {matchedSkills.length} matched
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-orange-300">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              {missingSkills.length} missing
            </span>
          </div>
        </div>

        <div className="mt-4 grid gap-4 text-xs md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold text-emerald-300">Matched Skills</h3>
            {matchedSkills.length === 0 ? (
              <p className="text-slate-500">No overlapping skills yet.</p>
            ) : (
              <ul className="space-y-1 max-h-40 overflow-y-auto pr-1">
                {matchedSkills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-emerald-100"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-orange-300">Missing Skills</h3>
            {missingSkills.length === 0 ? (
              <p className="text-slate-500">You cover all listed job skills—great work!</p>
            ) : (
              <ul className="space-y-1 max-h-40 overflow-y-auto pr-1">
                {missingSkills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg bg-orange-500/10 px-2.5 py-1 text-orange-100"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="card p-6 flex flex-col items-center justify-center">
        <h2 className="mb-4 text-lg font-semibold text-slate-50">Matched vs Missing</h2>
        {totalSkills === 0 ? (
          <p className="text-sm text-slate-500 text-center">
            Once you run an analysis, a pie chart will appear here.
          </p>
        ) : (
          <div className="w-full max-w-xs">
            <Pie data={pieData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDashboard;
