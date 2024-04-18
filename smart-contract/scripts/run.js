const { ethers } = require("hardhat");

async function callMyContract() {
  const MyContract = await ethers.getContractFactory("DoctorRegistration");
  const contract = MyContract.attach(
    // The deployed contract address
    "0xa8c564fA8Ebd7d0e79515BBd13Efa63eE83d6cA6"
  );

  await contract.registerDoctor('0x9329dd1Be0D10B5D8C5C641F45de62c054272760');
}

callMyContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});