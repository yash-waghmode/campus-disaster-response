import React from 'react';

function SOSButton({ active, onTrigger }) {
  return (
    <div style={styles.container}>
      <button
        type="button"
        onClick={onTrigger}
        aria-pressed={active}
        aria-label={active ? 'SOS emergency already active' : 'Trigger SOS emergency'}
        style={{
          ...styles.button,
          backgroundColor: active ? '#7f1d1d' : '#dc2626',
          boxShadow: active
            ? '0 0 0 6px rgba(248, 113, 113, 0.45)'
            : '0 12px 28px rgba(220, 38, 38, 0.45)',
        }}
      >
        <span style={styles.kicker}>{active ? 'BROADCASTING' : 'EMERGENCY'}</span>
        <span style={styles.label}>
          {active ? 'SOS ACTIVE' : 'TRIGGER SOS EMERGENCY'}
        </span>
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '8px 0 20px',
  },
  button: {
    width: 'min(100%, 420px)',
    minHeight: '140px',
    padding: '24px 28px',
    border: '4px solid #fecaca',
    borderRadius: '16px',
    color: '#ffffff',
    cursor: 'pointer',
    fontFamily: 'system-ui, sans-serif',
    textAlign: 'center',
  },
  kicker: {
    display: 'block',
    fontSize: '0.8rem',
    letterSpacing: '0.16em',
    fontWeight: 700,
    marginBottom: '8px',
  },
  label: {
    display: 'block',
    fontSize: '1.65rem',
    fontWeight: 800,
    lineHeight: 1.2,
  },
};

export default SOSButton;
