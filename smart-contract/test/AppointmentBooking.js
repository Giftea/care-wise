// const { expect } = require("chai");

// describe("AppointmentBooking", function () {
//   let appointmentBooking;
//   let owner;
//   let doctor;
//   let patient;

//   beforeEach(async function () {
//     appointmentBooking = await ethers.deployContract("AppointmentBooking");
    
//     [owner, doctor, patient] = await ethers.getSigners();
//   });

//   it("Should request an appointment", async function () {
//     const timestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

//     await expect(
//       appointmentBooking
//         .connect(patient)
//         .requestAppointment(doctor.address, timestamp)
//     )
//       .to.emit(appointmentBooking, "AppointmentRequested")
//       .withArgs(1, patient.address, doctor.address, timestamp);

//     const appointment = await appointmentBooking.appointments(1);
//     expect(appointment.patient).to.equal(patient.address);
//     expect(appointment.doctor).to.equal(doctor.address);
//     expect(appointment.timestamp).to.equal(timestamp);
//     expect(appointment.confirmed).to.equal(false);
//   });

//   it("Should confirm an appointment", async function () {
//     const timestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

//     await appointmentBooking
//       .connect(patient)
//       .requestAppointment(doctor.address, timestamp);
//     await appointmentBooking.connect(doctor).confirmAppointment(1);

//     const appointment = await appointmentBooking.appointments(1);
//     expect(appointment.confirmed).to.equal(true);
//   });

//   it("Should reject an appointment", async function () {
//     const timestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

//     await appointmentBooking
//       .connect(patient)
//       .requestAppointment(doctor.address, timestamp);
//     await appointmentBooking.connect(doctor).rejectAppointment(1);

//     const appointment = await appointmentBooking.appointments(1);
//     expect(appointment.patient).to.equal(ethers.constants.AddressZero);
//     expect(appointment.doctor).to.equal(ethers.constants.AddressZero);
//     expect(appointment.timestamp).to.equal(0);
//     expect(appointment.confirmed).to.equal(false);
//   });
// });
