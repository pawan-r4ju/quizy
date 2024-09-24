import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctOption: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctOption: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctOption: "Pacific Ocean"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
    correctOption: "William Shakespeare"
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctOption: "2"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Gold", "Osmium", "Oganesson"],
    correctOption: "Oxygen"
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctOption: "Diamond"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correctOption: "Leonardo da Vinci"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctOption: "Jupiter"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Thailand", "South Korea"],
    correctOption: "Japan"
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [skipped, setSkipped] = useState([]);
  const navigate = useNavigate();

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
    if (option === questions[currentQuestion].correctOption) {
      setScore(prevScore => prevScore + 1);
    } else {
      setWrongAnswers(prevWrongAnswers => [
        ...prevWrongAnswers,
        { 
          question: questions[currentQuestion].question, 
          selectedOption: option,
          correctOption: questions[currentQuestion].correctOption
        }
      ]);
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
    setWrongAnswers([]);
    setSkipped([]);
    setShowScore(false);
    setTimeLeft(30);
  };

  const handleQuit = async () => {
    navigate('/');
  };

  const handleReview = () => {
    navigate('/review', { state: { questions, wrongAnswers, skipped } });
  };

  return (
    <>
      <br /><br />
      <div className="quiz-container">
        <div className="card">
          {showScore ? (
            <div className="score-section"><br />
              <h1 className='r'>results</h1>
              <div className="score-details">You scored {score} out of {questions.length}</div><br />
              <div className="score-details">Wrong answers: {wrongAnswers.length}</div><br />
              <div className="score-details">Skipped questions: {skipped.length}</div><br />
              <button className="retry-button" onClick={handleRetry}>Retry</button>
              <button className="quit-button" onClick={handleQuit}>Quit</button>
              <button className="review-button" onClick={handleReview}>Review Answers</button>
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
    </>
  );
};

export default Quiz;