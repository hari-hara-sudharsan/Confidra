// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AuditRegistry {
    event AuditEvent(
        bytes32 indexed entityId,
        string entityType,
        string action,
        address indexed actor,
        uint256 timestamp,
        string metadata
    );

    function logEvent(
        bytes32 _entityId,
        string calldata _entityType,
        string calldata _action,
        address _actor,
        string calldata _metadata
    ) external {
        emit AuditEvent(_entityId, _entityType, _action, _actor, block.timestamp, _metadata);
    }
}
