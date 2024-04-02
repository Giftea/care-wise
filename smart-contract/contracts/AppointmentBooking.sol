// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AppointmentBooking {
    struct Appointment {
        address patient;
        address doctor;
        uint timestamp;
        bool confirmed;
    }

    mapping(uint => Appointment) public appointments;
    uint public appointmentCounter;

    event AppointmentRequested(uint indexed appointmentId, address indexed patient, address indexed doctor, uint timestamp);
    event AppointmentConfirmed(uint indexed appointmentId);
    event AppointmentRejected(uint indexed appointmentId);

    function requestAppointment(address _doctor, uint _timestamp) external {
        appointmentCounter++;
        appointments[appointmentCounter] = Appointment(msg.sender, _doctor, _timestamp, false);
        emit AppointmentRequested(appointmentCounter, msg.sender, _doctor, _timestamp);
    }

    function confirmAppointment(uint _appointmentId) external {
        Appointment storage appointment = appointments[_appointmentId];
        require(msg.sender == appointment.doctor, "Only doctor can confirm appointment");
        require(appointment.timestamp >= block.timestamp, "Appointment time has passed");
        require(!appointment.confirmed, "Appointment already confirmed");

        appointment.confirmed = true;
        emit AppointmentConfirmed(_appointmentId);
    }

    function rejectAppointment(uint _appointmentId) external {
        Appointment storage appointment = appointments[_appointmentId];
        require(msg.sender == appointment.doctor, "Only doctor can reject appointment");
        require(!appointment.confirmed, "Appointment already confirmed");

        delete appointments[_appointmentId];
        emit AppointmentRejected(_appointmentId);
    }
}
