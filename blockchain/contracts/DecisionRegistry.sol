// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DecisionRegistry {
    struct Decision {
        bytes32 executionId;
        bytes32 decisionHash;
        uint256 confidence; // e.g. 945 for 94.5%
        string outcome;     // e.g. "APPROVED"
        uint256 timestamp;
    }

    mapping(bytes32 => Decision) public decisions;

    event DecisionPublished(bytes32 indexed executionId, bytes32 decisionHash, string outcome, uint256 confidence);

    function publishDecision(
        bytes32 _executionId, 
        bytes32 _decisionHash, 
        uint256 _confidence, 
        string calldata _outcome
    ) external {
        require(decisions[_executionId].executionId == bytes32(0), "Decision exists");

        decisions[_executionId] = Decision({
            executionId: _executionId,
            decisionHash: _decisionHash,
            confidence: _confidence,
            outcome: _outcome,
            timestamp: block.timestamp
        });

        emit DecisionPublished(_executionId, _decisionHash, _outcome, _confidence);
    }
}
