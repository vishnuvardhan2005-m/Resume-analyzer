import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

const typeStyles = {
  success: 'bg-emerald-50 text-emerald-900 ring-emerald-200',
  error: 'bg-rose-50 text-rose-900 ring-rose-200',
  info: 'bg-blue-50 text-blue-900 ring-blue-200'
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((toast) => {
    const id = crypto?.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
    const next = {
      id,
      type: toast.type || 'info',
      title: toast.title || '',
      message: toast.message || '',
      durationMs: toast.durationMs ?? 3500
    };

    setToasts((prev) => [next, ...prev].slice(0, 3));

    window.setTimeout(() => remove(id), next.durationMs);
  }, [remove]);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-[min(420px,calc(100vw-2rem))] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-xl px-4 py-3 text-sm shadow-sm ring-1 backdrop-blur ${
              typeStyles[t.type] || typeStyles.info
            }`}
            role="status"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                {t.title ? <p className="font-semibold">{t.title}</p> : null}
                {t.message ? <p className="mt-0.5 text-sm/5 opacity-90">{t.message}</p> : null}
              </div>
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-xs font-semibold opacity-70 transition hover:opacity-100"
                onClick={() => remove(t.id)}
              >
                Close
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};

