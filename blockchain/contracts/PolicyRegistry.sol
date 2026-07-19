// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PolicyRegistry {
    struct Policy {
        bytes32 id;
        bytes32 orgId;
        bytes32 workflowId;
        bytes32 rulesHash; // Hash of the JSON policy matrix
        uint256 version;
    }

    mapping(bytes32 => Policy) public policies;

    event PolicyRegistered(bytes32 indexed orgId, bytes32 indexed policyId, bytes32 rulesHash);

    function registerPolicy(bytes32 _id, bytes32 _orgId, bytes32 _workflowId, bytes32 _rulesHash, uint256 _version) external {
        require(policies[_id].id == bytes32(0), "Policy exists");

        policies[_id] = Policy({
            id: _id,
            orgId: _orgId,
            workflowId: _workflowId,
            rulesHash: _rulesHash,
            version: _version
        });

        emit PolicyRegistered(_orgId, _id, _rulesHash);
    }
}
