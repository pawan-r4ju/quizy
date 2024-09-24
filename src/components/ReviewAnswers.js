import React from 'react';
import { useLocation } from 'react-router-dom';
import './ReviewAnswers.css';

const ReviewAnswers = () => {
  const location = useLocation();
  const { questions, wrongAnswers, skipped } = location.state;

  return (
    <div className="review-answers">
        <br /><br /><br />
      <h2>Review Your Answers</h2>
      
      <div className="wrong-answers-section">
        <h3>Wrong Answers</h3>
        {wrongAnswers.length > 0 ? (
          wrongAnswers.map((item, index) => (
            <div key={index} className="question-review">
              <h4>Question: {item.question}</h4>
              <div><strong>Your Answer: </strong>{item.selectedOption}</div>
              <div><strong>Correct Answer: </strong>{item.correctOption}</div>
            </div>
          ))
        ) : (
          <div>No wrong answers!</div>
        )}
      </div>

      <div className="skipped-questions-section">
        <h3>Skipped Questions</h3>
        {skipped.length > 0 ? (
          skipped.map((index) => (
            <div key={index} className="question-review">
              <h4>Question: {questions[index].question}</h4>
              <div><strong>Correct Answer: </strong>{questions[index].correctOption}</div>
            </div>
          ))
        ) : (
          <div>No skipped questions!</div>
        )}
      </div>
    </div>
  );
};

export default ReviewAnswers;