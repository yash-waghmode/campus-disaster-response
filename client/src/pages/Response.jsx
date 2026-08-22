import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import SOSButton from '../components/response/SOSButton';
import MeshStatusBanner from '../components/response/MeshStatusBanner';
import EvacuationGrid from '../components/response/EvacuationGrid';

function Response() {
  const { isEmergency, setIsEmergency, userStatus, setUserStatus } = useAppContext();
  const [showStatusPrompt, setShowStatusPrompt] = useState(false);

  const handleTriggerSOS = () => {
    setIsEmergency(true);
    setShowStatusPrompt(true);
  };

  const handleSelectStatus = (status) => {
    setUserStatus(status);
    setShowStatusPrompt(false);
  };

  const statusLabel =
    userStatus === 'safe' ? 'I am Safe' : userStatus === 'danger' ? 'Need Assistance' : 'Not reported';

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '720px',
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif',
        color: '#e2e8f0',
        backgroundColor: '#020617',
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <h1 style={{ marginTop: 0 }}>Emergency Response</h1>
      <p style={{ color: '#94a3b8' }}>
        Trigger SOS to alert nearby mesh peers, then report whether you are safe.
      </p>

      <MeshStatusBanner emergencyActive={isEmergency} />

      <SOSButton active={isEmergency} onTrigger={handleTriggerSOS} />

      {showStatusPrompt && (
        <div
          role="dialog"
          aria-labelledby="status-prompt-title"
          aria-describedby="status-prompt-desc"
          style={{
            marginBottom: '20px',
            padding: '16px',
            borderRadius: '10px',
            backgroundColor: '#111827',
            border: '1px solid #f97316',
          }}
        >
          <h2 id="status-prompt-title" style={{ marginTop: 0, fontSize: '1.1rem' }}>
            Select your status
          </h2>
          <p id="status-prompt-desc" style={{ color: '#cbd5e1' }}>
            SOS is active. Tell responders if you are safe or need help.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleSelectStatus('safe')}
              style={statusButtonStyle('#166534')}
            >
              I am Safe
            </button>
            <button
              type="button"
              onClick={() => handleSelectStatus('danger')}
              style={statusButtonStyle('#9a3412')}
            >
              Need Assistance
            </button>
          </div>
        </div>
      )}

      {isEmergency && !showStatusPrompt && (
        <p style={{ fontWeight: 700, color: userStatus === 'danger' ? '#fb923c' : '#86efac' }}>
          Reported status: {statusLabel}
        </p>
      )}

      <EvacuationGrid />
    </div>
  );
}

const statusButtonStyle = (backgroundColor) => ({
  flex: '1 1 160px',
  minHeight: '48px',
  padding: '12px 16px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor,
  color: '#ffffff',
  fontWeight: 700,
  cursor: 'pointer',
});

export default Response;
