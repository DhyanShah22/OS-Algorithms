import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import RoundRobin from './components/RoundRobin'; 
import BankersAlgorithmPage from './pages/BankersAlgorithmPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/landing" element={<LandingPage />} />
          {/* Add a route for the Round Robin page */}
          <Route exact path="/bankers-algorithm" element={<BankersAlgorithmPage />} /> {/* Add this route */}
          <Route exact path="/roundRobin" element={<RoundRobin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
