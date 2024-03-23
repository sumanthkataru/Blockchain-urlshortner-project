// KillContract.js

import React from 'react';
import './KillContract.css'; // Import the CSS file for styling

const KillContract = ({ contract, accounts }) => {
  const handleKillContract = async () => {
    try {
      await contract.kill();
      // Handle success or update UI
    } catch (error) {
      console.error('Error killing contract:', error);
    }
  };

  return (
    <div className="kill-contract-container">
      <h2>Kill Contract</h2>
      <button className="kill-contract-button" onClick={handleKillContract}>
        Kill Contract
      </button>
    </div>
  );
};

export default KillContract;
