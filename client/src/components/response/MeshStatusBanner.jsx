import React, { useEffect, useState } from 'react';

function MeshStatusBanner({ emergencyActive }) {
  const [signal, setSignal] = useState(3);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSignal((prev) => {
        const next = prev + (Math.random() > 0.5 ? 1 : -1);
        return Math.min(4, Math.max(1, next));
      });
      setSynced((prev) => (emergencyActive ? true : prev || Math.random() > 0.6));
    }, 1800);

    return () => clearInterval(timer);
  }, [emergencyActive]);

  const strengthLabel = ['Weak', 'Fair', 'Good', 'Strong'][signal - 1];

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderRadius: '8px',
        backgroundColor: emergencyActive ? '#1c1917' : '#0f172a',
        color: '#e2e8f0',
        border: `1px solid ${emergencyActive ? '#f97316' : '#334155'}`,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div>
        <strong style={{ display: 'block', marginBottom: '4px' }}>Offline mesh (BitChat)</strong>
        <span style={{ fontSize: '0.9rem' }}>
          Connection strength: {strengthLabel} ({signal}/4)
        </span>
        <div aria-hidden="true" style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
          {[1, 2, 3, 4].map((bar) => (
            <span
              key={bar}
              style={{
                width: '10px',
                height: `${10 + bar * 6}px`,
                backgroundColor: bar <= signal ? '#22c55e' : '#334155',
                alignSelf: 'flex-end',
                borderRadius: '2px',
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            backgroundColor: synced ? '#14532d' : '#713f12',
            color: synced ? '#bbf7d0' : '#fde68a',
          }}
        >
          {synced ? 'Offline storage synced' : 'Syncing local cache…'}
        </span>
        <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
          Packets queued locally until peers reconnect
        </p>
      </div>
    </div>
  );
}

export default MeshStatusBanner;
