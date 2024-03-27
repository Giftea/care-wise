const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PatientRecordContract", function () {
  let contractInstance;
  const patient = "0x55A8661defB6b46414F2d79Bb486a115Ab28f6A3";
  const provider = "0x9329dd1Be0D10B5D8C5C641F45de62c054272760";

  beforeEach(async function () {
    contractInstance = await ethers.deployContract("PatientRecordContract");
    // const ContractInstance = await ethers.getContractFactory("PatientRecordContract");
    // contractInstance = await ContractInstance.deploy();
    // console.log(contractInstance);
    // await contractInstance.deployed();
  });

  it("should grant consent to provider", async function () {
    await contractInstance.grantConsent(provider, { from: patient });
    const hasConsent = await contractInstance.patientProviderConsent(
      patient,
      provider
    );
    assert.equal(hasConsent, true, "Consent was not granted to provider");
  });

  // it("should revoke consent from provider", async function () {
  //   await contractInstance.grantConsent(provider, { from: patient });
  //   await contractInstance.revokeConsent(provider, { from: patient });
  //   const hasConsent = await contractInstance.patientProviderConsent(
  //     patient,
  //     provider
  //   );
  //   assert.equal(hasConsent, false, "Consent was not revoked from provider");
  // });

  // it("should update patient record with consent", async function () {
  //   await contractInstance.grantConsent(provider, { from: patient });
  //   await contractInstance.updateRecord(
  //     "New medical history",
  //     "New lab results",
  //     "New prescriptions",
  //     { from: patient }
  //   );
  //   const [medicalHistory, labResults, prescriptions] =
  //     await contractInstance.getRecord(patient, { from: provider });
  //   assert.equal(
  //     medicalHistory,
  //     "New medical history",
  //     "Medical history not updated"
  //   );
  //   assert.equal(labResults, "New lab results", "Lab results not updated");
  //   assert.equal(
  //     prescriptions,
  //     "New prescriptions",
  //     "Prescriptions not updated"
  //   );
  // });

  // it("should not update patient record without consent", async function () {
  //   await expectRevert(
  //     contractInstance.updateRecord(
  //       "New medical history",
  //       "New lab results",
  //       "New prescriptions",
  //       { from: patient }
  //     ),
  //     "Patient has not granted consent to update record"
  //   );
  // });

  // it("should not access patient record without consent", async function () {
  //   await expectRevert(
  //     contractInstance.getRecord(patient, { from: provider }),
  //     "Patient has not granted consent to access record"
  //   );
  // });
});
