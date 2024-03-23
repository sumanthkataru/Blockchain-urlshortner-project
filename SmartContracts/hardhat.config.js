/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")
module.exports = {
  solidity: "0.8.19",
   networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/C3pT91jIwAf66GbuJZnuZaJSU8ZuFzWa',
      accounts: ['0e094578adee354dba4045137c3a2ef274f130b14580e855c35951620f062607'],
    },
  },
};
