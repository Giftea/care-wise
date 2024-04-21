// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract BillingContract {
    address public hospitalManagement;

    constructor() {
        hospitalManagement = msg.sender;
    }

    struct Service {
        string serviceName;
        uint256 serviceRate;
    }

    mapping(string => Service) private services;

    event ServiceRateSet(string serviceName, uint256 serviceRate);
    event PaymentReceived(address indexed payer, string serviceName, uint256 amount);

    modifier onlyHospitalManagement() {
        require(msg.sender == hospitalManagement, "Only the hospital manager can call this function");
        _;
    }

    function setServiceRate(string memory serviceName, uint256 serviceRate) public onlyHospitalManagement {
        services[serviceName].serviceName = serviceName;
        services[serviceName].serviceRate = serviceRate;
        emit ServiceRateSet(serviceName, serviceRate);
    }

    function getServiceRate(string memory serviceName) public view returns (uint256) {
        return services[serviceName].serviceRate;
    }

    function makePayment(string memory serviceName) public payable {
        uint256 serviceRate = services[serviceName].serviceRate;
        require(serviceRate > 0, "Service rate not set");

        require(msg.value >= serviceRate, "Insufficient payment");

        // Transfer payment to hospital management
        payable(hospitalManagement).transfer(msg.value);

        emit PaymentReceived(msg.sender, serviceName, msg.value);
    }
}
