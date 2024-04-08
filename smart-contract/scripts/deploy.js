const { ethers } = require("hardhat");

async function deployMyContract() {
  const deployedContract = await ethers.deployContract("DoctorRegistration");
  await deployedContract.waitForDeployment();

  console.log(deployedContract)
}

deployMyContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});