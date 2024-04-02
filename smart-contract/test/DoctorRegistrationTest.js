const { expect } = require("chai");

describe("DoctorRegistration", function() {
  let doctorRegistration;
  let owner;
  let addr1;
  let addr2;
  let userDataCID = "CID123456";

  beforeEach(async function() {
    doctorRegistration = await ethers.deployContract("DoctorRegistration");
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should receive a doctor's profile", async function() {
    await expect(doctorRegistration.connect(addr1).receiveDoctorProfile(userDataCID))
      .to.emit(doctorRegistration, "DoctorProfileReceived")
      .withArgs(addr1.address, userDataCID);

    expect(await doctorRegistration.doctors(addr1.address)).to.deep.equal([
       addr1.address,
       true,
       false,
       userDataCID
    ]);
  });

  it("Should not receive the same doctor's profile twice", async function() {
    await doctorRegistration.connect(addr1).receiveDoctorProfile(userDataCID);
    await expect(doctorRegistration.connect(addr1).receiveDoctorProfile(userDataCID)).to.be.revertedWith("Doctor profile already received");
  });

  it("Should register a doctor by the owner", async function() {
    await doctorRegistration.connect(addr1).receiveDoctorProfile(userDataCID);

    await expect(doctorRegistration.registerDoctor(addr1.address))
      .to.emit(doctorRegistration, "DoctorRegistered")
      .withArgs(addr1.address, userDataCID);

    expect(await doctorRegistration.doctors(addr1.address)).to.deep.equal([
      addr1.address,
      true,
      true,
      userDataCID
   ]);
  });

  it("Should revert registering a doctor by non-owner", async function() {
    await doctorRegistration.connect(addr1).receiveDoctorProfile(userDataCID);

    await expect(doctorRegistration.connect(addr2).registerDoctor(addr1.address)).to.be.revertedWith("Only owner can call this function");
  });

  it("Should revert registering an unprofiled doctor", async function() {
    await expect(doctorRegistration.registerDoctor(addr1.address)).to.be.revertedWith("Doctor profile not received yet");
  });

  it("Should revert registering the same doctor twice", async function() {
    await doctorRegistration.connect(addr1).receiveDoctorProfile(userDataCID);
    await doctorRegistration.connect(owner).registerDoctor(addr1.address);
    await expect(doctorRegistration.connect(owner).registerDoctor(addr1.address)).to.be.revertedWith("Doctor already registered");
  });
});
