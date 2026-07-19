// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract DecisionRegistry is AccessControl {
    bytes32 public constant TEE_EXECUTOR_ROLE = keccak256("TEE_EXECUTOR_ROLE");

    struct Decision {
        bytes32 workflowId;
        bytes32 applicantHash;
        bytes32 resultHash;
        uint256 executedAt;
    }

    mapping(bytes32 => Decision) public decisions;

    event DecisionRecorded(bytes32 indexed txHash, bytes32 indexed workflowId, bytes32 applicantHash);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function recordDecision(bytes32 _txHash, bytes32 _workflowId, bytes32 _applicantHash, bytes32 _resultHash) external onlyRole(TEE_EXECUTOR_ROLE) {
        decisions[_txHash] = Decision({
            workflowId: _workflowId,
            applicantHash: _applicantHash,
            resultHash: _resultHash,
            executedAt: block.timestamp
        });

        emit DecisionRecorded(_txHash, _workflowId, _applicantHash);
    }
}
