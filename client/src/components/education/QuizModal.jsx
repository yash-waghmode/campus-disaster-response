import React, { useState } from 'react';

const questions = [
  {
    questionText: 'What should you do during an earthquake?',
    answerOptions: [
      { answerText: 'Run outside immediately', isCorrect: false },
      { answerText: 'Drop, Cover, and Hold On', isCorrect: true },
      { answerText: 'Stand in a doorway', isCorrect: false },
      { answerText: 'Use the elevator', isCorrect: false },
    ],
  },
  {
    questionText: 'In case of a fire alarm in a campus building, what is the first step?',
    answerOptions: [
      { answerText: 'Evacuate using the nearest safe stairs', isCorrect: true },
      { answerText: 'Hide under your desk', isCorrect: false },
      { answerText: 'Wait for a teacher to find you', isCorrect: false },
      { answerText: 'Pack all your belongings', isCorrect: false },
    ],
  },
  {
    questionText: 'If networks go down during an emergency, how should you communicate?',
    answerOptions: [
      { answerText: 'Keep calling 911 until it works', isCorrect: false },
      { answerText: 'Use offline mesh networks like BitChat', isCorrect: true },
      { answerText: 'Shout as loud as possible', is.correct: false },
      { answerText: 'Wait for cellular service to return', isCorrect: false },
    ],
  },
];

const QuizModal = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  if (!isOpen) return null;

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect.');
    }

    setTimeout(() => {
      setFeedback(null);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setFeedback(null);
    onClose();
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        {showScore ? (
          <div>
            <h2>You scored {score} out of {questions.length}</h2>
            <button onClick={resetQuiz} style={buttonStyle}>Close</button>
          </div>
        ) : (
          <div>
            <h2>Question {currentQuestion + 1} / {questions.length}</h2>
            <p>{questions[currentQuestion].questionText}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0' }}>
              {questions[currentQuestion].answerOptions.map((option, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswerOptionClick(option.isCorrect)}
                  style={buttonStyle}
                >
                  {option.answerText}
                </button>
              ))}
            </div>
            {feedback && (
              <p style={{ fontWeight: 'bold', color: feedback === 'Correct!' ? 'green' : 'red' }}>
                {feedback}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
  justifyContent: 'center', alignItems: 'center', zIndex: 1000
};

const modalContentStyle = {
  backgroundColor: '#fff', padding: '20px', borderRadius: '8px',
  width: '90%', maxWidth: '400px', textAlign: 'center', color: '#333'
};

const buttonStyle = {
  padding: '10px', border: '1px solid #ccc', borderRadius: '4px',
  cursor: 'pointer', backgroundColor: '#f0f0f0', color: '#333'
};

export default QuizModal;
