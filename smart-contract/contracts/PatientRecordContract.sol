// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract PatientRecordContract {
    address public hospitalManagement;

    constructor() {
        hospitalManagement = msg.sender; 
    }

    struct PatientRecord {
        address patientAddress;
        string medicalHistory;
        string labResults;
        string prescriptions;
    }

    mapping(address => PatientRecord) private patientRecords;
    mapping(address => mapping(address => bool)) private patientProviderConsent;

    event RecordUpdated(address indexed patientAddress, string field, string value);
    event ConsentGranted(address indexed patientAddress, address indexed providerAddress);
    event ConsentRevoked(address indexed patientAddress, address indexed providerAddress);

    function updateRecord(address patient, address provider, string memory medicalHistory, string memory labResults, string memory prescriptions) public {
    require(patientProviderConsent[patient][provider], "Provider does not have consent to update record");

    PatientRecord storage record = patientRecords[patient];
    record.patientAddress = patient;
    record.medicalHistory = medicalHistory;
    record.labResults = labResults;
    record.prescriptions = prescriptions;

    emit RecordUpdated(patient, "Medical History", medicalHistory);
    emit RecordUpdated(patient, "Lab Results", labResults);
    emit RecordUpdated(patient, "Prescriptions", prescriptions);
}

    function getRecord(address patientAddress, address providerAddress) public view returns (string memory, string memory, string memory) {
        require(patientProviderConsent[patientAddress][providerAddress], "Provider does not have consent to access record");

        PatientRecord storage record = patientRecords[patientAddress];
        return (record.medicalHistory, record.labResults, record.prescriptions);
    }

    function grantConsent(address patientAddress, address providerAddress) public {
        require(msg.sender == hospitalManagement, "Only the hospital manager can call this function");
        patientProviderConsent[patientAddress][providerAddress] = true;
        emit ConsentGranted(patientAddress, providerAddress);
    }

    function getConsentStatus(address patientAddress, address providerAddress) public view returns (bool) {
        return patientProviderConsent[patientAddress][providerAddress];
    }

    function revokeConsent(address patientAddress,address providerAddress) public {
        require(msg.sender == hospitalManagement, "Only the hospital manager can call this function");
        patientProviderConsent[patientAddress][providerAddress] = false;
        emit ConsentRevoked(patientAddress, providerAddress);
    }
}