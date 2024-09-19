import React, { useState, useEffect } from 'react';
import api from '../api/server'; // Import the Axios instance
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [skipped, setSkipped] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/questions') // Use the Axios instance
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSkipQuestion();
    }
  }, [timeLeft]);

  const handleAnswerOptionClick = (option) => {
    if (option === questions[currentQuestion].correctOption) { // Match with correctOption
      setScore(prevScore => prevScore + 1);
    } else {
      setWrongAnswers(prevWrongAnswers => prevWrongAnswers + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30);
    } else {
      setShowScore(true);
    }
  };

  const handleSkipQuestion = () => {
    setSkipped([...skipped, currentQuestion]);
    handleNextQuestion();
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setWrongAnswers(0);
    setSkipped([]);
    setShowScore(false);
    setTimeLeft(30);
  };

  const handleQuit = async () => {
    navigate('/');

  };

  return (
    <div className="quiz-container">
      <div className="card">
        {showScore ? (
          <div className="score-section"><br />
            <div className="score-details">You scored {score} out of {questions.length}</div><br />
            <div className="score-details">Wrong answers: {wrongAnswers}</div><br />
            <div className="score-details">Skipped questions: {skipped.length}</div><br />
            <button className="retry-button" onClick={handleRetry}>Retry</button>
            <button className="quit-button" onClick={handleQuit}>Quit</button>
          </div>
        ) : (
          questions.length > 0 && (
            <>
              <div className="question-section">
                <h1>Question {currentQuestion + 1}/{questions.length}</h1>
                <div className="question-text">{questions[currentQuestion].question}</div>
                <div className="timer">Time left: {timeLeft} seconds</div>
              </div>
              <div className="answer-section">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    id="op"
                    onClick={() => handleAnswerOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button className="skip-button" onClick={handleSkipQuestion}>Skip</button>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Quiz;
