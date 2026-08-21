import React, { useState, useRef } from 'react';

const SOSButton = ({ onDispatchSOS }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  const HOLD_TIME_MS = 2000;
  const TICK_MS = 50; 

  const startHold = () => {
    setIsHolding(true);
    let elapsed = 0;

    intervalRef.current = setInterval(() => {
      elapsed += TICK_MS;
      setProgress((elapsed / HOLD_TIME_MS) * 100);
    }, TICK_MS);

    timerRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      setProgress(100);
      if (onDispatchSOS) onDispatchSOS();
    }, HOLD_TIME_MS);
  };

  const cancelHold = () => {
    clearTimeout(timerRef.current);
    clearInterval(intervalRef.current);
    setIsHolding(false);
    setProgress(0);
  };

  return (
    <div style={styles.container}>
      <button
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        style={{
          ...styles.button,
          transform: isHolding ? 'scale(0.95)' : 'scale(1)',
          background: progress >= 100 
            ? '#cc0000' 
            : `linear-gradient(to top, #cc0000 ${progress}%, #ff4d4d ${progress}%)`
        }}
      >
        {progress >= 100 ? 'SOS ACTIVE' : 'HOLD FOR SOS'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  button: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    border: 'none',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    transition: 'transform 0.1s ease',
    userSelect: 'none',
    WebkitTouchCallout: 'none',
  }
};

export default SOSButton;
