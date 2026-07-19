// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./VerificationRegistry.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ConfidentialExecutionRegistry
 * @dev Anchors execution hashes and their verification status on the Flare Network.
 */
contract ConfidentialExecutionRegistry is Ownable {
    VerificationRegistry public verificationRegistry;

    struct Execution {
        bytes32 id;
        bytes32 workflowId;
        bytes32 executionHash;
        bool isVerified;
        uint256 verifiedAt;
    }

    mapping(bytes32 => Execution) public executions;

    // Indexed events for real-time Flare Event Engine synchronization
    event ExecutionAnchored(bytes32 indexed executionId, bytes32 indexed workflowId, bytes32 indexed executionHash);
    event ExecutionVerified(bytes32 indexed executionId, bytes32 indexed workflowId, bytes32 indexed executionHash, uint256 timestamp);
    
    // Custom Errors (Gas Optimization)
    error ExecutionAlreadyExists(bytes32 executionId);
    error AttestationFailed(bytes32 executionHash);
    error InvalidVerificationRegistry();

    constructor(address _verificationRegistryAddress) Ownable(msg.sender) {
        if (_verificationRegistryAddress == address(0)) revert InvalidVerificationRegistry();
        verificationRegistry = VerificationRegistry(_verificationRegistryAddress);
    }

    /**
     * @dev Updates the active Verification Registry (Admin only)
     */
    function setVerificationRegistry(address _verificationRegistryAddress) external onlyOwner {
        if (_verificationRegistryAddress == address(0)) revert InvalidVerificationRegistry();
        verificationRegistry = VerificationRegistry(_verificationRegistryAddress);
    }

    /**
     * @dev Records a new execution, requiring a valid ECDSA signature from the TEE.
     */
    function recordExecution(
        bytes32 _id,
        bytes32 _workflowId,
        bytes32 _executionHash,
        bytes calldata _teeSignature
    ) external {
        if (executions[_id].id != bytes32(0)) {
            revert ExecutionAlreadyExists(_id);
        }

        // Request the VerificationRegistry to validate the ECDSA signature
        bool isValid = verificationRegistry.verifyTeeAttestation(_executionHash, _teeSignature);
        
        if (!isValid) {
            revert AttestationFailed(_executionHash);
        }

        executions[_id] = Execution({
            id: _id,
            workflowId: _workflowId,
            executionHash: _executionHash,
            isVerified: true,
            verifiedAt: block.timestamp
        });

        emit ExecutionAnchored(_id, _workflowId, _executionHash);
        emit ExecutionVerified(_id, _workflowId, _executionHash, block.timestamp);
    }
}
