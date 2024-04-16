// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRegistration {
    address public owner;
    
    struct Patient {
        bytes32 userID; // User ID
        bool isRegistered;
        string userDataCID; // Storing user data off-chain
    }
    
    mapping(address => Patient) public patients;
    
    event PatientRegistered(address indexed patientAddress, bytes32 userID, string userDataCID);
    
    function registerPatient(bytes32 _userID, string memory _userDataCID) external {
        require(_userID != 0, "User ID cannot be empty");
        require(bytes(_userDataCID).length > 0, "User data CID cannot be empty");
        require(!patients[msg.sender].isRegistered, "Patient already registered");
        
        patients[msg.sender] = Patient(_userID, true, _userDataCID);
        emit PatientRegistered(msg.sender, _userID, _userDataCID);
    }
}
