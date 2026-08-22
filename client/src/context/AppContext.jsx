import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isEmergency, setIsEmergency] = useState(false);
  const [userStatus, setUserStatus] = useState('unknown');
  const [quizScore, setQuizScore] = useState(0);
  const [activeTab, setActiveTab] = useState('home');

  const value = {
    isEmergency,
    setIsEmergency,
    userStatus,
    setUserStatus,
    quizScore,
    setQuizScore,
    activeTab,
    setActiveTab,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
