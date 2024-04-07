import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ScanDisk from './Pages/ScanDisk';
import BankersAlgorithm from './Pages/BankersAlgorithm';
import PageReplacementAlgorithm from './Pages/PageReplacement';
import RoundRobin from './Pages/RoundRobin';
import LandingPage from './Pages/LandingPage';

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
          <Route exact path="/pageReplacement" element={<PageReplacementAlgorithm />} />
          <Route exact path="/scandisk" element={<ScanDisk />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;