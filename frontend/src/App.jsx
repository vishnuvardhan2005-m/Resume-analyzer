import React, { useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import Navbar from './components/Navbar.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

const App = () => {
  const [view, setView] = useState('analyzer'); // 'analyzer' | 'history'

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white">
        <Navbar view={view} onNavigate={setView} />
        {view === 'analyzer' ? <HomePage /> : <HistoryPage />}
      </div>
    </ToastProvider>
  );
};

export default App;

