import React, { useState } from 'react';

const AdminDashboard = () => {
  const [responseModeActive, setResponseModeActive] = useState(false);

  const toggleResponseMode = () => {
    const newState = !responseModeActive;
    setResponseModeActive(newState);
    
    // Broadcast trigger logic (e.g., WebSocket emit or API POST) can be connected here
    if (newState) {
      console.warn('CRITICAL: Response Mode Activated across system.');
    } else {
      console.log('System restored to Normal/Education Mode.');
    }
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '8px' }}>Admin Control Center</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>System-wide emergency override management</p>

      <div 
        style={{ 
          border: responseModeActive ? '2px solid #dc3545' : '1px solid #ccc', 
          backgroundColor: responseModeActive ? '#fff5f5' : '#f8f9fa',
          padding: '24px', 
          borderRadius: '8px' 
        }}
      >
        <h2 style={{ marginTop: 0 }}>Master Broadcast Switch</h2>
        <p>Current Status: <strong style={{ color: responseModeActive ? '#dc3545' : '#28a745' }}>
          {responseModeActive ? '🚨 RESPONSE MODE ACTIVE' : '📚 EDUCATION MODE ACTIVE'}
        </strong></p>

        <button
          onClick={toggleResponseMode}
          style={{
            backgroundColor: responseModeActive ? '#dc3545' : '#198754',
            color: '#fff',
            padding: '14px 28px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '12px'
          }}
        >
          {responseModeActive ? 'Deactivate Response Mode' : 'ACTIVATE RESPONSE MODE'}
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
