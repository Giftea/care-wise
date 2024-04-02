// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DoctorRegistration {
    address public owner;
    
    struct Doctor {
        address doctorAddress;
        bool profileReceived;
        bool isRegistered;
        string userDataCID;
    }
    
    mapping(address => Doctor) public doctors;
    
    event DoctorProfileReceived(address indexed doctorAddress, string userDataCID);
    event DoctorRegistered(address indexed doctorAddress, string userDataCID);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }   
    
    function receiveDoctorProfile(string memory _userDataCID) external {
        require(bytes(_userDataCID).length > 0, "User data CID cannot be empty");
        require(!doctors[msg.sender].profileReceived, "Doctor profile already received");
        
        doctors[msg.sender] = Doctor(msg.sender, true, false, _userDataCID);
        emit DoctorProfileReceived(msg.sender, _userDataCID);
    }
    
    function registerDoctor(address _doctorAddress) external onlyOwner {
        require(doctors[_doctorAddress].profileReceived, "Doctor profile not received yet");
        require(!doctors[_doctorAddress].isRegistered, "Doctor already registered");
        
        // Mark the doctor as registered
        doctors[_doctorAddress].isRegistered = true;
        
        emit DoctorRegistered(_doctorAddress, doctors[_doctorAddress].userDataCID);
    }
}
