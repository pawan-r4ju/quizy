import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../index.css'; // Import the CSS file

const Greeting = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  return (
    <main className="container">
      <h1>Hi {name}!</h1>
      <h1>Welcome to Quizy! 🎉 It is an exciting platform where you can take quizzes. Let’s dive in!</h1>
      <section className="button-container">
        <button onClick={() => navigate('/quiz')} aria-label="Take Quiz">Take Quiz</button>
      </section>
    </main>
  );
};

export default Greeting;
