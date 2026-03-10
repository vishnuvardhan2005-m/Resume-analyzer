import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ matchedCount = 0, missingCount = 0, matchPercentage = 0 }) => {
  const total = matchedCount + missingCount;

  const pieData = {
    labels: ['Matched', 'Missing'],
    datasets: [
      {
        data: [matchedCount, missingCount],
        backgroundColor: ['#22C55E', '#EF4444'],
        borderColor: ['#16A34A', '#DC2626'],
        borderWidth: 1
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 10, boxHeight: 10, color: '#374151', font: { size: 12 } }
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw}`
        }
      }
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card p-6">
        <h3 className="text-sm font-semibold text-gray-900">Matched vs missing</h3>
        <p className="mt-1 text-sm text-gray-600">A quick breakdown of skill coverage.</p>
        <div className="mt-5 flex items-center justify-center">
          {total === 0 ? (
            <p className="text-sm text-gray-500">Run an analysis to see charts.</p>
          ) : (
            <div className="w-full max-w-xs">
              <Pie data={pieData} options={pieOptions} />
            </div>
          )}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-sm font-semibold text-gray-900">Skill match</h3>
        <p className="mt-1 text-sm text-gray-600">Your match percentage against job skills.</p>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Match</span>
            <span className="font-semibold text-gray-900">{matchPercentage}%</span>
          </div>
          <div className="mt-2 h-3 w-full rounded-full bg-gray-100">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all"
              style={{ width: `${Math.max(0, Math.min(100, matchPercentage))}%` }}
            />
          </div>
          <div className="mt-3 flex gap-2 text-xs text-gray-600">
            <span className="tag bg-emerald-50 text-emerald-800 ring-emerald-200">
              {matchedCount} matched
            </span>
            <span className="tag bg-rose-50 text-rose-800 ring-rose-200">
              {missingCount} missing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;

