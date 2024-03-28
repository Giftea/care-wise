const { expect } = require("chai");

describe("PatientRecordContract", function () {
  let patientRecordContract;
  let owner;
  let patientAddress;
  let provider;

  before(async function () {
    patientRecordContract = await ethers.deployContract(
      "PatientRecordContract"
    );
    [owner, patientAddress, provider] = await ethers.getSigners();
  });

  it("should grant consent", async function () {
    await patientRecordContract.grantConsent(
      patientAddress.address,
      provider.address
    );
    const consentStatus = await patientRecordContract.getConsentStatus(
      patientAddress.address,
      provider.address
    );
    expect(consentStatus).to.equal(true);
  });

  it("should update patient record", async function () {
    await patientRecordContract.grantConsent(patientAddress.address, provider.address); // Grant consent before updating
    await patientRecordContract.updateRecord(patientAddress.address, provider.address, "New medical history", "New lab results", "New prescriptions");
    const [medicalHistory, labResults, prescriptions] = await patientRecordContract.getRecord(patientAddress.address, provider.address);
    expect(medicalHistory).to.equal("New medical history");
    expect(labResults).to.equal("New lab results");
    expect(prescriptions).to.equal("New prescriptions");
  });

  it("should retrieve patient record", async function () {
    const [medicalHistory, labResults, prescriptions] = await patientRecordContract.getRecord(patientAddress.address, provider.address);
    expect(medicalHistory).to.equal("New medical history");
    expect(labResults).to.equal("New lab results");
    expect(prescriptions).to.equal("New prescriptions");
  });

  it("should revoke consent", async function () {
    await patientRecordContract.revokeConsent(
      patientAddress.address,
      provider.address
    );
    const consentStatus = await patientRecordContract.getConsentStatus(
      patientAddress.address,
      provider.address
    );
    expect(consentStatus).to.equal(false);
  });
});
