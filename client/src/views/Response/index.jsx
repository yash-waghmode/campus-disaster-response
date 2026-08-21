import React, { useState } from 'react';

const ResponseMode = () => {
  const [sosActive, setSosActive] = useState(false);

  const theme = {
    background: '#000000',
    primary: '#FF0000',
    text: '#FFFFFF',
    border: '3px solid #FF0000',
  };

  const handleSOS = () => {
    setSosActive(true);
    // Future BitChat local mesh SOS broadcast triggers here
  };

  return (
    <div style={{
      backgroundColor: theme.background,
      color: theme.primary,
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', textTransform: 'uppercase', textAlign: 'center' }}>
        🚨 Emergency Response 🚨
      </h1>

      {/* Spatial Navigation Placeholder */}
      <div style={{ width: '100%', maxWidth: '600px', margin: '20px 0', border: theme.border, padding: '10px' }}>
        <h2 style={{ color: theme.text, textAlign: 'center', margin: '0 0 10px 0' }}>Exit Navigation</h2>
        <div style={{ 
          height: '250px', 
          backgroundColor: '#1a1a1a', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: theme.text 
        }}>
          [ Blueprint Map & Safe Route Render Area ]
        </div>
      </div>

      {/* SOS Trigger */}
      <button 
        onClick={handleSOS}
        style={{
          backgroundColor: theme.primary,
          color: theme.text,
          border: 'none',
          padding: '20px 40px',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          borderRadius: '8px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}
      >
        Trigger SOS
      </button>

      {sosActive && (
        <div style={{ backgroundColor: theme.primary, color: theme.text, padding: '15px', borderRadius: '5px', fontWeight: 'bold' }}>
          SOS Broadcast Active — Local Mesh Network Ping Sent
        </div>
      )}

      {/* BitChat Offline Communication */}
      <div style={{ width: '100%', maxWidth: '600px', marginTop: '20px' }}>
        <h3 style={{ color: theme.primary, margin: '0 0 10px 0' }}>Local Status Feed (Offline Mode)</h3>
        <div style={{ 
          border: '1px solid #FF0000', 
          height: '150px', 
          padding: '10px', 
          color: theme.text,
          backgroundColor: '#0a0a0a',
          overflowY: 'auto' 
        }}>
          <p style={{ color: '#00FF00', margin: '5px 0' }}>&gt; System: BitChat Mesh Network Initialized.</p>
          <p style={{ color: theme.text, margin: '5px 0' }}>&gt; Waiting for nearby peer connections...</p>
        </div>
      </div>
    </div>
  );
};

export default ResponseMode;
