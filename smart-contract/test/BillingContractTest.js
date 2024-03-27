const { expect } = require("chai");

describe("BillingContract", function () {
  let billingContract;
  let owner;
  let provider;
  let patient;

  before(async function () {
    billingContract = await ethers.deployContract("BillingContract");
    [owner, provider, patient] = await ethers.getSigners();
  });

  it("should set service rate", async function () {
    await billingContract
      .connect(provider)
      .setServiceRate("Consultation", ethers.parseEther("1"));
    const rate = await billingContract.serviceRates(
      provider.address,
      "Consultation"
    );
    expect(rate).to.equal(ethers.parseEther("1"));
  });

  it("should provide service and update balance", async function () {
    await billingContract
      .connect(provider)
      .provideService(patient.address, "Consultation");
    const balance = await billingContract.balances(patient.address);
    expect(balance).to.equal(ethers.parseEther("1"));
  });

  it("should make payment and clear balance", async function () {
    // Set service rate and provide service to patient
    await billingContract
      .connect(provider)
      .setServiceRate("Consultation", ethers.parseEther("1"));
    await billingContract
      .connect(provider)
      .provideService(patient.address, "Consultation");

    // Get the outstanding balance of the patient
    const balanceBefore = await billingContract.balances(patient.address);

    // Make payment with an amount equal to or greater than the outstanding balance
    await billingContract
      .connect(patient)
      .makePayment({ value: balanceBefore });

    // Verify that the balance is cleared after payment
    const balanceAfter = await billingContract.balances(patient.address);
    expect(balanceAfter).to.equal(0);
  });
});
