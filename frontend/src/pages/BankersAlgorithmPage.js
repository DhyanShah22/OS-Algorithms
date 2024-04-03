// BankersAlgorithmPage.js
import React, { useState } from 'react';
import BankersAlgorithm from '../components/BankersAlgorithm'; // Import the BankersAlgorithm component

const BankersAlgorithmPage = () => {
  const [showBankersAlgorithm, setShowBankersAlgorithm] = useState(false);

  const handleBankersAlgorithmClick = () => {
    setShowBankersAlgorithm(true);
  };

  return (
    <div className="container">
      <h1>Banker's Algorithm for Deadlock</h1>
      <div className="service" onClick={handleBankersAlgorithmClick}>
        <h2>Banker's Algorithm</h2>
        <p>Description of the Banker's Algorithm service</p>
      </div>
      {showBankersAlgorithm && <BankersAlgorithm />}
    </div>
  );
};

export default BankersAlgorithmPage;
