import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const QUESTIONS = [
  {
    id: 'earthquake',
    topic: 'Earthquake safety',
    questionText: 'What should you do during an earthquake?',
    answerOptions: [
      { id: 'a', answerText: 'Run outside immediately', isCorrect: false },
      { id: 'b', answerText: 'Drop, Cover, and Hold On', isCorrect: true },
      { id: 'c', answerText: 'Stand in a doorway', isCorrect: false },
      { id: 'd', answerText: 'Use the elevator', isCorrect: false },
    ],
  },
  {
    id: 'fire',
    topic: 'Fire evacuation',
    questionText: 'A fire alarm sounds in a campus building. What is the first step?',
    answerOptions: [
      { id: 'a', answerText: 'Evacuate using the nearest safe stairs', isCorrect: true },
      { id: 'b', answerText: 'Hide under your desk', isCorrect: false },
      { id: 'c', answerText: 'Wait for a teacher to find you', isCorrect: false },
      { id: 'd', answerText: 'Pack all your belongings first', isCorrect: false },
    ],
  },
  {
    id: 'mesh',
    topic: 'Mesh network protocol',
    questionText: 'If cellular networks go down during an emergency, how should you communicate?',
    answerOptions: [
      { id: 'a', answerText: 'Keep calling 911 until it works', isCorrect: false },
      { id: 'b', answerText: 'Use offline mesh networks like BitChat', isCorrect: true },
      { id: 'c', answerText: 'Shout as loud as possible', isCorrect: false },
      { id: 'd', answerText: 'Wait for cellular service to return', isCorrect: false },
    ],
  },
];

const initialState = () => ({
  questionIndex: 0,
  selections: {},
  score: 0,
  isComplete: false,
});

const getFeedback = (score, total) => {
  if (score === total) {
    return 'Excellent. You are drill-ready for earthquake, fire, and mesh-network procedures.';
  }
  if (score === total - 1) {
    return 'Solid work. Review the missed topic and run the drill again when you can.';
  }
  return 'Keep practicing. Repeat the safety drill until Drop-Cover-Hold, stair evacuation, and mesh comms are automatic.';
};

const QuizModal = ({ isOpen, onClose }) => {
  const { quizScore, setQuizScore } = useAppContext();
  const [quiz, setQuiz] = useState(initialState);

  useEffect(() => {
    if (isOpen) {
      setQuiz(initialState());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQuestion = QUESTIONS[quiz.questionIndex];
  const selectedId = quiz.selections[currentQuestion?.id];
  const isLastQuestion = quiz.questionIndex === QUESTIONS.length - 1;

  const handleSelect = (option) => {
    if (quiz.isComplete || selectedId) return;

    const nextSelections = { ...quiz.selections, [currentQuestion.id]: option.id };
    const nextScore = option.isCorrect ? quiz.score + 1 : quiz.score;

    setQuiz({
      questionIndex: quiz.questionIndex,
      selections: nextSelections,
      score: nextScore,
      isComplete: false,
    });
  };

  const handleAdvance = () => {
    if (!selectedId) return;

    if (isLastQuestion) {
      setQuizScore(quiz.score);
      setQuiz((prev) => ({ ...prev, isComplete: true }));
      return;
    }

    setQuiz((prev) => ({
      ...prev,
      questionIndex: Math.min(prev.questionIndex + 1, QUESTIONS.length - 1),
    }));
  };

  const handleClose = () => {
    setQuiz(initialState());
    onClose();
  };

  return (
    <div style={modalOverlayStyle} onClick={handleClose} role="presentation">
      <div
        style={modalContentStyle}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-title"
      >
        {quiz.isComplete ? (
          <div>
            <h2 id="quiz-title">Safety Drill Complete</h2>
            <div style={badgeStyle}>
              <span style={{ fontSize: '2rem' }} aria-hidden="true">🏅</span>
              <strong>Victory Badge</strong>
              <p style={{ margin: '8px 0 0' }}>
                You scored {quiz.score} / {QUESTIONS.length}
              </p>
              <p style={{ margin: '8px 0 0', fontSize: '0.95rem' }}>
                {getFeedback(quiz.score, QUESTIONS.length)}
              </p>
              <p style={{ margin: '8px 0 0', fontSize: '0.85rem', opacity: 0.85 }}>
                Saved to your profile: {quizScore} / {QUESTIONS.length}
              </p>
            </div>
            <button type="button" onClick={handleClose} style={primaryButtonStyle}>
              Close
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 id="quiz-title" style={{ margin: 0, fontSize: '1.15rem' }}>
                Question {quiz.questionIndex + 1} / {QUESTIONS.length}
              </h2>
              <button type="button" onClick={handleClose} style={closeButtonStyle} aria-label="Close quiz">
                ×
              </button>
            </div>
            <p style={topicStyle}>{currentQuestion.topic}</p>
            <p>{currentQuestion.questionText}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0' }}>
              {currentQuestion.answerOptions.map((option) => {
                const isSelected = selectedId === option.id;
                const showResult = Boolean(selectedId);
                let backgroundColor = '#f0f0f0';
                if (showResult && option.isCorrect) backgroundColor = '#bbf7d0';
                if (isSelected && !option.isCorrect) backgroundColor = '#fecaca';

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option)}
                    disabled={Boolean(selectedId)}
                    style={{ ...buttonStyle, backgroundColor }}
                  >
                    {option.answerText}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleAdvance}
              disabled={!selectedId}
              style={{
                ...primaryButtonStyle,
                opacity: selectedId ? 1 : 0.5,
                cursor: selectedId ? 'pointer' : 'not-allowed',
              }}
            >
              {isLastQuestion ? 'Finish drill' : 'Next question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1100,
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '440px',
  textAlign: 'center',
  color: '#333',
};

const buttonStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: '#f0f0f0',
  color: '#333',
};

const primaryButtonStyle = {
  ...buttonStyle,
  marginTop: '8px',
  backgroundColor: '#1d4ed8',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  fontWeight: 600,
};

const closeButtonStyle = {
  border: 'none',
  background: 'transparent',
  fontSize: '1.5rem',
  cursor: 'pointer',
  lineHeight: 1,
  color: '#64748b',
};

const topicStyle = {
  margin: '12px 0 4px',
  fontSize: '0.8rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: '#1d4ed8',
};

const badgeStyle = {
  margin: '16px 0',
  padding: '20px',
  borderRadius: '12px',
  background: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
  border: '2px solid #f59e0b',
  color: '#78350f',
};

export default QuizModal;
