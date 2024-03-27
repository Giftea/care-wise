const PatientRecordContract = artifacts.require("PatientRecordContract");

contract("PatientRecordContract", (accounts) => {
  let contractInstance;
  const patient = accounts[0];
  const provider = accounts[1];
  
  beforeEach(async () => {
    contractInstance = await PatientRecordContract.new({ from: patient });
  });

  it("should grant consent to provider", async () => {
    await contractInstance.grantConsent(provider, { from: patient });
    const hasConsent = await contractInstance.patientProviderConsent(patient, provider);
    assert.equal(hasConsent, true, "Consent was not granted to provider");
  });

  it("should revoke consent from provider", async () => {
    await contractInstance.grantConsent(provider, { from: patient });
    await contractInstance.revokeConsent(provider, { from: patient });
    const hasConsent = await contractInstance.patientProviderConsent(patient, provider);
    assert.equal(hasConsent, false, "Consent was not revoked from provider");
  });

  it("should update patient record with consent", async () => {
    await contractInstance.grantConsent(provider, { from: patient });
    await contractInstance.updateRecord("New medical history", "New lab results", "New prescriptions", { from: patient });
    const [medicalHistory, labResults, prescriptions] = await contractInstance.getRecord(patient, { from: provider });
    assert.equal(medicalHistory, "New medical history", "Medical history not updated");
    assert.equal(labResults, "New lab results", "Lab results not updated");
    assert.equal(prescriptions, "New prescriptions", "Prescriptions not updated");
  });

  it("should not update patient record without consent", async () => {
    await expectRevert(
      contractInstance.updateRecord("New medical history", "New lab results", "New prescriptions", { from: patient }),
      "Patient has not granted consent to update record"
    );
  });

  it("should not access patient record without consent", async () => {
    await expectRevert(
      contractInstance.getRecord(patient, { from: provider }),
      "Patient has not granted consent to access record"
    );
  });
});
