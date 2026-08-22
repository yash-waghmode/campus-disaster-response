import React from 'react';
import { useAppContext } from './context/AppContext';
import Home from './pages/Home';
import Education from './pages/Education';
import Response from './pages/Response';
import Admin from './pages/Admin';

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'education', label: 'Education' },
  { id: 'response', label: 'Response' },
  { id: 'admin', label: 'Admin' },
];

function App() {
  const { activeTab, setActiveTab, isEmergency, setIsEmergency } = useAppContext();

  const renderView = () => {
    switch (activeTab) {
      case 'education':
        return <Education />;
      case 'response':
        return <Response />;
      case 'admin':
        return <Admin />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          backgroundColor: isEmergency ? '#991b1b' : '#0f172a',
          borderBottom: `1px solid ${isEmergency ? '#dc2626' : '#1e293b'}`,
          flexWrap: 'wrap',
          transition: 'background-color 0.2s ease',
        }}
      >
        <span style={{ color: '#f8fafc', fontWeight: 700, marginRight: '12px' }}>
          Campus Disaster Response
        </span>

        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                color: isActive ? '#ffffff' : '#cbd5e1',
                backgroundColor: isActive ? (isEmergency ? '#dc2626' : '#1d4ed8') : 'transparent',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setIsEmergency((prev) => !prev)}
          style={{
            marginLeft: 'auto',
            padding: '6px 12px',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#ffffff',
            backgroundColor: isEmergency ? '#ef4444' : '#334155',
            boxShadow: isEmergency ? '0 0 0 2px rgba(254, 202, 202, 0.6)' : 'none',
          }}
        >
          {isEmergency ? 'Emergency Active' : 'Emergency Off'}
        </button>
      </nav>

      <main>{renderView()}</main>
    </div>
  );
}

export default App;
