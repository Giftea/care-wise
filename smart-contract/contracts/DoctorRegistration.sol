// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DoctorRegistration {
    address public owner;
    
    struct Doctor {
        bytes32 userID; // User ID
        bool isRegistered;
        string userDataCID; // storing user data off-chain
    }
    
    mapping(address => Doctor) public doctors;
    
    event DoctorRegistered(address indexed doctorAddress, bytes32 userID, string userDataCID);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    function registerDoctor(bytes32 _userID, string memory _userDataCID) external {
        require(_userID != 0, "User ID cannot be empty");
        require(bytes(_userDataCID).length > 0, "User data CID cannot be empty");
        require(!doctors[msg.sender].isRegistered, "Doctor already registered");
        
        doctors[msg.sender] = Doctor(_userID, true, _userDataCID);
        emit DoctorRegistered(msg.sender, _userID, _userDataCID);
    }
}
