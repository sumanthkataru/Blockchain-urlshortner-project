import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const ContractContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const Contract = new ethers.Contract(contractAddress, contractABI, signer);

  return Contract;
};

export const ContractProvider = ({ children }) => {
 
    const [currentAccount, setCurrentAccount] = useState("");
    const [contract, setContract] = useState();
 

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

       
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

 

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
     
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

 

    useEffect(() => {
      connectWallet()
      checkIfWalletIsConnect();
      const temp = createEthereumContract();
      setContract(temp);
  }, []);

  return (
    <ContractContext.Provider
      value={{
        connectWallet,
        currentAccount,
        contract
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};