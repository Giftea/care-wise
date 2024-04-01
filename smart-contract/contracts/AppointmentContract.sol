// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract AppointmentContract {
    address public hospitalManagement;

    constructor() {
        hospitalManagement = msg.sender;
    }

    struct Appointment {
        address patient;
        address provider;
        uint256 timestamp;
        string details;
    }

    mapping(uint256 => Appointment) public appointments;
    uint256 public appointmentCount;

    event AppointmentScheduled(uint256 indexed appointmentId, address indexed patient, address indexed provider, uint256 timestamp, string details);

    modifier onlyHospitalManagement() {
        require(msg.sender == hospitalManagement, "Only the hospital manager can call this function");
        _;
    }

    function scheduleAppointment(address patient, address provider, uint256 timestamp, string memory details) public onlyHospitalManagement {
        appointmentCount++;
        appointments[appointmentCount] = Appointment(patient, provider, timestamp, details);
        emit AppointmentScheduled(appointmentCount, patient, provider, timestamp, details);
    }
}
