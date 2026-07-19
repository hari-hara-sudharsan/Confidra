// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract OrganizationRegistry {
    struct Organization {
        bytes32 id;
        string name;
        address owner;
        uint256 registeredAt;
        bool isActive;
    }

    mapping(bytes32 => Organization) public organizations;

    event OrganizationRegistered(bytes32 indexed orgId, string name, address indexed owner);
    event OrganizationStatusChanged(bytes32 indexed orgId, bool isActive);

    function registerOrganization(bytes32 _id, string calldata _name, address _owner) external {
        require(organizations[_id].id == bytes32(0), "Org already exists");

        organizations[_id] = Organization({
            id: _id,
            name: _name,
            owner: _owner,
            registeredAt: block.timestamp,
            isActive: true
        });

        emit OrganizationRegistered(_id, _name, _owner);
    }

    function setStatus(bytes32 _id, bool _isActive) external {
        // Simple ACL check: only owner (In production, wire to RoleManager)
        require(organizations[_id].owner == msg.sender, "Not owner");
        organizations[_id].isActive = _isActive;
        emit OrganizationStatusChanged(_id, _isActive);
    }
}
