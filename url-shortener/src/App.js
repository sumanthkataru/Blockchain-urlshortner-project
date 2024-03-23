// App.js

import React, { useState, useEffect,useContext } from 'react';
import { ContractContext } from './context/ContractContext';
import './YourComponent.css';


import SetStorageFee from './components/SetStorageFee';
import ShortenURL from './components/ShortenURL';
//import GetURL from './components/GetURL';
import WithdrawFees from './components/WithdrawFees';
import KillContract from './components/KillContract';

const App = () => {
  const { contract, currentAccount } = useContext(ContractContext);

  return (
    <div>
      <h1>Time-Based URL Shortener</h1>
      {/* Render other components */}
      <SetStorageFee contract={contract} accounts={currentAccount} />
      <ShortenURL contract={contract} accounts={currentAccount} />
     
      <WithdrawFees contract={contract} accounts={currentAccount} />
      <KillContract contract={contract} accounts={currentAccount} />
    </div>
    //<GetURL contract={contract} />
  );
};

export default App;
