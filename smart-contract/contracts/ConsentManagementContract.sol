// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConsentManagementContract {
    mapping(address => mapping(address => bool)) public patientProviderConsent;

    event ConsentGranted(address indexed patient, address indexed provider);
    event ConsentRevoked(address indexed patient, address indexed provider);

    function grantConsent(address provider) public {
        patientProviderConsent[msg.sender][provider] = true;
        emit ConsentGranted(msg.sender, provider);
    }

    function revokeConsent(address provider) public {
        patientProviderConsent[msg.sender][provider] = false;
        emit ConsentRevoked(msg.sender, provider);
    }

    function checkConsent(address patient, address provider) public view returns (bool) {
        return patientProviderConsent[patient][provider];
    }
}
