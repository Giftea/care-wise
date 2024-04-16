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

  // Doctor
  const DoctorContract = await ethers.deployContract(
    "Doctor"
  );
  await DoctorContract.waitForDeployment();

  // Patient
  const PatientContract = await ethers.deployContract(
    "Patient"
  );
  await PatientContract.waitForDeployment();

  console.log("DoctorRegistration", DoctorRegistrationContract);
  console.log("PatientRegistration", PatientRegistrationContract);
  console.log("AppointmentBooking", AppointmentBookingContract);
  console.log("Doctor", DoctorContract);
  console.log("Patient", PatientContract);
}

deployMyContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
