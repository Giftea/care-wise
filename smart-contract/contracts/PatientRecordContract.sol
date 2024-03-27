// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract PatientRecordContract {
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

    function updateRecord(string memory medicalHistory, string memory labResults, string memory prescriptions) public {
        require(patientProviderConsent[msg.sender][msg.sender], "Patient has not granted consent to update record");

        PatientRecord storage record = patientRecords[msg.sender];
        record.patientAddress = msg.sender;
        record.medicalHistory = medicalHistory;
        record.labResults = labResults;
        record.prescriptions = prescriptions;

        emit RecordUpdated(msg.sender, "Medical History", medicalHistory);
        emit RecordUpdated(msg.sender, "Lab Results", labResults);
        emit RecordUpdated(msg.sender, "Prescriptions", prescriptions);
    }

    function getRecord(address patientAddress) public view returns (string memory, string memory, string memory) {
        require(patientProviderConsent[patientAddress][msg.sender], "Patient has not granted consent to access record");

        PatientRecord storage record = patientRecords[patientAddress];
        return (record.medicalHistory, record.labResults, record.prescriptions);
    }

    function grantConsent(address providerAddress) public {
        patientProviderConsent[msg.sender][providerAddress] = true;
        emit ConsentGranted(msg.sender, providerAddress);
    }

    function revokeConsent(address providerAddress) public {
        patientProviderConsent[msg.sender][providerAddress] = false;
        emit ConsentRevoked(msg.sender, providerAddress);
    }
}