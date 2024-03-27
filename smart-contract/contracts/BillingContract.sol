// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BillingContract {
    mapping(address => uint256) public balances;
    mapping(address => mapping(string => uint256)) public serviceRates;

    event ServiceRateSet(address indexed provider, string service, uint256 rate);
    event ServiceProvided(address indexed patient, address indexed provider, string service, uint256 charge);
    event PaymentReceived(address indexed patient, uint256 amount);

    function setServiceRate(string memory service, uint256 rate) public {
        serviceRates[msg.sender][service] = rate;
        emit ServiceRateSet(msg.sender, service, rate);
    }

    function provideService(address patient, string memory service) public {
        require(serviceRates[msg.sender][service] > 0, "Service rate not set");
        uint256 charge = serviceRates[msg.sender][service];
        balances[patient] += charge;
        emit ServiceProvided(patient, msg.sender, service, charge);
    }

    function makePayment() public payable {
        require(balances[msg.sender] > 0, "No outstanding balance");
        require(msg.value >= balances[msg.sender], "Insufficient payment");
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        emit PaymentReceived(msg.sender, amount);
    }
}
