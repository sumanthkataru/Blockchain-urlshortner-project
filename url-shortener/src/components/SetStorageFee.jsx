// SetStorageFee.jsx

import React, { useState } from 'react';
import './SetStorageFee.css'; // Import the CSS file for styling

const SetStorageFee = ({ contract, accounts }) => {
  const [newStorageFee, setNewStorageFee] = useState('');

  const handleSetStorageFee = async () => {
    try {
      if (!contract || !contract.methods) {
        console.error('Contract not initialized');
        return;
      }

      await contract.setStorageFee(newStorageFee);
      // Handle success or update UI
    } catch (error) {
      console.error('Error setting storage fee:', error);
    }
  };

  return (
    <div className="set-storage-fee-container">
      <h2>Set Storage Fee</h2>
      <div className="input-container">
        <input
          type="number"
          value={newStorageFee}
          onChange={(e) => setNewStorageFee(e.target.value)}
          placeholder="Enter new storage fee"
        />
      </div>
      <button className="set-storage-fee-button" onClick={handleSetStorageFee}>
        Set Storage Fee
      </button>
    </div>
  );
};

export default SetStorageFee;
