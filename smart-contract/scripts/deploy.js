const { ethers } = require("hardhat");

async function deployMyContract() {
  // DoctorRegistration
  const DoctorRegistrationContract = await ethers.deployContract(
    "DoctorRegistration"
  );
  await DoctorRegistrationContract.waitForDeployment();

  // PatientRegistration
  const PatientRegistrationContract = await ethers.deployContract(
    "PatientRegistration"
  );
  await PatientRegistrationContract.waitForDeployment();

    // AppointmentBooking
    const AppointmentBookingContract = await ethers.deployContract(
      "AppointmentBooking"
    );
    await AppointmentBookingContract.waitForDeployment();

  console.log("DoctorRegistration", DoctorRegistrationContract);
  console.log("PatientRegistration", PatientRegistrationContract);
  console.log("AppointmentBooking", AppointmentBookingContract);
}

deployMyContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
