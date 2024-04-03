import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import LandingPage from './Pages/BankersAlgorithmPage';
import BankersAlgorithm from './Components/BankersAlgorithm';
import RoundRobin from './Components/RoundRobin';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/landing" element={<LandingPage/>} />
          {/* Add a route for the Round Robin page */}
          <Route exact path="/bankers-algorithm" element={<BankersAlgorithm />} /> {/* Add this route */}
          <Route exact path="/roundRobin" element={<RoundRobin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;