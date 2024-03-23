// WithdrawFees.jsx

import React from 'react';
import './WithdrawFees.css'; // Import the CSS file for styling

const WithdrawFees = ({ contract, accounts }) => {
  const handleWithdrawFees = async () => {
    try {
      await contract.withdrawFees();
      // Handle success or update UI
    } catch (error) {
      console.error('Error withdrawing fees:', error);
    }
  };

  return (
    <div className="withdraw-fees-container">
      <h2>Withdraw Fees</h2>
      <button className="withdraw-fees-button" onClick={handleWithdrawFees}>
        Withdraw Fees
      </button>
    </div>
  );
};

export default WithdrawFees;
