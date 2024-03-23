const { ethers } = require("hardhat");

async function main() {
  // Compile the contract
  const TimeBasedURLShortener = await ethers.getContractFactory("TimeBasedURLShortener");

  // Convert storage fee to an integer value (e.g., multiply by 100)
  const storageFee = ethers.utils.parseEther("0.1"); // Equivalent to 0.1 ether

  // Deploy the contract
  const timeBasedURLShortener = await TimeBasedURLShortener.deploy(storageFee);
  await timeBasedURLShortener.deployed();

  console.log("TimeBasedURLShortener contract deployed to:", timeBasedURLShortener.address);
  console.log("Initial storage fee set to:", storageFee.toString());
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
