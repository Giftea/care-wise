// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './AppointmentBooking.sol';

contract Patient {
    address public owner;
    AppointmentBooking public appointmentBookingContract;

    constructor(address _appointmentBookingContract) {
        owner = msg.sender;
        appointmentBookingContract = AppointmentBooking(_appointmentBookingContract);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyPatient() {
        require(appointmentBookingContract.isPatient(msg.sender), "Only patient can call this function");
        _;
    }

    event AppointmentRequested(uint indexed appointmentId);

    function requestAppointment(address _doctor, uint _timestamp) external onlyPatient {
        appointmentBookingContract.requestAppointment(_doctor, _timestamp);
    }

    // Event Handlers
    function handleAppointmentRequested(uint _appointmentId) external {
        // Implement logic to handle appointment request event
        emit AppointmentRequested(_appointmentId);
    }
}
