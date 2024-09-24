import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Greeting from './components/Greeting';
import Quiz from './components/Quiz'; // Import the Quiz component
import Navbar from './components/Navbar';
import ReviewAnswers from './components/ReviewAnswers'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/greeting/:name" element={<Greeting />} />
        <Route path="/quiz" element={<Quiz />} /> {/* Add the route for the Quiz component */}
        <Route path="/review" element={<ReviewAnswers />} />
      </Routes>
    </Router>
  );
};

export default App;
