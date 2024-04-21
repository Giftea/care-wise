// SPDX-License-Identifier: UNLICENSED
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

    mapping(address => bool) public doctors;
    mapping(address => bool) public patients;

    event AppointmentRequested(uint indexed appointmentId, address indexed patient, address indexed doctor, uint timestamp);
    event AppointmentConfirmed(uint indexed appointmentId);
    event AppointmentRejected(uint indexed appointmentId);

    constructor() {
        doctors[msg.sender] = true;
    }

    modifier onlyDoctor() {
        require(doctors[msg.sender], "Only doctor can call this function");
        _;
    }

    modifier onlyPatient() {
        require(patients[msg.sender], "Only patient can call this function");
        _;
    }

    function requestAppointment(address _doctor, uint _timestamp) external onlyPatient {
        appointmentCounter++;
        appointments[appointmentCounter] = Appointment(msg.sender, _doctor, _timestamp, false);
        emit AppointmentRequested(appointmentCounter, msg.sender, _doctor, _timestamp);
    }

    function confirmAppointment(uint _appointmentId) external onlyDoctor {
        Appointment storage appointment = appointments[_appointmentId];
        require(appointment.timestamp >= block.timestamp, "Appointment time has passed");
        require(!appointment.confirmed, "Appointment already confirmed");

        appointment.confirmed = true;
        emit AppointmentConfirmed(_appointmentId);
    }

    function rejectAppointment(uint _appointmentId) external onlyDoctor {
        Appointment storage appointment = appointments[_appointmentId];
        require(!appointment.confirmed, "Appointment already confirmed");

        delete appointments[_appointmentId];
        emit AppointmentRejected(_appointmentId);
    }

    function addDoctor(address _doctor) external onlyDoctor {
        doctors[_doctor] = true;
    }

    function addPatient(address _patient) external onlyDoctor {
        patients[_patient] = true;
    }

    function isDoctor(address _address) external view returns (bool) {
        return doctors[_address];
    }

    function isPatient(address _address) external view returns (bool) {
        return patients[_address];
    }
}
