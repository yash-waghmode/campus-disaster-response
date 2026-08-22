import React, { useState } from 'react';
import QuizModal from '../components/education/QuizModal';
import { useAppContext } from '../context/AppContext';

function Education() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const { quizScore } = useAppContext();

  const toggleQuiz = () => {
    setIsQuizOpen((open) => !open);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Safety Education & Drills</h2>
      <p>Practice earthquake, fire, and offline-mesh procedures before an emergency.</p>
      {quizScore > 0 && (
        <p style={{ fontWeight: 600 }}>Last drill score: {quizScore} / 3</p>
      )}
      <button
        type="button"
        onClick={toggleQuiz}
        style={{
          padding: '10px 16px',
          backgroundColor: isQuizOpen ? '#64748b' : '#1d4ed8',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {isQuizOpen ? 'Close Safety Drill' : 'Start Safety Drill'}
      </button>
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}

export default Education;
