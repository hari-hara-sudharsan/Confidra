// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./VerificationRegistry.sol";

contract ConfidentialExecutionRegistry {
    VerificationRegistry public verificationRegistry;

    struct Execution {
        bytes32 id;
        bytes32 workflowId;
        bytes32 executionHash;
        bool isVerified;
        uint256 verifiedAt;
    }

    mapping(bytes32 => Execution) public executions;

    event ExecutionVerified(bytes32 indexed executionId, bytes32 indexed workflowId, bytes32 executionHash);
    error AttestationFailed(bytes32 executionHash);

    constructor(address _verificationRegistryAddress) {
        verificationRegistry = VerificationRegistry(_verificationRegistryAddress);
    }

    function recordExecution(
        bytes32 _id,
        bytes32 _workflowId,
        bytes32 _executionHash,
        bytes calldata _teeSignature
    ) external {
        require(executions[_id].id == bytes32(0), "Execution exists");

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

        emit ExecutionVerified(_id, _workflowId, _executionHash);
    }
}
