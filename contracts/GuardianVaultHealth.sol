// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract GuardianVaultHealth is SepoliaConfig {
    using FHE for *;
    
    struct HealthRecord {
        euint32 recordId;
        euint32 patientId;
        euint32 doctorId;
        euint32 timestamp;
        euint8 recordType; // 1: Diagnosis, 2: Treatment, 3: Medication, 4: Lab Results
        euint8 severity; // 1: Low, 2: Medium, 3: High, 4: Critical
        bool isActive;
        bool isVerified;
        string metadataHash; // IPFS hash for additional data
        address patient;
        address doctor;
        uint256 createdTime;
        uint256 updatedTime;
    }
    
    struct AccessPermission {
        euint32 permissionId;
        euint32 recordId;
        euint32 doctorId;
        euint32 patientId;
        euint8 accessLevel; // 1: Read, 2: Write, 3: Full
        bool isGranted;
        bool isRevoked;
        uint256 grantedTime;
        uint256 expiryTime;
        address grantedBy;
    }
    
    struct PatientProfile {
        euint32 patientId;
        euint8 age;
        euint8 gender; // 1: Male, 2: Female, 3: Other
        euint8 bloodType; // 1: A+, 2: A-, 3: B+, 4: B-, 5: AB+, 6: AB-, 7: O+, 8: O-
        bool isActive;
        string name;
        address patientAddress;
        uint256 registrationTime;
    }
    
    struct DoctorProfile {
        euint32 doctorId;
        euint8 specialization; // 1: General, 2: Cardiology, 3: Neurology, etc.
        euint8 experience; // Years of experience
        bool isVerified;
        bool isActive;
        string name;
        string licenseNumber;
        address doctorAddress;
        uint256 registrationTime;
    }
    
    mapping(uint256 => HealthRecord) public healthRecords;
    mapping(uint256 => AccessPermission) public accessPermissions;
    mapping(uint256 => PatientProfile) public patientProfiles;
    mapping(uint256 => DoctorProfile) public doctorProfiles;
    mapping(address => euint32) public patientReputation;
    mapping(address => euint32) public doctorReputation;
    
    uint256 public recordCounter;
    uint256 public permissionCounter;
    uint256 public patientCounter;
    uint256 public doctorCounter;
    
    address public owner;
    address public verifier;
    
    event HealthRecordCreated(uint256 indexed recordId, address indexed patient, address indexed doctor);
    event AccessPermissionGranted(uint256 indexed permissionId, uint256 indexed recordId, address indexed doctor);
    event AccessPermissionRevoked(uint256 indexed permissionId, uint256 indexed recordId);
    event PatientRegistered(uint256 indexed patientId, address indexed patient);
    event DoctorRegistered(uint256 indexed doctorId, address indexed doctor);
    event RecordVerified(uint256 indexed recordId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function registerPatient(
        string memory _name,
        externalEuint8 age,
        externalEuint8 gender,
        externalEuint8 bloodType,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Patient name cannot be empty");
        
        uint256 patientId = patientCounter++;
        
        // Convert external values to internal FHE values
        euint8 internalAge = FHE.fromExternal(age, inputProof);
        euint8 internalGender = FHE.fromExternal(gender, inputProof);
        euint8 internalBloodType = FHE.fromExternal(bloodType, inputProof);
        
        patientProfiles[patientId] = PatientProfile({
            patientId: FHE.asEuint32(0), // Will be set properly later
            age: internalAge,
            gender: internalGender,
            bloodType: internalBloodType,
            isActive: true,
            name: _name,
            patientAddress: msg.sender,
            registrationTime: block.timestamp
        });
        
        emit PatientRegistered(patientId, msg.sender);
        return patientId;
    }
    
    function registerDoctor(
        string memory _name,
        string memory _licenseNumber,
        externalEuint8 specialization,
        externalEuint8 experience,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Doctor name cannot be empty");
        require(bytes(_licenseNumber).length > 0, "License number cannot be empty");
        
        uint256 doctorId = doctorCounter++;
        
        // Convert external values to internal FHE values
        euint8 internalSpecialization = FHE.fromExternal(specialization, inputProof);
        euint8 internalExperience = FHE.fromExternal(experience, inputProof);
        
        doctorProfiles[doctorId] = DoctorProfile({
            doctorId: FHE.asEuint32(0), // Will be set properly later
            specialization: internalSpecialization,
            experience: internalExperience,
            isVerified: false,
            isActive: true,
            name: _name,
            licenseNumber: _licenseNumber,
            doctorAddress: msg.sender,
            registrationTime: block.timestamp
        });
        
        emit DoctorRegistered(doctorId, msg.sender);
        return doctorId;
    }
    
    function createHealthRecord(
        uint256 patientId,
        externalEuint8 recordType,
        externalEuint8 severity,
        string memory metadataHash,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(patientProfiles[patientId].patientAddress != address(0), "Patient does not exist");
        require(patientProfiles[patientId].isActive, "Patient profile is not active");
        require(bytes(metadataHash).length > 0, "Metadata hash cannot be empty");
        
        uint256 recordId = recordCounter++;
        
        // Convert external values to internal FHE values
        euint8 internalRecordType = FHE.fromExternal(recordType, inputProof);
        euint8 internalSeverity = FHE.fromExternal(severity, inputProof);
        
        healthRecords[recordId] = HealthRecord({
            recordId: FHE.asEuint32(0), // Will be set properly later
            patientId: FHE.asEuint32(patientId),
            doctorId: FHE.asEuint32(0), // Will be set properly later
            timestamp: FHE.asEuint32(block.timestamp),
            recordType: internalRecordType,
            severity: internalSeverity,
            isActive: true,
            isVerified: false,
            metadataHash: metadataHash,
            patient: patientProfiles[patientId].patientAddress,
            doctor: msg.sender,
            createdTime: block.timestamp,
            updatedTime: block.timestamp
        });
        
        emit HealthRecordCreated(recordId, patientProfiles[patientId].patientAddress, msg.sender);
        return recordId;
    }
    
    function grantAccess(
        uint256 recordId,
        uint256 doctorId,
        externalEuint8 accessLevel,
        uint256 expiryTime,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(healthRecords[recordId].patient == msg.sender, "Only patient can grant access");
        require(healthRecords[recordId].isActive, "Record is not active");
        require(doctorProfiles[doctorId].doctorAddress != address(0), "Doctor does not exist");
        require(doctorProfiles[doctorId].isActive, "Doctor profile is not active");
        require(expiryTime > block.timestamp, "Expiry time must be in the future");
        
        uint256 permissionId = permissionCounter++;
        
        // Convert external access level to internal FHE value
        euint8 internalAccessLevel = FHE.fromExternal(accessLevel, inputProof);
        
        accessPermissions[permissionId] = AccessPermission({
            permissionId: FHE.asEuint32(0), // Will be set properly later
            recordId: FHE.asEuint32(recordId),
            doctorId: FHE.asEuint32(doctorId),
            patientId: FHE.asEuint32(0), // Will be set properly later
            accessLevel: internalAccessLevel,
            isGranted: true,
            isRevoked: false,
            grantedTime: block.timestamp,
            expiryTime: expiryTime,
            grantedBy: msg.sender
        });
        
        emit AccessPermissionGranted(permissionId, recordId, doctorProfiles[doctorId].doctorAddress);
        return permissionId;
    }
    
    function revokeAccess(uint256 permissionId) public {
        require(accessPermissions[permissionId].grantedBy == msg.sender, "Only grantor can revoke access");
        require(accessPermissions[permissionId].isGranted, "Permission is not granted");
        require(!accessPermissions[permissionId].isRevoked, "Permission already revoked");
        
        accessPermissions[permissionId].isRevoked = true;
        
        emit AccessPermissionRevoked(permissionId, accessPermissions[permissionId].recordId);
    }
    
    function verifyRecord(uint256 recordId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify records");
        require(healthRecords[recordId].patient != address(0), "Record does not exist");
        
        healthRecords[recordId].isVerified = isVerified;
        emit RecordVerified(recordId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is patient or doctor based on context
        if (patientProfiles[patientCounter - 1].patientAddress == user) {
            patientReputation[user] = reputation;
        } else {
            doctorReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getHealthRecordInfo(uint256 recordId) public view returns (
        string memory metadataHash,
        bool isActive,
        bool isVerified,
        address patient,
        address doctor,
        uint256 createdTime,
        uint256 updatedTime
    ) {
        HealthRecord storage record = healthRecords[recordId];
        return (
            record.metadataHash,
            record.isActive,
            record.isVerified,
            record.patient,
            record.doctor,
            record.createdTime,
            record.updatedTime
        );
    }
    
    function getAccessPermissionInfo(uint256 permissionId) public view returns (
        uint256 recordId,
        bool isGranted,
        bool isRevoked,
        uint256 grantedTime,
        uint256 expiryTime,
        address grantedBy
    ) {
        AccessPermission storage permission = accessPermissions[permissionId];
        return (
            permission.recordId,
            permission.isGranted,
            permission.isRevoked,
            permission.grantedTime,
            permission.expiryTime,
            permission.grantedBy
        );
    }
    
    function getPatientProfileInfo(uint256 patientId) public view returns (
        string memory name,
        bool isActive,
        address patientAddress,
        uint256 registrationTime
    ) {
        PatientProfile storage patient = patientProfiles[patientId];
        return (
            patient.name,
            patient.isActive,
            patient.patientAddress,
            patient.registrationTime
        );
    }
    
    function getDoctorProfileInfo(uint256 doctorId) public view returns (
        string memory name,
        string memory licenseNumber,
        bool isVerified,
        bool isActive,
        address doctorAddress,
        uint256 registrationTime
    ) {
        DoctorProfile storage doctor = doctorProfiles[doctorId];
        return (
            doctor.name,
            doctor.licenseNumber,
            doctor.isVerified,
            doctor.isActive,
            doctor.doctorAddress,
            doctor.registrationTime
        );
    }
    
    function getPatientReputation(address patient) public view returns (uint8) {
        return 0; // FHE.decrypt(patientReputation[patient]) - will be decrypted off-chain
    }
    
    function getDoctorReputation(address doctor) public view returns (uint8) {
        return 0; // FHE.decrypt(doctorReputation[doctor]) - will be decrypted off-chain
    }
    
    function checkAccessPermission(uint256 recordId, address doctor) public view returns (bool) {
        // This function would check if the doctor has valid access to the record
        // Implementation would involve checking accessPermissions mapping
        // For now, returning false as a placeholder
        return false;
    }
}
