import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Home = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStartQuiz = (e) => {
    e.preventDefault();
    navigate(`/greeting/${name}`);
  };

  return (
    <main className='container'>
      <div className='card'>
        <h1>Welcome to Quizy!</h1>
        <form onSubmit={handleStartQuiz}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            aria-label="Enter your name"
          />
          <button type="submit" aria-label="Start Quiz">Start Quiz</button>
        </form>
      </div>
    </main>
  );
};

export default Home;
