import React from 'react';

const NavLink = ({ active, children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
        active
          ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  );
};

const Navbar = ({ view, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="container-app">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <span className="text-sm font-bold">RS</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-900">Resume Skill Gap Analyzer</p>
              <p className="text-xs text-gray-500">Upload, compare, and track skill match.</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            <NavLink active={view === 'analyzer'} onClick={() => onNavigate?.('analyzer')}>
              Analyzer
            </NavLink>
            <NavLink active={view === 'history'} onClick={() => onNavigate?.('history')}>
              History
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

