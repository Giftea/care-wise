const { expect } = require("chai");

describe("BillingContract", function () {
  let billingContract;
  let owner;
  let payer;

  beforeEach(async function () {
    billingContract = await ethers.deployContract("BillingContract");

    [owner, payer] = await ethers.getSigners();
  });

  it("should set service rate", async function () {
    await billingContract
      .connect(owner)
      .setServiceRate("Consultation", ethers.parseEther("0.1"));
    const serviceRate = await billingContract.getServiceRate("Consultation");
    expect(serviceRate).to.equal(ethers.parseEther("0.1"));
  });

  it("should make payment and emit PaymentReceived event", async function () {
    await billingContract
      .connect(owner)
      .setServiceRate("Consultation", ethers.parseEther("0.1"));

    const initialBalance = await ethers.provider.getBalance(payer.address);
    const paymentAmount = ethers.parseEther("0.1");
    const tx = await billingContract
      .connect(payer)
      .makePayment("Consultation", { value: paymentAmount });
    expect(tx)
      .to.emit(billingContract, "PaymentReceived")
      .withArgs(payer, "Consultation", paymentAmount);

    const newBalance = await ethers.provider.getBalance(payer.address);
    const receipt = await ethers.provider.getTransactionReceipt(tx.hash);

    expect(newBalance).to.equal(
      initialBalance - (paymentAmount + receipt.gasUsed * tx.gasPrice)
    );
  });
});
