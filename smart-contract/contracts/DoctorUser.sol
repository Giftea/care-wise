// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './AppointmentBooking.sol';

contract Doctor {
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

    modifier onlyDoctor() {
        require(appointmentBookingContract.isDoctor(msg.sender), "Only doctor can call this function");
        _;
    }

    event AppointmentConfirmed(uint indexed appointmentId);
    event AppointmentRejected(uint indexed appointmentId);

    function confirmAppointment(uint _appointmentId) external onlyDoctor {
        appointmentBookingContract.confirmAppointment(_appointmentId);
    }

    function rejectAppointment(uint _appointmentId) external onlyDoctor {
        appointmentBookingContract.rejectAppointment(_appointmentId);
    }

    // Event Handlers
    function handleAppointmentConfirmed(uint _appointmentId) external {
        // Implement logic to handle appointment confirmation event
        emit AppointmentConfirmed(_appointmentId);
    }

    function handleAppointmentRejected(uint _appointmentId) external {
        // Implement logic to handle appointment rejection event
        emit AppointmentRejected(_appointmentId);
    }
}
