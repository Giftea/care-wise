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
    Doctor[] public allUnRegisteredDoctors;
    Doctor[] public allRegisteredDoctors;

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
        allUnRegisteredDoctors.push(doctors[msg.sender]);
        emit DoctorProfileReceived(msg.sender, _userDataCID);
    }

    function registerDoctor(address _doctorAddress) external onlyOwner {
        require(doctors[_doctorAddress].profileReceived, "Doctor profile not received yet");
        require(!doctors[_doctorAddress].isRegistered, "Doctor already registered");

        doctors[_doctorAddress].isRegistered = true;
        allRegisteredDoctors.push(doctors[_doctorAddress]);
        emit DoctorRegistered(_doctorAddress, doctors[_doctorAddress].userDataCID);
    }

    function getAllRegisteredDoctors() external view returns (Doctor[] memory) {
        return allRegisteredDoctors;
    }

    function getAllUnRegisteredDoctors() external view onlyOwner returns (Doctor[] memory) {
        return allUnRegisteredDoctors;
    }
}
