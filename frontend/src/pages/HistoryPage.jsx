import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../services/api';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';

const HistoryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchHistory();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError('Failed to load history. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <main className="container-app py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">History</h1>
        <p className="mt-2 text-gray-600">All previously saved analyses.</p>
      </div>

      {error ? (
        <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {error}
        </div>
      ) : null}

      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <p className="text-sm font-semibold text-gray-900">Saved analyses</p>
          <p className="mt-1 text-sm text-gray-600">Hover rows to preview skills quickly.</p>
        </div>

        {loading ? (
          <div className="p-6">
            <LoadingSkeleton />
          </div>
        ) : items.length === 0 ? (
          <div className="p-6">
            <p className="text-sm text-gray-600">No saved analyses yet.</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Match %</th>
                  <th className="px-6 py-3 font-semibold">Matched skills</th>
                  <th className="px-6 py-3 font-semibold">Missing skills</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => {
                  const matched = item.matchedSkills || [];
                  const missing = item.missingSkills || [];
                  const date = item.createdAt ? new Date(item.createdAt) : null;
                  return (
                    <tr key={item._id || item.id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-700">
                        {date ? date.toLocaleString() : 'Unknown'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="tag bg-blue-50 text-blue-700 ring-blue-200">
                          {item.matchPercentage ?? 0}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {matched.length ? (
                            matched.slice(0, 6).map((s) => (
                              <span key={s} className="tag bg-emerald-50 text-emerald-800 ring-emerald-200">
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500">None</span>
                          )}
                          {matched.length > 6 ? (
                            <span className="tag bg-gray-50 text-gray-700 ring-gray-200">
                              +{matched.length - 6}
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {missing.length ? (
                            missing.slice(0, 6).map((s) => (
                              <span key={s} className="tag bg-rose-50 text-rose-800 ring-rose-200">
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500">None</span>
                          )}
                          {missing.length > 6 ? (
                            <span className="tag bg-gray-50 text-gray-700 ring-gray-200">
                              +{missing.length - 6}
                            </span>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">1</span>–<span className="font-semibold text-gray-900">{Math.min(items.length, 10)}</span> of{' '}
            <span className="font-semibold text-gray-900">{items.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <button type="button" className="btn-secondary" disabled>
              Previous
            </button>
            <button type="button" className="btn-secondary" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HistoryPage;
