import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // App Mode: 'education' or 'response'
  const [appMode, setAppMode] = useState('education');

  // Active user status: 'unknown', 'safe', 'injured', 'trapped'
  const [userStatus, setUserStatus] = useState('unknown');

  // Global Alert states: { message: string, type: 'info' | 'warning' | 'error' } | null
  const [globalAlert, setGlobalAlert] = useState(null);

  const value = {
    appMode,
    setAppMode,
    userStatus,
    setUserStatus,
    globalAlert,
    setGlobalAlert,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easy access in components
export const useAppContext = () => {
  return useContext(AppContext);
};
