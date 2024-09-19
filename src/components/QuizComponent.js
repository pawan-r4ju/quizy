// src/components/QuizComponent.js
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  const handleInputChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const addQuestion = () => {
    if (newQuestion.trim() === '') {
      toast.error('Question cannot be empty');
      return;
    }

    setQuestions([...questions, newQuestion]);
    setNewQuestion('');
    toast.success('Question added!!');
  };

  return (
    <div>
      <h1>Quiz</h1>
      <input
        type="text"
        value={newQuestion}
        onChange={handleInputChange}
        placeholder="Enter your question"
      />
      <button onClick={addQuestion}>Add Question</button>
      <ToastContainer />
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuizComponent;
